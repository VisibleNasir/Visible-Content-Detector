from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from PIL import Image
import io
import torch
import numpy as np
from torchvision import models, transforms
import albumentations as A
from albumentations.pytorch import ToTensorV2
import pandas as pd

# Initialize FastAPI app
app = FastAPI(title="Harmful Image Detection API")

# Device configuration
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load label names (from training dataset)
try:
    df = pd.read_csv("image_dataset.csv")
    label_names = df["label"].astype('category').cat.categories
    num_classes = len(label_names)
except FileNotFoundError:
    raise Exception("Error: 'image_dataset.csv' not found.")

# Load model
model = models.efficientnet_v2_s()
model.classifier[1] = torch.nn.Linear(model.classifier[1].in_features, num_classes)
model.load_state_dict(torch.load("harmful_image_model.pth", map_location=device))
model = model.to(device)
model.eval()

# Image preprocessing
transform = A.Compose([
    A.Resize(224, 224),
    A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ToTensorV2(),
])

# Prediction function
def predict_image(image: Image.Image):
    image = np.array(image.convert("RGB"))
    augmented = transform(image=image)
    image_tensor = augmented["image"].unsqueeze(0).to(device)
    
    with torch.no_grad():
        outputs = model(image_tensor)
        probabilities = torch.softmax(outputs, dim=1)
        predicted_class = torch.argmax(probabilities, dim=1).item()
        confidence = probabilities[0].cpu().numpy()
    
    return {
        "predicted_class": label_names[predicted_class],
        "confidence_scores": {label_names[i]: float(confidence[i]) for i in range(num_classes)}
    }

# API endpoint for image upload
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Validate file type
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read and process image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        result = predict_image(image)
        
        return JSONResponse(content=result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)