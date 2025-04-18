import tensorflow as tf
import numpy as np
import cv2
import sys

# Load model
model = tf.keras.models.load_model("image_harmful_classifier.h5")

# Image Preprocessing
def preprocess_image(image_path, img_size=128):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (img_size, img_size))
    img = img.astype("float32") / 255.0
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Prediction function
def predict_image(image_path):
    img = preprocess_image(image_path)
    pred = model.predict(img)[0][0]
    if pred >= 0.5:
        print("Prediction: Harmful 🚫")
    else:
        print("Prediction: Safe ✅")

# CLI
if __name__ == "__main__":
    print("🖼️ Image Harmful Content Detector")
    while True:
        path = input("\nEnter image path (or 'exit' to quit): ")
        if path.lower() == "exit":
            break
        try:
            predict_image(path)
        except Exception as e:
            print(f"Error: {e}")
