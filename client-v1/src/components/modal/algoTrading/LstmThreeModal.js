import CommonModel from "./CommonModal";


export default function LstmTwoModal(props) {

    const api = "http://localhost:5000/lstm_model_three"
    const description = `This code defines a function named gru_one that performs stock price prediction using the GRU (Gated Recurrent Unit)
                     neural network. The function takes stock data, window size, training rate, dropout rate, batch size, GRU units, and
                     number of epochs as input.The function begins by preprocessing the stock data. It filters the 'Close' column, normalizes
                     the values using MinMaxScaler, and splits the data into training and testing sets. The input sequences and corresponding
                     target values are created based on the specified window size. The data is reshaped to fit the GRU model's
                     input requirements.
                     
                     The model consists of a two GRU layers, followed by a dropout layer for regularization, and a dense layer
                     for the model output. The first GRU layer is set to return sequences (return_sequences=True), meaning that
                     it returns the hidden state output for each time step in the input sequence. The second GRU layer does not
                     have return_sequences=True, so it only returns the final hidden state output. This architecture is often used
                     when stacking GRU layers to capture temporal dependencies in the data.`
    return (
        <CommonModel description={description} api={api} fullForm={props.fullForm} />
    )
}