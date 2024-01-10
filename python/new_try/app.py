from flask import Flask, jsonify, request
# from flask_cors import CORS
import os
import shutil
import numpy as np
from keras.preprocessing import image
from IPython.display import Image, display
import tensorflow_hub as hub
from keras.models import load_model
# from predict import predicted_class 
app = Flask(__name__)
# CORS(app)

model = load_model(
    "Yoga-Posture-Detection-BiT.h5",
    custom_objects={'KerasLayer': hub.KerasLayer}
)

def load_and_predict_image(image_path, model, target_size=(256, 256)):
    # Load and preprocess the image
    img = image.load_img(image_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalize the pixel values to be between 0 and 1

    # Make a prediction
    predictions = model.predict(img_array)

    # Return the predicted class
    predicted_class = np.argmax(predictions)
    return predicted_class

@app.route('/predict', methods=['POST'])
def predict():
    # Assuming the image file is sent as 'file' in the request
    file = request.files['file']
    

  


    # Save the file to a temporary directory
    temp_dir = 'temp_directory'
    if not os.path.exists(temp_dir):
      os.makedirs(temp_dir)
    file_path = os.path.join(temp_dir, file.filename)
    file.save(file_path)

    # Load and predict the image
    predicted_class = load_and_predict_image(file_path, model)

    # Return the predicted class as JSON
    # path = rf'C:\Users\efrat gavriel\Downloads\new_try\new_try\Dataset'
    class_names = ['Adho Mukha Svanasana', 'Adho Mukha Vrksasana', 'Alanasana', 'Anjaneyasana', 'Ardha Chandrasana', 'Ardha Matsyendrasana', 'Ardha Navasana', 'Ardha Pincha Mayurasana', 'Ashta Chandrasana', 'Baddha Konasana', 'Bakasana', 'Balasana', 'Bitilasana', 'Camatkarasana', 'Dhanurasana', 'Eka Pada Rajakapotasana', 'Garudasana', 'Halasana', 'Hanumanasana', 'Malasana', 'Marjaryasana', 'Navasana', 'Padmasana', 'Parsva Virabhadrasana', 'Parsvottanasana', 'Paschimottanasana', 'Phalakasana', 'Pincha Mayurasana', 'Salamba Bhujangasana', 'Salamba Sarvangasana', 'Setu Bandha Sarvangasana', 'Sivasana', 'Supta Kapotasana', 'Trikonasana', 'Upavistha Konasana', 'Urdhva Dhanurasana', 'Urdhva Mukha Svsnssana', 'Ustrasana', 'Utkatasana', 'Uttanasana', 'Utthita Hasta Padangusthasana', 'Utthita Parsvakonasana', 'Vasisthasana', 'Virabhadrasana One', 'Virabhadrasana Three', 'Virabhadrasana Two', 'Vrksasana']
    response = {'predicted_class': class_names[predicted_class+1]}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
