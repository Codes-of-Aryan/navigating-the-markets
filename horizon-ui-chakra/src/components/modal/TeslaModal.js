import {
    Box,
    Button,
    Flex,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    Stack,
    Heading,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import TeslaWidget from "components/widgets/TeslaWidget";
import TeslaNews from "components/news/TeslaNews";

export default function TeslaModal(props) {
    const { incorporatedName } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState("md");
    const textColor = useColorModeValue("navy.700", "white");

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
                    <ModalCloseButton />
                    <ModalBody>
                        <br />
                        <Heading color={textColor} fontSize="36px">
                            {incorporatedName}
                        </Heading>
                        <Box pt={{ base: "600px", md: "100px", xl: "100px" }}>
                            <Card py="15px">
                                <Flex
                                    my="auto"
                                    h="100%"
                                    align={{ base: "center", xl: "start" }}
                                    justify={{ base: "center", xl: "center" }}
                                >
                                    <Stack spacing={6} direction="row">
                                        <TeslaWidget></TeslaWidget>
                                        <TeslaNews></TeslaNews>
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