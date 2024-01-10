import os

path = rf'./Dataset'
class_names = sorted(os.listdir(path))

print(class_names)