from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import json

import deep_learning_models.lstm_model_one as l1
import deep_learning_models.lstm_model_two as l2
import deep_learning_models.lstm_model_three as l3
import deep_learning_models.gru_model_one as g1
import deep_learning_models.gru_model_two as g2
import deep_learning_models.gru_model_three as g3
import pandas as pd
import time
import threading

app = Flask(__name__)

ALLOWED_EXTENSIONS = set(['csv'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/lstm_model_one", methods=['POST'])
def lstm_model_one():

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
    Batch_size=data['Batch_size']
    Lstm_gru_units=data['Lstm_gru_units']
    epochs = data['epochs']

    print("running")

    # threading.Thread(target=lstm_one, args=(stk_data,window_size,train_rate, drop_rate, Batch_size, Lstm_gru_units)).start()
    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = l1.lstm_one(stk_data,window_size,train_rate, drop_rate, Batch_size, Lstm_gru_units,epochs)

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
    Batch_size=data['Batch_size']
    Lstm_gru_units=data['Lstm_gru_units']
    epochs = data['epochs']

    print("running")

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = l2.lstm_two(stk_data,window_size,train_rate, drop_rate, Batch_size, Lstm_gru_units, epochs)
    
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
    Batch_size=data['Batch_size']
    Lstm_gru_units=data['Lstm_gru_units']
    epochs = data['epochs']

    print("running")

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = l3.lstm_three(stk_data,window_size,train_rate, drop_rate, Batch_size, Lstm_gru_units,epochs)
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
    Batch_size=data['Batch_size']
    Lstm_gru_units=data['Lstm_gru_units']
    epochs = data['epochs']

    print("running")

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = g1.gru_one(stk_data,window_size,train_rate, drop_rate, Batch_size, Lstm_gru_units, epochs)
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
    Batch_size=data['Batch_size']
    Lstm_gru_units=data['Lstm_gru_units']
    epochs = data['epochs']

    print("running")

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = g2.gru_two(stk_data,window_size,train_rate, drop_rate, Batch_size, Lstm_gru_units, epochs)
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
    Batch_size=data['Batch_size']
    Lstm_gru_units=data['Lstm_gru_units']
    epochs = data['epochs']

    print("running")

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = g3.gru_three(stk_data,window_size,train_rate, drop_rate, Batch_size, Lstm_gru_units, epochs)
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