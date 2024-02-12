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
    Link,
    Text,
    ModalBody,
    ModalCloseButton,
    useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";

export default function LstmTwoModal(props) {
    const { fullForm } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState("md");
    const textColor = useColorModeValue("navy.700", "white");

    const handleSizeClick = (newSize) => {
        setSize(newSize);
        onOpen();
    };

    var __html = require("./stock-forecasting-js/Lstm.js");
    var template = { __html: __html };

    return (
        <>
            <Flex
                flexDirection="row"
                gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
            >
                <Button
                    onClick={() => handleSizeClick("full")}
                    key={"full"}
                    m={4}
                >
                    visualize
                </Button>
            </Flex>

            <Modal onClose={onClose} size={size} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <br />
                        <Heading color={textColor} fontSize="36px">
                            {fullForm}
                        </Heading>
                        <span dangerouslySetInnerHTML={template} />

                        <Box pt={{ base: "600px", md: "100px", xl: "100px" }}>
                            <Card py="15px">
                                <Flex
                                    my="auto"
                                    h="100%"
                                    align={{ base: "center", xl: "start" }}
                                    justify={{ base: "center", xl: "center" }}
                                >
                                    {/* from here */}
                                    <Box py="15px">
                                        <Flex
                                            my="auto"
                                            h="100%"
                                            align={{
                                                base: "center",
                                                xl: "start",
                                            }}
                                            justify={{
                                                base: "center",
                                                xl: "center",
                                            }}
                                        ></Flex>
                                    </Box>
                                    {/* to here */}
                                </Flex>
                            </Card>
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
