import {
    Box,
    Button,
    Flex,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    Heading,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useColorModeValue,
    Stack,
    InputGroup,
    InputLeftAddon,
    Input,
    Text,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Center,
    Spinner,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { SettingsIcon, ArrowUpIcon, RepeatIcon } from "@chakra-ui/icons";
import StockChart from "./common/StockChart";
import LossGraph from "./common/LossGraph";
import WaitingBox from "./common/WaitingBox";
import WaitingBox2 from "./common/WaitingBox2";
import InitialGraph from "./common/StartingGraph"

export default function AutoEncoderModal(props) {
    const { fullForm } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState("md");
    const textColor = useColorModeValue("navy.700", "white");

    const [open, setIsOpen] = useState(false);
    const [batchSize, setBatchSize] = useState("8");
    const [epochs, setEpochs] = useState("50");
    const [windowSize, setWindowSize] = useState("3");
    const [trainRate, setTrainRate] = useState("0.8");
    const [dropRate, setDropRate] = useState("0.15");
    const [units, setUnits] = useState("80");

    const [csv, setCsv] = useState(null);

    const [trainDate, setTrainDate] = useState([]);
    const [validDate, setValidDate] = useState([]);
    const [trainOriginalPrice, setTrainOriginalPrice] = useState([])
    const [validOriginalPrice, setValidOriginalPrice] = useState([])
    const [validPredictionPrice, setValidPredictionPrice] = useState([])
    const [trainPredictionPrice, setTrainPredictionPrice] = useState([])
    const [modelLoss, setModelLoss] = useState([])
    const [meanMape, setMeanMape] = useState([])
    const [meanNormRmse, setMeanNormRmse] = useState([])
    const [meanRmse, setMeanRmse] = useState([])


    const [loading, setLoading] = useState(true);
    const [isTraining, setIsTraining] = useState(false);

    const hiddenFileInput = useRef(null);

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleFileUpload = (event) => {
        setCsv(event.target.files[0]);
    };

    const handleSizeClick = (newSize) => {
        setSize(newSize);
        onOpen();
    };

    const openForm = () => {
        setIsOpen(!open);
        console.log(open);
    };

    const handleBatchSizeChange = (event) => {
        setBatchSize(event.target.value);
    };
    const handleTrainRateChange = (event) => {
        setTrainRate(event.target.value);
    };
    const handleWindowSizeChange = (event) => {
        setWindowSize(event.target.value);
    };

    const handleDropRateChange = (event) => {
        setDropRate(event.target.value);
    };
    const handleEpochsChange = (event) => {
        setEpochs(event.target.value);
    };
    const handleUnitsChange = (event) => {
        setUnits(event.target.value);
    };

    const handleTrainClick = () => {
        if (
            !dropRate ||
            !trainRate ||
            !epochs ||
            !units ||
            !windowSize ||
            !batchSize
        ) {
            alert("Please enter valid numbers/decimals for all fields.");
            return;
        } else if (!csv) {
            alert("Please upload csv.");
            return;
        }
        // converting the inputs from string to float
        try {
            var convertedWindowSize = parseFloat(windowSize);
            var convertedTrainRate = parseFloat(trainRate);
            var convertedDropRate = parseFloat(dropRate);
            var convertedBatchSize = parseFloat(batchSize);
            var convertedLstmGruUnits = parseFloat(units);
            var convertedEpochs = parseFloat(epochs);
        } catch (error) {
            alert("Please enter valid numbers/decimals for all fields.");
            return;
        }
        setIsTraining(true)

        const fd = new FormData();
        fd.append("file", csv);
        fd.append(
            "data",
            JSON.stringify({
                window_size: convertedWindowSize,
                train_rate: convertedTrainRate,
                drop_rate: convertedDropRate,
                batch_size: convertedBatchSize,
                lstm_gru_units: convertedLstmGruUnits,
                epochs: convertedEpochs,
            })
        );

        console.log("Sending Request");
        fetch("http://localhost:5000/autoendcoder_model", { method: "POST", body: fd })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTrainDate(data['date_train']);
                setTrainOriginalPrice(data['train_original_price']);
                setValidDate(data['date_valid']);
                setValidOriginalPrice(data['valid_original_price']);
                setTrainPredictionPrice(data['train_prediction_price']);
                setValidPredictionPrice(data['valid_prediction_price']);
                setMeanMape(data['mean_mape']);
                setMeanNormRmse(data['mean_norm_rmse']);
                setMeanRmse(data['mean_rmse']);
                setModelLoss(data['model_loss']);
                setLoading(false);
                setIsTraining(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Flex
                flexDirection="row"
                gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
            >
                <Button onClick={() => handleSizeClick("full")} key={"full"} m={4}>
                    visualize
                </Button>
            </Flex>

            <Modal onClose={onClose} size={size} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <br />
                        <Heading
                            color={textColor}
                            fontSize="36px"
                            style={{ marginBottom: 30 }}
                        >
                            {fullForm}
                        </Heading>

                        <Box
                            color="black"
                            p="3"
                            bgGradient="linear(to-l, #ededed, #c9e9f6)"
                            style={{ borderTopLeftRadius: 10 }}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Button colorScheme="teal" variant="outline" onClick={openForm}>
                                {" "}
                                <SettingsIcon boxSize={8} color="black" /> &nbsp; Settings{" "}
                            </Button>
                            <Stack direction="row">
                                <Input
                                    type="file"
                                    display="none"
                                    onChange={handleFileUpload}
                                    ref={hiddenFileInput}
                                // accept=".csv"
                                />
                                {isTraining ? (<Spinner style={{ marginRight: 50 }} />) : ""}
                                <Button
                                    leftIcon={<ArrowUpIcon />}
                                    colorScheme="blue"
                                    variant="outline"
                                    onClick={handleClick}
                                >
                                    Upload CSV
                                </Button>
                                <Button
                                    leftIcon={<RepeatIcon />}
                                    colorScheme="yellow"
                                    variant="outline"
                                    onClick={handleTrainClick}
                                >
                                    Train
                                </Button>
                            </Stack>
                        </Box>
                        <Box
                            w="100%"
                            h="200px"
                            bgGradient="linear(to-l, #ededed, #c9e9f6)"
                            display={open ? "visible" : "none"}
                            style={{ borderBottomLeftRadius: 10, marginBottom: 50 }}
                        >
                            <Stack direction="column">
                                <InputGroup
                                    size="sm"
                                    style={{ display: "flex", flexDirection: "row", margin: 20 }}
                                >
                                    <InputLeftAddon marginRight="10" color="white" bg="black">
                                        Window Size
                                    </InputLeftAddon>
                                    <Input
                                        type="number"
                                        bg="#fff"
                                        placeholder="window size"
                                        defaultValue={windowSize}
                                        onChange={handleWindowSizeChange}
                                        variant="filled"
                                        size="sm"
                                        width="60"
                                        marginRight="10"
                                    />
                                    <InputLeftAddon marginRight="10" color="white" bg="black">
                                        Train Rate
                                    </InputLeftAddon>
                                    <Input
                                        type="number"
                                        bg="#fff"
                                        placeholder="train rate"
                                        defaultValue={trainRate}
                                        onChange={handleTrainRateChange}
                                        variant="filled"
                                        size="sm"
                                        width="60"
                                        marginRight="10"
                                    />
                                    <InputLeftAddon marginRight="10" color="white" bg="black">
                                        Drop Rate
                                    </InputLeftAddon>
                                    <Input
                                        isDisabled={true}
                                        type="number"
                                        bg="#fff"
                                        placeholder="drop rate"
                                        defaultValue={dropRate}
                                        onChange={handleDropRateChange}
                                        variant="filled"
                                        size="sm"
                                        width="60"
                                        marginRight="10"
                                    />
                                </InputGroup>

                                <InputGroup
                                    size="sm"
                                    style={{ display: "flex", flexDirection: "row", margin: 20 }}
                                >
                                    <InputLeftAddon marginRight="10" color="white" bg="black">
                                        Batch Size
                                    </InputLeftAddon>
                                    <Input
                                        type="number"
                                        placeholder="batch size"
                                        defaultValue={batchSize}
                                        onChange={handleBatchSizeChange}
                                        variant="filled"
                                        size="sm"
                                        width="60"
                                        marginRight="10"
                                    />
                                    <InputLeftAddon marginRight="10" color="white" bg="black">
                                        Epochs
                                    </InputLeftAddon>
                                    <Input
                                        isRequired="True"
                                        placeholder="epochs"
                                        defaultValue={epochs}
                                        onChange={handleEpochsChange}
                                        variant="filled"
                                        size="sm"
                                        width="60"
                                        marginRight="10"
                                    />
                                    <InputLeftAddon marginRight="10" color="white" bg="black">
                                        LSTM/GRU Units
                                    </InputLeftAddon>
                                    <Input
                                        isDisabled={true}
                                        type="number"
                                        bg="#fff"
                                        placeholder="units"
                                        defaultValue={units}
                                        onChange={handleUnitsChange}
                                        variant="filled"
                                        size="sm"
                                        width="60"
                                        marginRight="10"
                                    />
                                </InputGroup>
                            </Stack>
                        </Box>
                        <Box w="100%" style={{ marginTop: 70, marginBottom: 100, }}>
                            {loading ? (
                                <InitialGraph />
                            ) : (
                                <StockChart trainOriginalPrice={trainOriginalPrice} trainStockDate={trainDate} validOriginalPrice={validOriginalPrice} validStockDate={validDate} trainPredictionPrice={trainPredictionPrice} validPredictionPrice={validPredictionPrice} />
                            )}
                        </Box>
                        {loading ? (
                            <WaitingBox2 />
                        ) :
                            <Center w="80%" style={{ marginBottom: 100, marginLeft: 150 }}>
                                <StatGroup>
                                    <Stat style={{ marginRight: 100, }}>
                                        <StatLabel>Mean Norm RMSE over 10 iterations</StatLabel>
                                        <StatNumber>{meanNormRmse}</StatNumber>
                                    </Stat>

                                    <Stat style={{ marginRight: 100, }}>
                                        <StatLabel>Mean RMSE over 10 iterations</StatLabel>
                                        <StatNumber>{meanRmse}</StatNumber>
                                    </Stat>

                                    <Stat>
                                        <StatLabel>Mean Mape over 10 iterations</StatLabel>
                                        <StatNumber>{meanMape}</StatNumber>
                                    </Stat>
                                </StatGroup>
                            </Center>
                        }
                        <Flex >
                            <Box w='50%' color="black" style={{ marginRight: 100 }}>
                                <Text color="black">This code defines a function named gru_one that performs stock price prediction using the GRU (Gated Recurrent Unit)
                                    neural network. The function takes stock data, window size, training rate, dropout rate, batch size, GRU units, and
                                    number of epochs as input.The function begins by preprocessing the stock data. It filters the 'Close' column, normalizes
                                    the values using MinMaxScaler, and splits the data into training and testing sets. The input sequences and corresponding
                                    target values are created based on the specified window size. The data is reshaped to fit the GRU model's
                                    input requirements.

                                    The model consists of a two GRU layers, followed by a dropout layer for regularization, and a dense layer
                                    for the model output. The first GRU layer is set to return sequences (return_sequences=True), meaning that
                                    it returns the hidden state output for each time step in the input sequence. The second GRU layer does not
                                    have return_sequences=True, so it only returns the final hidden state output. This architecture is often used
                                    when stacking GRU layers to capture temporal dependencies in the data.</Text>
                            </Box>
                            <Box >
                                {loading ? (
                                    <WaitingBox />
                                ) : (
                                    <LossGraph modelLoss={modelLoss} />
                                )}
                            </Box>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
