import {
    Box,
    Flex,
    Grid,
    Text,
    useColorModeValue,
    SimpleGrid,
} from "@chakra-ui/react";

import Lstm from "assets/img/algoTrading/lstm.png";

import LstmCard from "components/card/algoTrading/Lstm";

export default function WidgetPage() {
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (
        <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
            {/* Main Fields */}
            <Grid
                mb="20px"
                gridTemplateColumns={{
                    xl: "repeat(2, 1fr)",
                    "2xl": "1fr 0.46fr",
                }}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}
            >
                <Flex
                    flexDirection="column"
                    gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
                >
                    <Flex direction="column">
                        <Flex
                            mt="45px"
                            mb="20px"
                            justifyContent="space-between"
                            direction={{ base: "column", md: "row" }}
                            align={{ base: "start", md: "center" }}
                        >
                            <Text
                                color={textColor}
                                fontSize="2xl"
                                ms="24px"
                                fontWeight="700"
                            >
                                Explore
                            </Text>
                        </Flex>
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                            <LstmCard
                                modelName="LSTM"
                                fullModelName="Long Short-Term Memory"
                                image={Lstm}
                            />
                        </SimpleGrid>
                    </Flex>
                </Flex>
                <Flex
                    flexDirection="column"
                    gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
                ></Flex>
            </Grid>
        </Box>
    );
}
