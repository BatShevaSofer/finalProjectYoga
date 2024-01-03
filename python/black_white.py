from PIL import Image
import os
from shutil import copytree

# שם התיקיה שבה נמצאים התמונות
input_folder = 'Dataset'

# שם התיקיה שבה יישמרו התמונות ששונו לשחור לבן
output_folder = 'BlackAndWhiteDataset'

# פונקציה שמשנה את התמונה לשחור לבן
def convert_to_black_and_white(input_path, output_path):
    image = Image.open(input_path).convert('L')  # קביעת מצב צבע לשחור לבן
    image.save(output_path)

# לולאה שעוברת על כל תיקיות התמונות בתיקיה המקורית
for root, dirs, files in os.walk(input_folder):
    for dir in dirs:
        input_dir = os.path.join(input_folder, dir)
        output_dir = os.path.join(output_folder, dir)

        # יצירת תיקיה חדשה לתמונות ששונו לשחור לבן
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        # לולאה שעוברת על כל קובץ בתיקייה ושומרת את התמונה המשונתה בתיקיה החדשה
        for file in os.listdir(input_dir):
            input_path = os.path.join(input_dir, file)
            output_path = os.path.join(output_dir, file)
            convert_to_black_and_white(input_path, output_path)

print("התמונות הומרו בהצלחה לשחור לבן ונשמרו לפי תיקיות!")
