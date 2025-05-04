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



# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     image = Image.open(file.file).convert("RGB").resize((512,512))
#     img_array = np.array(image) / 255.0
#     img_tensor = tf.convert_to_tensor(img_array, dtype=tf.float32)
#     img_tensor = tf.image.random_contrast(img_tensor, lower=0.8, upper=1.2)
#     img_tensor = tf.expand_dims(img_tensor, axis=0)
    
#     prediction = model.predict(img_tensor)
#     result = "Cancer Detected" if prediction[0][0] > 0.5 else "No Cancer Detected"
#     return JSONResponse(content={"result": result, "confidence": float(prediction[0][0])})









# class_names = ["No Cancer Detected", "Cancer Detected"]

# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     image = Image.open(file.file).convert("RGB").resize((512, 512))
#     img_array = np.array(image) / 255.0
#     img_tensor = tf.convert_to_tensor(img_array, dtype=tf.float32)
#     img_tensor = tf.image.random_contrast(img_tensor, lower=0.8, upper=1.2)
#     img_tensor = tf.expand_dims(img_tensor, axis=0)

#     predictions = model.predict(img_tensor)
#     index = int(np.argmax(predictions))
#     confidence = float(predictions[0][index])
#     result = class_names[index]

#     return JSONResponse(content={"result": result, "confidence": confidence})


