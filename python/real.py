# Common
import os 
import keras 
import pandas as pd
import numpy as np
import tensorflow as tf
from IPython.display import clear_output as cls

# Data Visualization
import matplotlib.pyplot as plt
import plotly.express as px

# Data Loading
from keras.preprocessing.image import ImageDataGenerator as IDG

# Model 
import tensorflow_hub as hub
from keras.layers import Dense
from keras.models import Sequential, load_model

# Callbacks 
from keras.callbacks import EarlyStopping, ModelCheckpoint

# LR Scheduler
from tensorflow.keras.optimizers.schedules import PiecewiseConstantDecay as PWCD
from tensorflow.keras.optimizers import SGD

# Metrics
from keras.metrics import SparseCategoricalAccuracy, SparseTopKCategoricalAccuracy

# Specify Data Path
path = './archive'

# Class Name
class_names = sorted(os.listdir(path))
# class_names.remove("Poses.json")
n_classes = len(class_names)

# Show
print(f"Total Number of Classes : {n_classes}")
print(f"Classes : \n{class_names}")

# Calculate Class Dis
class_dis = [len(os.listdir(path + f"/{name}")) for name in class_names]

# Pie Plot
fig = px.pie(names=class_names, values=class_dis, title="Class Distribution")
fig.update_layout({'title':{'x':0.5}})
fig.show()

# Bar Plot
fig = px.bar(x=class_names, y=class_dis, color=class_names)
fig.show()

# Initialize Generators
train_gen = IDG(rescale=1./255, rotation_range=10, validation_split=0.1)

# Load Data
train_ds = train_gen.flow_from_directory(path, target_size=(256,256), class_mode='binary', shuffle=True, batch_size=32, subset='training')
valid_ds = train_gen.flow_from_directory(path, target_size=(256,256), class_mode='binary', shuffle=True, batch_size=32, subset='validation')

def show_images(data, model=None, GRID=[5,6], SIZE=(25,25)):
    
    # Plot Configurations
    n_rows, n_cols = GRID
    n_images = n_rows * n_cols
    plt.figure(figsize=SIZE)
    
    i = 1
    for images, labels in iter(data):
        
        # Select Random Data
        
        id = np.random.randint(len(images))
        image, label = tf.expand_dims(images[id], axis=0), class_names[int(labels[id])]
        # Make Prediction
        if model is not None:
            pred = class_names[np.argmax(model.predict(image))]
            title = f"True : {label}\nPred : {pred}"
            return pred
        else:
            title = f"{label}"
        
        # Show Data
        plt.subplot(n_rows, n_cols, i)
        plt.imshow(image[0])
        plt.axis('off')
        plt.title(title)
        
        # Break Loop Once Done
        i+=1
        if i>n_images:
            break
        cls()
    # print(pred)
    # plt.show()
    # return pred

# %%time
show_images(data=train_ds)

def create_yoga_posture_model(n_classes):
    # Model URL
    url = "https://tfhub.dev/google/bit/m-r50x1/1"

    # Load Model
    bit = hub.KerasLayer(url)

    # Model Name
    model_name = "Yoga-Posture-Detection-BiT"

    # Model Architecture
    model = Sequential([
        bit,
        Dense(n_classes, activation='softmax', kernel_initializer='zeros')
    ], name=model_name)

    # Optimizer
    learning_rate = 5e-2 * 32/512
    lr_scheduler = PWCD(
        boundaries=[100, 150, 200],
        values=[learning_rate, learning_rate*0.1, learning_rate*0.01, learning_rate*0.001],
        name="LearningRate"
    )
    optimizer = SGD(learning_rate=lr_scheduler, momentum=0.9)
    print(f"Learning Rate: {learning_rate}")

    # Compile Model
    model.compile(
        loss='sparse_categorical_crossentropy',
        optimizer=optimizer,
        metrics=[
            SparseCategoricalAccuracy(name="accuracy"),
            SparseTopKCategoricalAccuracy(k=3, name="Top3Acc")
        ]
    )

    # Callbacks
    callbacks = [
        EarlyStopping(patience=3, restore_best_weights=True),
        ModelCheckpoint(model_name+".h5", save_best_only=True)
    ]

    return model, callbacks

# Example usage:

model, callbacks = create_yoga_posture_model(n_classes)

# Train Model
history = model.fit(
    train_ds, 
    validation_data=valid_ds,
    epochs=10, # With the right learning rate, only 5 will also work.
    callbacks=cbs
)

data = pd.DataFrame(history.history)
print(data)
# ///
model.evaluate(valid_ds)

show_images(data=valid_ds, model=model)

import shutil
import os
from keras.preprocessing.image import ImageDataGenerator

# יצירת תיקייה זמנית
temp_dir = 'temp_directory/directory'
os.makedirs(temp_dir, exist_ok=True)
path_i = rf"C:\Users\Bat_Sheva\OneDrive\שולחן העבודה\yoga\yoga-images (2).jpg"
# העתקת התמונה לתיקייה זו
shutil.copy(path_i, temp_dir)


path_4 = 'temp_directory'
for subdir, dirs, files in os.walk(path_4):
    print(f"Directory: {subdir}")
    for file in files:
        print(f"  File: {file}")

from keras.preprocessing.image import ImageDataGenerator

data_generator = ImageDataGenerator(rescale=1./255)

train_gen1 = data_generator.flow_from_directory(
    path_4,
    target_size=(256, 256),
    class_mode='binary',
    shuffle=True,
    batch_size=1
)

# valid_ds2 = train_gen.flow_from_directory(path_4, class_mode='binary', shuffle=True, batch_size=1, subset='validation')
pred = show_images(data=train_gen1, model=model, GRID=(1,1), SIZE=(1,1))
print(pred)
