from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import torch
import numpy as np
from torchvision import models
import albumentations as A
from albumentations.pytorch import ToTensorV2
import pandas as pd
import cv2
import os
import tempfile
from scipy.special import softmax

# Initialize FastAPI app
app = FastAPI(title="Harmful Video Detection API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Device configuration
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load label names
try:
    df = pd.read_csv("video_dataset.csv")
    label_names = df["label"].astype('category').cat.categories
    num_classes = len(label_names)
except FileNotFoundError:
    raise Exception("Error: 'video_dataset.csv' not found.")

# Load model
model = models.efficientnet_v2_s()
model.classifier[1] = torch.nn.Linear(model.classifier[1].in_features, num_classes)
model.load_state_dict(torch.load("harmful_video_model.pth", map_location=device))
model = model.to(device)
model.eval()

# Image preprocessing
transform = A.Compose([
    A.Resize(224, 224),
    A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ToTensorV2(),
])

# Extract frames from video
def extract_frames(video_path, frame_rate=1):
    vidcap = cv2.VideoCapture(video_path)
    fps = vidcap.get(cv2.CAP_PROP_FPS)
    frame_interval = int(fps / frame_rate)
    frames = []
    count = 0
    while vidcap.isOpened():
        success, frame = vidcap.read()
        if not success:
            break
        if count % frame_interval == 0:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frames.append(frame)
        count += 1
    vidcap.release()
    return frames

# Predict single frame
def predict_frame(frame):
    image = np.array(frame)
    augmented = transform(image=image)
    image_tensor = augmented["image"].unsqueeze(0).to(device)
    
    with torch.no_grad():
        outputs = model(image_tensor)
        probabilities = softmax(outputs.cpu().numpy(), axis=1)[0]
    
    return probabilities

# Aggregate frame predictions
def aggregate_predictions(frame_probs):
    avg_probs = np.mean(frame_probs, axis=0)
    predicted_class = np.argmax(avg_probs)
    return {
        "predicted_class": label_names[predicted_class],
        "confidence_scores": {label_names[i]: float(avg_probs[i]) for i in range(num_classes)}
    }

# API endpoint for video upload
@app.post("/predict-video/")
async def predict_video(file: UploadFile = File(...)):
    try:
        if not file.content_type.startswith("video/"):
            raise HTTPException(status_code=400, detail="File must be a video")
        
        # Save video temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_file:
            temp_file.write(await file.read())
            temp_path = temp_file.name
        
        # Extract and process frames
        frames = extract_frames(temp_path, frame_rate=1)
        if not frames:
            raise HTTPException(status_code=400, detail="No frames extracted from video")
        
        frame_probs = [predict_frame(frame) for frame in frames]
        result = aggregate_predictions(frame_probs)
        
        # Clean up
        os.remove(temp_path)
        
        return JSONResponse(content=result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)