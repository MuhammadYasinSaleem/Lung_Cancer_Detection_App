from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import tensorflow as tf
from app.vit_attention import ViTAttention

app = FastAPI()

model = tf.keras.models.load_model("app/model.keras", custom_objects={'ViTAttention': ViTAttention})

@app.get("/")
async def root():
    return {"message": "Server started running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = Image.open(file.file).convert("RGB").resize((512,512))
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    
    prediction = model.predict(img_array)
    result = "Cancer Detected" if prediction[0][0] > 0.5 else "No Cancer Detected"
    
    return JSONResponse(content={"result": result, "confidence": float(prediction[0][0])})
