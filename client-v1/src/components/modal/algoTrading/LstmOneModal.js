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
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { SettingsIcon, ArrowUpIcon, RepeatIcon } from "@chakra-ui/icons";

export default function LstmOneModal(props) {
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

    const [loading, setLoading] = useState(false);

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
        //, headers: {'Content-Type': 'multipart/form-data'}
        fetch("http://localhost:5000/lstm_model_one", { method: "POST", body: fd })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
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
                            style={{ borderBottomLeftRadius: 10 }}
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
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
