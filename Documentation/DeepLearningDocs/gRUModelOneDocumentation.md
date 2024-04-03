### GRU Model One Documentation

This code defines a function named `gru_one` that performs stock price prediction using the GRU (Gated Recurrent Unit) neural network. The function takes the following input parameters:

- `stk_data`: The stock data.
- `window_size`: The size of the input window.
- `train_rate`: The training rate, which determines the proportion of data used for training.
- `drop_rate`: The dropout rate, which controls the regularization of the model.
- `batch_size`: The batch size used during training.
- `lstm_gru_units`: The number of GRU units in the GRU layer.
- `epochs`: The number of epochs for training the model.

### Preprocessing

The function starts by preprocessing the stock data. It filters the 'Close' column from the stock data and applies the MinMaxScaler to normalize the data. This step ensures that the data is within a specific range (0 to 1) and helps improve the performance of the model.

### Data Split

The normalized data is split into training and testing sets based on the specified training rate. The function uses the `data_split` function to create input sequences and corresponding target values. The input sequences are created by taking a sliding window of size `window_size` over the data, and the target values are set to the last value of each window. The training and testing data are split based on the training rate.

### Model Architecture

The GRU model consists of a single GRU layer followed by a dropout layer for regularization and a dense layer for the model output. The GRU layer does not have `return_sequences=True`, so it only returns the final hidden state output. This architecture is commonly used when only the final prediction for the sequence is needed, without considering the temporal dependencies within the sequence. The model is compiled with the mean squared error (MSE) loss function and the Adam optimizer.

### Training and Evaluation

The GRU model is trained using the training data. The function evaluates the trained model on the testing data and calculates metrics such as root mean squared error (RMSE) and mean absolute percentage error (MAPE) for the predictions. These metrics are accumulated over 10 runs, and the average values are calculated. The function also stores the loss values during training to visualize the loss graph.

### Output

The function returns the following outputs:

- `df1`: A DataFrame containing the 'Close' column and the corresponding predictions for the training data.
- `df2`: A DataFrame containing the 'Close' column and the corresponding predictions for the testing data.
- `model_loss`: The loss graph of the first model run.
- `mean_norm_rmse`: The mean normalized RMSE calculated over multiple runs.
- `mean_rmse`: The mean RMSE calculated over multiple runs.
- `mean_mape`: The mean MAPE calculated over multiple runs.

These outputs provide useful information for analysis and further processing, including the predicted values, loss graph, and mean values of evaluation metrics.