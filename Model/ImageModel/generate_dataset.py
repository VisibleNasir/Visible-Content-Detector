import pandas as pd
import numpy as np
import os
from PIL import Image, ImageDraw, ImageFont

# Set random seed for reproducibility
np.random.seed(42)

# Parameters
num_samples = 1000
labels = ["safe", "harmful", "neutral"]
image_dir = "images"
image_size = (224, 224)

# Create images directory if it doesn't exist
os.makedirs(image_dir, exist_ok=True)

# Function to create a placeholder image
def create_placeholder_image(image_path: str, label: str):
    # Define colors for each label
    color_map = {
        "safe": (0, 255, 0),    # Green
        "harmful": (255, 0, 0), # Red
        "neutral": (128, 128, 128) # Gray
    }
    bg_color = color_map.get(label, (128, 128, 128))
    
    # Create image
    image = Image.new("RGB", image_size, bg_color)
    draw = ImageDraw.Draw(image)
    
    # Add label text
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except:
        font = ImageFont.load_default()
    
    # Calculate text position
    text = label.upper()
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width, text_height = text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1]
    text_position = ((image_size[0] - text_width) // 2, (image_size[1] - text_height) // 2)
    
    draw.text(text_position, text, font=font, fill=(255, 255, 255))
    image.save(image_path)

# Generate dataset
data = {
    "image_path": [],
    "label": []
}

for i in range(num_samples):
    label = np.random.choice(labels, p=[0.5, 0.3, 0.2])
    image_path = os.path.join(image_dir, f"image_{i}.jpg")
    data["image_path"].append(image_path)
    data["label"].append(label)
    create_placeholder_image(image_path, label)

# Create DataFrame
df = pd.DataFrame(data)

# Save to CSV
df.to_csv("image_dataset.csv", index=False)
print(f"Generated synthetic dataset with {num_samples} samples and saved to 'image_dataset.csv'")
print(f"Images saved in '{image_dir}' directory")