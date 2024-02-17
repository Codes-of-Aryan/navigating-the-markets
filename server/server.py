from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import json

import deep_learning_models.lstm_model_one as l1
import deep_learning_models.lstm_model_two as l2
import deep_learning_models.lstm_model_three as l3
import deep_learning_models.gru_model_one as g1
import deep_learning_models.gru_model_two as g2
import deep_learning_models.gru_model_three as g3
import deep_learning_models.basic_ann_model as ann
import deep_learning_models.autoendcoder_model as autoenc
import deep_learning_models.rnn_model as rnn

import pandas as pd
import time
import threading

from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

ALLOWED_EXTENSIONS = set(['csv'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/lstm_model_one", methods=['POST'])
def lstm_model_one():
    print("Recieved Request")
    # assuming that getting data in format from frontend form-data
    stk_data = request.files['file']
    if stk_data and allowed_file(stk_data.filename):
        stk_data.save(secure_filename(stk_data.filename))
        stk_data = pd.read_csv(stk_data.filename, index_col='Date')
    else:
        return "<p>upload correct file</p>"
    
    data = json.loads(request.form['data'])
    print(data)

    window_size=data['window_size']
    train_rate=data['train_rate']

    drop_rate=data['drop_rate']
    batch_size=data['batch_size']
    lstm_gru_units=data['lstm_gru_units']
    epochs = data['epochs']

    print("running")

    # threading.Thread(target=lstm_one, args=(stk_data,window_size,train_rate, drop_rate, batch_size, lstm_gru_units)).start()
    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = l1.lstm_one(stk_data,window_size,train_rate, drop_rate, batch_size, lstm_gru_units,epochs)

    date_train = df1.index.to_list()
    train_original_price = df1['Close'].tolist()
    train_prediction_price = df1['Prediction'].tolist()

    date_valid = df2.index.to_list()
    valid_original_price = df2['Close'].tolist()
    valid_prediction_price = df2['Prediction'].tolist()

    data_dict = {}
    data_dict['date_train'] = date_train
    data_dict['train_original_price'] = train_original_price
    data_dict['train_prediction_price'] = train_prediction_price
    data_dict['date_valid'] = date_valid
    data_dict['valid_original_price'] = valid_original_price
    data_dict['valid_prediction_price'] = valid_prediction_price
    data_dict['model_loss'] = model_loss
    data_dict['mean_norm_rmse'] = mean_norm_rmse
    data_dict['mean_rmse'] = mean_rmse
    data_dict['mean_mape'] = mean_mape

    response = jsonify(data_dict)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

@app.route("/lstm_model_two", methods=['POST'])
def lstm_model_two():

    # assuming that getting data in format from frontend form-data
    stk_data = request.files['file']
    if stk_data and allowed_file(stk_data.filename):
        stk_data.save(secure_filename(stk_data.filename))
        stk_data = pd.read_csv(stk_data.filename, index_col='Date')
    else:
        return "<p>upload correct file</p>"
    
    data = json.loads(request.form['data'])

    window_size=data['window_size']
    train_rate=data['train_rate']

    drop_rate=data['drop_rate']
    batch_size=data['batch_size']
    lstm_gru_units=data['lstm_gru_units']
    epochs = data['epochs']

    print("running")

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = l2.lstm_two(stk_data,window_size,train_rate, drop_rate, batch_size, lstm_gru_units, epochs)
    
    date_train = df1.index.to_list()
    train_original_price = df1['Close'].tolist()
    train_prediction_price = df1['Prediction'].tolist()

    date_valid = df2.index.to_list()
    valid_original_price = df2['Close'].tolist()
    valid_prediction_price = df2['Prediction'].tolist()

    data_dict = {}
    data_dict['date_train'] = date_train
    data_dict['train_original_price'] = train_original_price
    data_dict['train_prediction_price'] = train_prediction_price
    data_dict['date_valid'] = date_valid
    data_dict['valid_original_price'] = valid_original_price
    data_dict['valid_prediction_price'] = valid_prediction_price
    data_dict['model_loss'] = model_loss
    data_dict['mean_norm_rmse'] = mean_norm_rmse
    data_dict['mean_rmse'] = mean_rmse
    data_dict['mean_mape'] = mean_mape

    return jsonify(data_dict)

@app.route("/lstm_model_three", methods=['POST'])
def lstm_model_three():

    # assuming that getting data in format from frontend form-data
    stk_data = request.files['file']
    if stk_data and allowed_file(stk_data.filename):
        stk_data.save(secure_filename(stk_data.filename))
        stk_data = pd.read_csv(stk_data.filename, index_col='Date')
    else:
        return "<p>upload correct file</p>"
    
    data = json.loads(request.form['data'])

    window_size=data['window_size']
    train_rate=data['train_rate']

    drop_rate=data['drop_rate']
    batch_size=data['batch_size']
    lstm_gru_units=data['lstm_gru_units']
    epochs = data['epochs']

    print("running")

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = l3.lstm_three(stk_data,window_size,train_rate, drop_rate, batch_size, lstm_gru_units,epochs)
    date_train = df1.index.to_list()
    train_original_price = df1['Close'].tolist()
    train_prediction_price = df1['Prediction'].tolist()

    date_valid = df2.index.to_list()
    valid_original_price = df2['Close'].tolist()
    valid_prediction_price = df2['Prediction'].tolist()

    data_dict = {}
    data_dict['date_train'] = date_train
    data_dict['train_original_price'] = train_original_price
    data_dict['train_prediction_price'] = train_prediction_price
    data_dict['date_valid'] = date_valid
    data_dict['valid_original_price'] = valid_original_price
    data_dict['valid_prediction_price'] = valid_prediction_price
    data_dict['model_loss'] = model_loss
    data_dict['mean_norm_rmse'] = mean_norm_rmse
    data_dict['mean_rmse'] = mean_rmse
    data_dict['mean_mape'] = mean_mape

    return jsonify(data_dict)

@app.route("/gru_model_one", methods=['POST'])
def gru_model_one():

    # assuming that getting data in format from frontend form-data
    stk_data = request.files['file']
    if stk_data and allowed_file(stk_data.filename):
        stk_data.save(secure_filename(stk_data.filename))
        stk_data = pd.read_csv(stk_data.filename, index_col='Date')
    else:
        return "<p>upload correct file</p>"
    
    data = json.loads(request.form['data'])

    window_size=data['window_size']
    train_rate=data['train_rate']

    drop_rate=data['drop_rate']
    batch_size=data['batch_size']
    lstm_gru_units=data['lstm_gru_units']
    epochs = data['epochs']

    print("running")

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = g1.gru_one(stk_data,window_size,train_rate, drop_rate, batch_size, lstm_gru_units, epochs)
    date_train = df1.index.to_list()
    train_original_price = df1['Close'].tolist()
    train_prediction_price = df1['Prediction'].tolist()

    date_valid = df2.index.to_list()
    valid_original_price = df2['Close'].tolist()
    valid_prediction_price = df2['Prediction'].tolist()

    data_dict = {}
    data_dict['date_train'] = date_train
    data_dict['train_original_price'] = train_original_price
    data_dict['train_prediction_price'] = train_prediction_price
    data_dict['date_valid'] = date_valid
    data_dict['valid_original_price'] = valid_original_price
    data_dict['valid_prediction_price'] = valid_prediction_price
    data_dict['model_loss'] = model_loss
    data_dict['mean_norm_rmse'] = mean_norm_rmse
    data_dict['mean_rmse'] = mean_rmse
    data_dict['mean_mape'] = mean_mape

    return jsonify(data_dict)

@app.route("/gru_model_two", methods=['POST'])
def gru_model_two():

    # assuming that getting data in format from frontend form-data
    stk_data = request.files['file']
    if stk_data and allowed_file(stk_data.filename):
        stk_data.save(secure_filename(stk_data.filename))
        stk_data = pd.read_csv(stk_data.filename, index_col='Date')
    else:
        return "<p>upload correct file</p>"
    
    data = json.loads(request.form['data'])

    window_size=data['window_size']
    train_rate=data['train_rate']

    drop_rate=data['drop_rate']
    batch_size=data['batch_size']
    lstm_gru_units=data['lstm_gru_units']
    epochs = data['epochs']

    print("running")

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = g2.gru_two(stk_data,window_size,train_rate, drop_rate, batch_size, lstm_gru_units, epochs)
    date_train = df1.index.to_list()
    train_original_price = df1['Close'].tolist()
    train_prediction_price = df1['Prediction'].tolist()

    date_valid = df2.index.to_list()
    valid_original_price = df2['Close'].tolist()
    valid_prediction_price = df2['Prediction'].tolist()

    data_dict = {}
    data_dict['date_train'] = date_train
    data_dict['train_original_price'] = train_original_price
    data_dict['train_prediction_price'] = train_prediction_price
    data_dict['date_valid'] = date_valid
    data_dict['valid_original_price'] = valid_original_price
    data_dict['valid_prediction_price'] = valid_prediction_price
    data_dict['model_loss'] = model_loss
    data_dict['mean_norm_rmse'] = mean_norm_rmse
    data_dict['mean_rmse'] = mean_rmse
    data_dict['mean_mape'] = mean_mape

    return jsonify(data_dict)

@app.route("/gru_model_three", methods=['POST'])
def gru_model_three():

    # assuming that getting data in format from frontend form-data
    stk_data = request.files['file']
    if stk_data and allowed_file(stk_data.filename):
        stk_data.save(secure_filename(stk_data.filename))
        stk_data = pd.read_csv(stk_data.filename, index_col='Date')
    else:
        return "<p>upload correct file</p>"
    
    data = json.loads(request.form['data'])

    window_size=data['window_size']
    train_rate=data['train_rate']

    drop_rate=data['drop_rate']
    batch_size=data['batch_size']
    lstm_gru_units=data['lstm_gru_units']
    epochs = data['epochs']

    print("running")

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = g3.gru_three(stk_data,window_size,train_rate, drop_rate, batch_size, lstm_gru_units, epochs)
    date_train = df1.index.to_list()
    train_original_price = df1['Close'].tolist()
    train_prediction_price = df1['Prediction'].tolist()

    date_valid = df2.index.to_list()
    valid_original_price = df2['Close'].tolist()
    valid_prediction_price = df2['Prediction'].tolist()

    data_dict = {}
    data_dict['date_train'] = date_train
    data_dict['train_original_price'] = train_original_price
    data_dict['train_prediction_price'] = train_prediction_price
    data_dict['date_valid'] = date_valid
    data_dict['valid_original_price'] = valid_original_price
    data_dict['valid_prediction_price'] = valid_prediction_price
    data_dict['model_loss'] = model_loss
    data_dict['mean_norm_rmse'] = mean_norm_rmse
    data_dict['mean_rmse'] = mean_rmse
    data_dict['mean_mape'] = mean_mape

    return jsonify(data_dict)


@app.route("/basic_ann_model", methods=['POST'])
def ann_model():

    # assuming that getting data in format from frontend form-data
    stk_data = request.files['file']
    if stk_data and allowed_file(stk_data.filename):
        stk_data.save(secure_filename(stk_data.filename))
        stk_data = pd.read_csv(stk_data.filename, index_col='Date')
    else:
        return "<p>upload correct file</p>"
    
    data = json.loads(request.form['data'])

    window_size=data['window_size']
    train_rate=data['train_rate']

    drop_rate=data['drop_rate']
    batch_size=data['batch_size']
    epochs = data['epochs']

    print("running")

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = ann.artificial_neural_network_model(stk_data,window_size,train_rate, drop_rate, batch_size, epochs)
    date_train = df1.index.to_list()
    train_original_price = df1['Close'].tolist()
    train_prediction_price = df1['Prediction'].tolist()

    date_valid = df2.index.to_list()
    valid_original_price = df2['Close'].tolist()
    valid_prediction_price = df2['Prediction'].tolist()

    data_dict = {}
    data_dict['date_train'] = date_train
    data_dict['train_original_price'] = train_original_price
    data_dict['train_prediction_price'] = train_prediction_price
    data_dict['date_valid'] = date_valid
    data_dict['valid_original_price'] = valid_original_price
    data_dict['valid_prediction_price'] = valid_prediction_price
    data_dict['model_loss'] = model_loss
    data_dict['mean_norm_rmse'] = mean_norm_rmse
    data_dict['mean_rmse'] = mean_rmse
    data_dict['mean_mape'] = mean_mape

    return jsonify(data_dict)

@app.route("/autoendcoder_model", methods=['POST'])
def autoendcoder_model():

    # assuming that getting data in format from frontend form-data
    stk_data = request.files['file']
    if stk_data and allowed_file(stk_data.filename):
        stk_data.save(secure_filename(stk_data.filename))
        stk_data = pd.read_csv(stk_data.filename, index_col='Date')
    else:
        return "<p>upload correct file</p>"
    
    data = json.loads(request.form['data'])

    window_size=data['window_size']
    train_rate=data['train_rate']

    batch_size=data['batch_size']
    epochs = data['epochs']

    print("running")

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = autoenc.autoencoder_model(stk_data,window_size,train_rate, batch_size, epochs)
    date_train = df1.index.to_list()
    train_original_price = df1['Close'].tolist()
    train_prediction_price = df1['Prediction'].tolist()

    date_valid = df2.index.to_list()
    valid_original_price = df2['Close'].tolist()
    valid_prediction_price = df2['Prediction'].tolist()

    data_dict = {}
    data_dict['date_train'] = date_train
    data_dict['train_original_price'] = train_original_price
    data_dict['train_prediction_price'] = train_prediction_price
    data_dict['date_valid'] = date_valid
    data_dict['valid_original_price'] = valid_original_price
    data_dict['valid_prediction_price'] = valid_prediction_price
    data_dict['model_loss'] = model_loss
    data_dict['mean_norm_rmse'] = mean_norm_rmse
    data_dict['mean_rmse'] = mean_rmse
    data_dict['mean_mape'] = mean_mape

    return jsonify(data_dict)

@app.route("/rnn_model", methods=['POST'])
def rnn_model():

    # assuming that getting data in format from frontend form-data
    stk_data = request.files['file']
    if stk_data and allowed_file(stk_data.filename):
        stk_data.save(secure_filename(stk_data.filename))
        stk_data = pd.read_csv(stk_data.filename, index_col='Date')
    else:
        return "<p>upload correct file</p>"
    
    data = json.loads(request.form['data'])

    window_size=data['window_size']
    train_rate=data['train_rate']

    batch_size=data['batch_size']
    epochs = data['epochs']

    print("running")

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = rnn.recurrent_neural_network_model(stk_data,window_size,train_rate, batch_size, epochs)
    date_train = df1.index.to_list()
    train_original_price = df1['Close'].tolist()
    train_prediction_price = df1['Prediction'].tolist()

    date_valid = df2.index.to_list()
    valid_original_price = df2['Close'].tolist()
    valid_prediction_price = df2['Prediction'].tolist()

    data_dict = {}
    data_dict['date_train'] = date_train
    data_dict['train_original_price'] = train_original_price
    data_dict['train_prediction_price'] = train_prediction_price
    data_dict['date_valid'] = date_valid
    data_dict['valid_original_price'] = valid_original_price
    data_dict['valid_prediction_price'] = valid_prediction_price
    data_dict['model_loss'] = model_loss
    data_dict['mean_norm_rmse'] = mean_norm_rmse
    data_dict['mean_rmse'] = mean_rmse
    data_dict['mean_mape'] = mean_mape

    return jsonify(data_dict)

@app.route("/test")
def test():
    time.sleep(80)
    return "<p>Work</p>"