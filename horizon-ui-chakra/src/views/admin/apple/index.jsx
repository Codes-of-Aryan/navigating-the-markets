import { Box, Stack } from "@chakra-ui/react";
import {
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Text,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import AppleTradingViewWidget from "../../../components/modals/AppleModal.js";
import AppleNews from "../../../components/news/AppleNews.js";

export default function Settings() {
    return (
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
    );
}
