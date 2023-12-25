import cv2
import numpy as np
from keras.preprocessing import image
from keras import backend as K
# טעינת מודל (השורות הבאות מקבלות את מבנה המודל ומשקלים)
from keras.models import model_from_json


poses = [
   "Bridge-Pose",
   "Child-Pose",
   "Cobra-Pose",
   "Downward-Dog-Pose",
   "Pigeon-Pose",
   "Standing-Mountain-Pose",
    "Tree-Pose",
    "Triangle-Pose",
    "Warrior-Pose"


]

def custom_activation(x):
   return  K.relu(x)**1.2125
with open('cnn12.json', 'r') as json_file:
    loaded_model_json = json_file.read()

loaded_model = model_from_json(loaded_model_json, custom_objects={'custom_activation': custom_activation})
loaded_model.load_weights("cnn12_weights.h5")

# print(loaded_model)

# קריאת תמונה
img_path = rf"C:\Users\Bat_Sheva\OneDrive\שולחן העבודה\yoga\experienced-yogi-doing-wheel-yoga-pose-gym.jpg"# יש להחליף כתובת התמונה שלך
img = image.load_img(img_path, target_size=(100, 100))
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)

# תהליך נורמליזציה או כל תהליך נדרש לפי הטעמים של המודל
img_array /= 255.0  # או כל תהליך אחר שהמודל מצפה לו

# חיזוי
prediction = loaded_model.predict(img_array)

# הדפסת התוצאה

# הגדרת המערכים להצגה כאחוזים רגילים
np.set_printoptions(formatter={'float': lambda x: "{:.2f}%".format(x * 100)})

# הדפסת התוצאה
print("Predictions:", prediction)
predicted_class = np.argmax(prediction)
# print("Predicted class:", predicted_class)
confidence_percentage = np.max(prediction) * 100
print(f"Predicted class: {poses[predicted_class]}\nConfidence percentage:  {confidence_percentage:.2f}%")

