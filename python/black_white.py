from PIL import Image
import os

# שם התיקיה שבה נמצאים התמונות
input_folder = 'Dataset'

# שם התיקיה שבה יישמרו התמונות ששונו לשחור לבן
output_folder = 'BlackAndWhiteDataset'

# יצירת תיקיה חדשה אם איננה קיימת
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# פונקציה שמשנה את התמונה לשחור לבן
def convert_to_black_and_white(input_path, output_path):
    image = Image.open(input_path).convert('L')  # קביעת מצב צבע לשחור לבן
    image.save(output_path)

# לולאה שעוברת על כל קובץ בתיקיה המקורית ושומרת את התמונה המשונתה בתיקיה החדשה
for root, dirs, files in os.walk(input_folder):
    for file in files:
        input_path = os.path.join(root, file)
        output_path = os.path.join(output_folder, file)
        convert_to_black_and_white(input_path, output_path)

print("התמונות הומרו בהצלחה לשחור לבן!")


