import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from sklearn.metrics import mean_absolute_percentage_error

from tensorflow.keras.models import Model
from tensorflow.keras import regularizers
from tensorflow.keras.layers import Dense, Input

def autoencoder_model(stk_data,window_size,train_rate, batch_size, epochs):
    data_close=stk_data.filter(['Close'])

    s_data=data_close.values
    sca=MinMaxScaler(feature_range=(0,1))
    normal_data=sca.fit_transform(s_data)

    def data_split(data, step_size):
        x,y,z=[],[],[]
        for i in range(step_size,len(data)):
            x.append(data[i-step_size:i,-1])
            y.append(data[i-1,-1])
        return np.array(x), np.array(y)

    x1, y1=data_split(normal_data, step_size=window_size)


    split_index=int(np.ceil(len(x1)*(train_rate)))
    x_train,x_test=x1[:split_index],x1[split_index:]
    y_train,y_test=y1[:split_index],y1[split_index:]

    x_test=np.reshape(x_test,(x_test.shape[0],x_test.shape[1],1))
    x_train=np.reshape(x_train,(x_train.shape[0],x_train.shape[1],1))

    y_train=np.reshape(y_train,(y_train.shape[0],1))
    y_test=np.reshape(y_test,(y_test.shape[0],1))
    
    av_rmse=0
    av_rmse1=0
    av_mape=0

    #Auto Encoder Model
    def auto_enc_model(av_rmse,av_rmse1,av_mape):
        model_loss_graph_points = []
        for i in range(10):
            # No of encoding dimensions
            encoding_dim = 32
            input_dim = x_train.shape[1]
            input_layer = Input(shape=(input_dim, ))

            # Encoder
            encoder = Dense(encoding_dim, activation="tanh", activity_regularizer=regularizers.l1(1e-5))(input_layer)
            encoder = Dense(int(encoding_dim / 2), activation="relu")(encoder)
            # Decoder
            decoder = Dense(int(encoding_dim / 2), activation='tanh')(encoder)
            decoder = Dense(1, activation='relu')(decoder)
            autoencoder = Model(inputs=input_layer, outputs=decoder)
            nb_epoch = epochs
            b_size = batch_size

            # Fitting and compiling the train data using adam (stochastic gradient) optimiser and mse loss
            autoencoder.compile(optimizer='adam',loss='mean_squared_error')
            history = autoencoder.fit(x_train, y_train,epochs=nb_epoch,batch_size = b_size,shuffle=True)

            y_test_pred = autoencoder.predict(x_test)
            y_train_pred=autoencoder.predict(x_train)

            rmse=mean_squared_error(y_test,y_test_pred,squared=False)
            av_rmse=av_rmse+rmse
            y_test_pred_nn=sca.inverse_transform(y_test_pred)
            y_train_pred_nn=sca.inverse_transform(y_train_pred)
            y_test_nn=sca.inverse_transform(y_test)
            rmse1=mean_squared_error(y_test_nn,y_test_pred_nn,squared=False)
            mape=mean_absolute_percentage_error(y_test,y_test_pred)
            av_rmse1=av_rmse1+rmse1
            av_mape=av_mape+mape
            autoencoder.reset_states()
            model_loss_graph_points.append(history.history['loss'])

        print('Mean Norm RMSE=',av_rmse/10,'Mean RMSE=',av_rmse1/10,'Mean MAPE=',av_mape/10)

        train=data_close[window_size:split_index+window_size]
        valid=data_close[split_index+window_size:]

        train['Prediction'] =y_train_pred_nn
        valid['Prediction'] =y_test_pred_nn

        return train[['Close','Prediction']], valid[['Close','Prediction']], model_loss_graph_points[0], av_rmse/10, av_rmse1/10, av_mape/10
    

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = auto_enc_model(av_rmse,av_rmse1,av_mape)
    return df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape