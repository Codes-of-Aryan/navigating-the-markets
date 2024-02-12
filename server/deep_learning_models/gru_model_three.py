import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from sklearn.metrics import mean_absolute_percentage_error

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, GRU, Dropout


def gru_three(stk_data,window_size,train_rate, drop_rate, batch_size, lstm_gru_units, epochs):
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

    #GRU Model Three
    def gru_model_three(av_rmse,av_rmse1,av_mape):
        model_loss_graph_points = []
        for i in range(10):
            GRU3 = Sequential()
            GRU3.add(GRU(lstm_gru_units, input_shape=(window_size, 1),return_sequences=True))
            GRU3.add(Dropout(drop_rate))
            GRU3.add(GRU(lstm_gru_units, input_shape=(window_size, 1),return_sequences=True))
            GRU3.add(Dropout(drop_rate))
            GRU3.add(GRU(lstm_gru_units, input_shape=(window_size, 1)),)
            GRU3.add(Dropout(drop_rate))
            GRU3.add(Dense(units = 1, activation = 'linear'))
            GRU3.compile(loss='mse', optimizer='adam')

            history=GRU3.fit(x_train,y_train,epochs=epochs,batch_size=batch_size, verbose=0)

            y_test_pred=GRU3.predict(x_test)
            y_train_pred=GRU3.predict(x_train)

            rmse=mean_squared_error(y_test,y_test_pred,squared=False)
            av_rmse=av_rmse+rmse
            y_test_pred_nn=sca.inverse_transform(y_test_pred)
            y_train_pred_nn=sca.inverse_transform(y_train_pred)
            y_test_nn=sca.inverse_transform(y_test)
            rmse1=mean_squared_error(y_test_nn,y_test_pred_nn,squared=False)
            mape=mean_absolute_percentage_error(y_test,y_test_pred)
            av_rmse1=av_rmse1+rmse1
            av_mape=av_mape+mape
            GRU3.reset_states()
            model_loss_graph_points.append(history.history['loss'])

        print('Mean Norm RMSE=',av_rmse/10,'Mean RMSE=',av_rmse1/10,'Mean MAPE=',av_mape/10)

        train=data_close[window_size:split_index+window_size]
        valid=data_close[split_index+window_size:]

        train['Prediction'] =y_train_pred_nn
        valid['Prediction'] =y_test_pred_nn

        return train[['Close','Prediction']], valid[['Close','Prediction']], model_loss_graph_points[0], av_rmse/10, av_rmse1/10, av_mape/10


    df1,df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = gru_model_three(av_rmse,av_rmse1,av_mape)
    return df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape