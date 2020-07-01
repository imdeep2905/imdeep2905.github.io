import os
import tensorflow as tf
import tensorflowjs as tfjs

tf.compat.v1.disable_eager_execution()
model=tf.keras.models.load_model('1D.h5')
tfjs.converters.save_keras_model(model, '.')