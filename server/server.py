from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from models import db, User, Topic, Comment
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
# import threading

app = Flask(__name__)
# CORS(app, origins=["http://localhost:3000"])
# CORS(app)

app.config['SECRET_KEY'] = 'tetsst'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
  
bcrypt = Bcrypt(app) 
CORS(app, supports_credentials=True)
db.init_app(app)
  
with app.app_context():
    db.create_all()

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
    print(stk_data)
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
    data_dict['mean_norm_rmse'] = round(mean_norm_rmse, 4)
    data_dict['mean_rmse'] = round(mean_rmse, 4)
    data_dict['mean_mape'] = round(mean_mape, 4)

    response = jsonify(data_dict)
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
    data_dict['mean_norm_rmse'] = round(mean_norm_rmse, 4)
    data_dict['mean_rmse'] = round(mean_rmse, 4)
    data_dict['mean_mape'] = round(mean_mape, 4)

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
    data_dict['mean_norm_rmse'] = round(mean_norm_rmse, 4)
    data_dict['mean_rmse'] = round(mean_rmse, 4)
    data_dict['mean_mape'] = round(mean_mape, 4)

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
    data_dict['mean_norm_rmse'] = round(mean_norm_rmse, 4)
    data_dict['mean_rmse'] = round(mean_rmse, 4)
    data_dict['mean_mape'] = round(mean_mape, 4)

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
    data_dict['mean_norm_rmse'] = round(mean_norm_rmse, 4)
    data_dict['mean_rmse'] = round(mean_rmse, 4)
    data_dict['mean_mape'] = round(mean_mape, 4)

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
    data_dict['mean_norm_rmse'] = round(mean_norm_rmse, 4)
    data_dict['mean_rmse'] = round(mean_rmse, 4)
    data_dict['mean_mape'] = round(mean_mape, 4)

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
    data_dict['mean_norm_rmse'] = round(mean_norm_rmse, 4)
    data_dict['mean_rmse'] = round(mean_rmse, 4)
    data_dict['mean_mape'] = round(mean_mape, 4)

    return jsonify(data_dict)

@app.route('/autoendcoder_model', methods=['OPTIONS'])
def handle_options():
    response_headers = {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        "Access-Control-Allow-Credentials": true,
    }
    return '', 200, response_headers
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
    data_dict['mean_norm_rmse'] = round(mean_norm_rmse, 4)
    data_dict['mean_rmse'] = round(mean_rmse, 4)
    data_dict['mean_mape'] = round(mean_mape, 4)

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
    data_dict['mean_norm_rmse'] = round(mean_norm_rmse, 4)
    data_dict['mean_rmse'] = round(mean_rmse, 4)
    data_dict['mean_mape'] = round(mean_mape, 4)

    return jsonify(data_dict)

@app.route("/test")
def test():
    time.sleep(80)
    return "<p>Work</p>"


@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
    username = request.json["username"]
 
    user_exists = User.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
    
    # Check if username already exists
    username_exists = User.query.filter_by(username=username).first() is not None
 
    if username_exists:
        return jsonify({"error": "Username already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, username=username)
    db.session.add(new_user)
    db.session.commit()
 
    session["user_id"] = new_user.id
    session["user_name"] = new_user.username
 
    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "username": new_user.username
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    username = request.json["username"]
  
    user = User.query.filter_by(email=email).first()
  
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
  
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    if user.username != username:
        return jsonify({"error": "Invalid username"}), 401
      
    session["user_id"] = user.id
    session["user_name"] = user.username
  
    return jsonify({
        "id": user.id,
        "email": user.email,
        "username": user.username
    })

@app.route('/check_session')
def check_session():
    if 'user_id' in session:
            return jsonify({ "Status": "Logged In" })

    return jsonify({ "Status": "Not Logged In" })

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return jsonify({ "Status": "Logged Out" })


@app.route('/all-topics', methods=['GET', 'POST'])
def topic():
    if request.method == 'POST':
        # Adding a new topic of discussion
        userId=request.json['userId']
        if userId[0] == '"' or userId[0] == "'":
            userId = userId[1:-1]
        
        username=request.json['userName']
        if username[0] == '"' or username[0] == "'":
            username = username[1:-1]
        
        topic = Topic(
            # userId=session['user_id'],   # get the id from session
            userId=userId,   # get the id from session
            title=request.json['title'],
            description=request.json['description'],
            # username=session['user_name'],     # get the username from session
            username=username,     # get the username from session
        )

        db.session.add(topic)
        db.session.commit()

    topics = Topic.query.all()
    topic_data = []
    for topic in topics:
        topic_data.append({
            "id": topic.id,
            "title": topic.title,
            "description": topic.description,
            "username": topic.username
        })

    return jsonify(topic_data)

@app.route('/topic/<int:id>', methods=['GET', 'POST'])
def comments(id):
    if request.method == 'POST':
        # Adding a new comment on that specific topic of discussion
        userId=request.json['userId']
        if userId[0] == '"' or userId[0] == "'":
            userId = userId[1:-1]
        
        username=request.json['userName']
        if username[0] == '"' or username[0] == "'":
            username = username[1:-1]
        comment = Comment(
            # userId=session['user_id'],   # get the id from session
            userId=userId,   # get the id from session
            text=request.json['text'],
            # username=session['user_name'],   # get the username from session
            username=username,     # get the username from session
            topicId=id
        )

        db.session.add(comment)
        db.session.commit()

    comments = Comment.query.filter_by(topicId=id).all()
    
    comment_data = []
    for comment in comments:
        comment_data.append({
            "id": comment.userId,
            "text": comment.text,
            "username": comment.username,
            "topicId": comment.topicId
        })

    return jsonify(comment_data)