import {
    Box,
    Button,
    Flex,
    Image,
    Text,
    useColorModeValue,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    Stack,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import AppleTradingViewWidget from "components/modals/AppleModal";
import AppleNews from "components/news/AppleNews";

function PopupModalBox() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState("md");

    const handleSizeClick = (newSize) => {
        setSize(newSize);
        onOpen();
    };

    const sizes = ["full"];

    return (
        <>
            {sizes.map((size) => (
                <Button onClick={() => handleSizeClick(size)} key={size} m={4}>
                    learn more
                </Button>
            ))}

            <Modal onClose={onClose} size={size} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    {/* <ModalHeader>Modal Title</ModalHeader> */}
                    <ModalCloseButton />
                    <ModalBody>
                        <Box pt={{ base: "600px", md: "100px", xl: "100px" }}>
                            <Card py="15px">
                                <Flex
                                    my="auto"
                                    h="100%"
                                    align={{ base: "center", xl: "start" }}
                                    justify={{ base: "center", xl: "center" }}
                                >
                                    <Stack spacing={8} direction="row">
                                        <AppleTradingViewWidget></AppleTradingViewWidget>
                                        <AppleNews></AppleNews>
                                    </Stack>
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

export default function AppleCard(props) {
    const { image, incorporatedName, name } = props;
    const textColor = useColorModeValue("navy.700", "white");
    return (
        <Card p="20px">
            <Flex direction={{ base: "column" }} justify="center">
                <Box mb={{ base: "20px", "2xl": "20px" }} position="relative">
                    <Image
                        src={image}
                        w={{ base: "100%", "3xl": "100%" }}
                        h={{ base: "100%", "30xl": "100%" }}
                        borderRadius="20px"
                    />
                </Box>
                <Flex flexDirection="column" justify="space-between" h="100%">
                    <Flex
                        justify="space-between"
                        direction={{
                            base: "row",
                            md: "column",
                            lg: "row",
                            xl: "column",
                            "2xl": "row",
                        }}
                        mb="auto"
                    >
                        <Flex direction="column">
                            <Text
                                color={textColor}
                                fontSize={{
                                    base: "xl",
                                    md: "lg",
                                    lg: "lg",
                                    xl: "lg",
                                    "2xl": "md",
                                    "3xl": "lg",
                                }}
                                mb="5px"
                                fontWeight="bold"
                                me="14px"
                            >
                                {name}
                            </Text>
                            <Text
                                color="secondaryGray.600"
                                fontSize={{
                                    base: "sm",
                                }}
                                fontWeight="400"
                                me="14px"
                            >
                                {incorporatedName}
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex
                        align="start"
                        justify="space-between"
                        direction={{
                            base: "row",
                            md: "column",
                            lg: "row",
                            xl: "column",
                            "2xl": "row",
                        }}
                        mt="25px"
                    >
                        <PopupModalBox />
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}
