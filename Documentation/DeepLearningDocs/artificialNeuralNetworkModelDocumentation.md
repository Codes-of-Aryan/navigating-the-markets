## Artificial Neural Network Model Documentation

This code defines a function named `artificial_neural_network_model` that implements an artificial neural network (ANN) model for stock price prediction. The function takes several input parameters: `stk_data`, `window_size`, `train_rate`, `drop_rate`, `batch_size`, and `epochs`.

### Input Parameters

- `stk_data`: The stock data used for training and testing the model.
- `window_size`: The size of the input window used to create input sequences and corresponding target values.
- `train_rate`: The training rate that determines the split between training and testing data.
- `drop_rate`: The dropout rate used for regularization in the ANN model.
- `batch_size`: The batch size used during training.
- `epochs`: The number of epochs used for training the model.

### Preprocessing

The function starts by preprocessing the stock data. It filters the 'Close' column from the stock data and applies the MinMaxScaler to normalize the data. This step ensures that the data is within a specific range (0 to 1) and helps improve the performance of the model.

### Data Split

The normalized data is split into training and testing sets based on the specified training rate. The function uses the `data_split` function to create input sequences and corresponding target values. The input sequences are created by taking a sliding window of size `window_size` over the data, and the target values are set to the last value of each window. The training and testing data are split based on the training rate.

### Model Architecture

The ANN model consists of three dense layers with dropout layers for regularization. The input layer has the same size as the window size, and the output layer has a single unit. The model uses the ReLU activation function in the first two dense layers. The mean squared error (MSE) loss function is used to measure the difference between the predicted and actual values.

### Training and Evaluation

The ANN model is compiled with the Adam optimizer and trained using the training data. The function evaluates the trained model on the testing data and calculates metrics such as root mean squared error (RMSE) and mean absolute percentage error (MAPE) for the predictions. These metrics are accumulated over 10 runs, and the average values are calculated. The function also stores the loss values during training to visualize the loss graph.

### Output

The function returns the following outputs:

- `df1`: A DataFrame containing the 'Close' column and the corresponding predictions for the training data.
- `df2`: A DataFrame containing the 'Close' column and the corresponding predictions for the testing data.
- `model_loss`: The loss graph of the first model run.
- `mean_norm_rmse`: The mean normalized RMSE calculated over multiple runs.
- `mean_rmse`: The mean RMSE calculated over multiple runs.
- `mean_mape`: The mean MAPE calculated over multiple runs.

These outputs provide useful information for analysis and further processing, including the predicted values, loss graph, and mean values of evaluation metrics.