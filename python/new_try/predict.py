
import os
import shutil
import numpy as np
from keras.preprocessing import image
from IPython.display import Image, display
import tensorflow_hub as hub
from keras.models import load_model

model = load_model(
    rf'C:\Users\efrat gavriel\Downloads\new_try\Yoga-Posture-Detection-BiT.h5',
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

    # Display the image
    display(Image(filename=image_path))

    # Print the prediction
    # print("Predictions:")
    # for i, pred in enumerate(predictions[0]):
    #     print(f"Class {i}: {pred:.2%}")

    # Return the predicted class
    predicted_class = np.argmax(predictions)
    return predicted_class

# Example usage:
image_path = rf"C:\Users\efrat gavriel\Downloads\experienced-yogi-doing-seated-forward-bend-yoga-pose.jpg"
predicted_class = load_and_predict_image(image_path, model)
path = rf'C:\Users\efrat gavriel\Downloads\new_try\new_try\Dataset'
class_names = sorted(os.listdir(path))
print(class_names)
print(f"Predicted Class: {class_names[predicted_class]}")
