import json
import os
import pickle
import random
import urllib.request
from pathlib import Path

import tensorflow as tf
from matplotlib import pyplot as plt


class CNN(object):

    def __init__(self):
        self.model = tf.keras.Sequential([
            tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(150, 150, 1)),
            tf.keras.layers.MaxPool2D((2, 2)),
            tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
            tf.keras.layers.MaxPool2D(2, 2),
            tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),
            tf.keras.layers.MaxPool2D(2, 2),
            tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),
            tf.keras.layers.MaxPool2D(2, 2),
            tf.keras.layers.Flatten(),
            tf.keras.layers.Dropout(0.5),
            tf.keras.layers.Dense(512, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid')
        ])
        self.last_training_history = {}

    def print_model_info(self):
        print(self.model.summary())

    def get_model(self):
        return self.model

    def load_weights(self, filepath='model.h5'):
        self.model.load_weights(filepath)
        self.model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['acc']
        )

    def load_last_training_history(self, filepath='result.pk'):
        with open(filepath, 'rb') as f:
            self.last_training_history = pickle.load(f)

    def get_last_training_history(self):
        return self.last_training_history

    def plot_last_training_history(self, save_plot=False):
        for key in self.last_training_history:
            y = self.last_training_history[key]
            plt.plot([i + 1 for i in range(len(y))], y, label=key)
        plt.legend()
        plt.grid()
        plt.xlabel('epoch')
        if save_plot:
            plt.savefig('training_history.png', dpi=300)
        else:
            plt.show()

    def train(self, directory, epochs=100, save_model=False, save_history=False):
        train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
            rescale=1. / 255,
            rotation_range=20,
            width_shift_range=0.15,
            height_shift_range=0.15,
            shear_range=0.15,
            zoom_range=0.15,
            fill_mode='nearest',
            horizontal_flip=True,
            vertical_flip=False,
            brightness_range=None,
            channel_shift_range=0
        )

        test_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
            rescale=1. / 255)  

        train_generator = train_datagen.flow_from_directory(
            directory,
            target_size=(150, 150),
            batch_size=32,
            color_mode='grayscale',
            class_mode='binary'
        )

        test_generator = test_datagen.flow_from_directory(
            directory,
            target_size=(150, 150),
            batch_size=32,
            color_mode='grayscale',
            class_mode='binary'
        )

        self.model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['acc']
        )

        history = self.model.fit(
            train_generator,
            epochs=epochs,
            validation_data=test_generator
        )

        if save_model:
            self.model.save('model.h5')

        if save_history:
            with open('result.pk', 'wb') as f:
                pickle.dump(history.history, f)

        self.last_training_history = history.history

        return history.history

    def predict_directory(self, directory, probabilities=True):
        if directory[-1] != '\\' and directory[-1] != '/':
            directory += '/'
        predictions = {}
        onlyfiles = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]
        for image_file in onlyfiles:
            img = tf.keras.preprocessing.image.load_img(directory + image_file, target_size=(150, 150),
                                                        color_mode='grayscale')
            x = tf.keras.preprocessing.image.img_to_array(img, )
            x = x.reshape((1,) + x.shape)
            x = x / 255
            y = self.model.predict(x)[0][0]
            if probabilities:
                predictions[image_file] = y
            else:
                predictions[image_file] = y > 0.5
        return predictions

    def predict_single_image(self, file_url):
        self.load_weights()
        self.load_last_training_history()
        file_name = "image.jpg"
        urllib.request.urlretrieve(file_url, file_name)
        img = tf.keras.preprocessing.image.load_img(file_name, target_size=(150, 150),
                                                    color_mode='grayscale')
        x = tf.keras.preprocessing.image.img_to_array(img, )
        x = x.reshape((1,) + x.shape)
        x = x / 255
        prediction = self.model.predict(x)[0][0]
        is_default_image = prediction < 0.5
        print(prediction)
        os.remove(file_name)

        return json.dumps(True) if is_default_image else json.dumps(False)


def evaluate_on_directory(self, directory):
    val_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1. / 255)
    val_generator = val_datagen.flow_from_directory(
        directory,
        target_size=(150, 150),
        batch_size=32,
        color_mode='grayscale',
        class_mode='binary'
    )
    return self.model.evaluate(val_generator)


def split_directory(directory, train_size=0.75, test_size=0.2, val_size=0.05):
    assert train_size + test_size + val_size == 1
    assert 0 <= train_size <= 1 and 0 <= test_size <= 1 and 0 <= val_size <= 1
    subdirs = next(os.walk(directory))[1]
    if train_size > 0:
        os.mkdir(directory + '/train')
        for subdir in subdirs:
            os.mkdir(directory + '/train/' + subdir)
    if test_size > 0:
        os.mkdir(directory + '/test')
        for subdir in subdirs:
            os.mkdir(directory + '/test/' + subdir)
    if val_size > 0:
        os.mkdir(directory + '/val')
        for subdir in subdirs:
            os.mkdir(directory + '/val/' + subdir)
    pathlist = Path(directory).rglob('*.*')
    for path in pathlist:
        instance_path = str(path)
        instance_properties = instance_path.split('/') if '/' in instance_path else instance_path.split('\\')
        instance_name = instance_properties[-1]
        instance_class = instance_properties[-2]
        r = random.random()
        if r < val_size:
            subfolder = '/val/'
        elif r < test_size + val_size:
            subfolder = '/test/'
        else:
            subfolder = '/train/'
        os.rename(instance_path, '/'.join(instance_properties[:-2]) + subfolder + instance_class + '/' + instance_name)


if __name__ == '__main__':

    cnn = CNN()
    cnn.load_weights()
    cnn.load_last_training_history()
    cnn.print_model_info()
