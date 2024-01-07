from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing import image
import os


def expend(original, expanded):
    # נתיב לתיקיית התמונות המקורית
    original_dataset_path = original #'.\Dataset\Adho Mukha Svanasana'

    # נתיב לתיקיית היעד לשמירת התמונות המורחבות
    expanded_dataset_path = expanded #'.\e_images\Adho Mukha Svanasana'

    if not os.path.exists(expanded_dataset_path):
        os.makedirs(expanded_dataset_path)
        print(f"The directory '{expanded_dataset_path}' was created.")
    else:
        print(f"The directory '{expanded_dataset_path}' already exist")


    # מגדיר גנרטור של Data Augmentation
    datagen = ImageDataGenerator(
        rotation_range=40,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest'
    )

    # מקבל את שמות כל הקבצים בתיקיית המקור
    image_files = [f for f in os.listdir(original_dataset_path) if os.path.isfile(os.path.join(original_dataset_path, f))]

    # מפעיל את Data Augmentation ושומר את התמונות המורחבות בתיקיית היעד
    for image_file in image_files:
        img = image.load_img(os.path.join(original_dataset_path, image_file))
        x = image.img_to_array(img)
        x = x.reshape((1,) + x.shape)

        i = 0
        for batch in datagen.flow(x, batch_size=1, save_to_dir=expanded_dataset_path, save_prefix=image_file.split('.')[0], save_format='jpg'):
            i += 1
            if i > 4:  # כמה תמונות ליצור לכל תמונה מקורית (ניתן לשנות)
                break


for subdir, dirs, files in os.walk('.\Dataset'):
    for dir in dirs:
        expend(f".\Dataset\{dir}", f".\e_images\{dir}")
    # for file in files:
    #     print(f"  File: {file}")