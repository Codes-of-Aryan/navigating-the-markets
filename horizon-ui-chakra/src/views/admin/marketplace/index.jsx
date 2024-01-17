import React from "react";

// Chakra imports
import {
    Box,
    Button,
    Flex,
    Grid,
    Link,
    Text,
    useColorModeValue,
    SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import AppleTradingViewWidget from "components/overview/apple";
import Card from "components/card/Card.js";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";

export default function Marketplace() {
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorBrand = useColorModeValue("brand.500", "white");
    // const companies = {};
    return (
        <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
            {/* Main Fields */}
            <Grid
                mb="20px"
                gridTemplateColumns={{
                    xl: "repeat(3, 1fr)",
                    "2xl": "1fr 0.46fr",
                }}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}
            >
                <Flex
                    flexDirection="column"
                    gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
                >
                    <Banner />
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
                                Discover
                            </Text>
                        </Flex>
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                            <NFT
                                name="Abstract Colors"
                                author="By Esthera Jackson"
                                bidders={[
                                    Avatar1,
                                    Avatar2,
                                    Avatar3,
                                    Avatar4,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                ]}
                                image={Nft1}
                                currentbid="0.91 ETH"
                                download="#"
                            />
                            <NFT
                                name="ETH AI Brain"
                                author="By Nick Wilson"
                                bidders={[
                                    Avatar1,
                                    Avatar2,
                                    Avatar3,
                                    Avatar4,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                ]}
                                image={Nft2}
                                currentbid="0.91 ETH"
                                download="#"
                            />
                            <NFT
                                name="Mesh Gradients "
                                author="By Will Smith"
                                bidders={[
                                    Avatar1,
                                    Avatar2,
                                    Avatar3,
                                    Avatar4,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                    Avatar1,
                                ]}
                                image={Nft3}
                                currentbid="0.91 ETH"
                                download="#"
                            />
                        </SimpleGrid>
                        <Text
                            mt="45px"
                            mb="36px"
                            color={textColor}
                            fontSize="2xl"
                            ms="24px"
                            fontWeight="700"
                        >
                            Remove this text later
                        </Text>
                    </Flex>
                </Flex>
                <Flex
                    flexDirection="column"
                    gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
                >
                    <Card p="0px">
                        <Flex
                            align={{ sm: "flex-start", lg: "center" }}
                            justify="space-between"
                            w="100%"
                            px="22px"
                            py="18px"
                        >
                            <Text
                                color={textColor}
                                fontSize="xl"
                                fontWeight="600"
                            >
                                Learn More
                                {/* change this to link to investopedia or articles explaning stuff */}
                            </Text>
                            <Button variant="action">See all</Button>
                        </Flex>

                        <HistoryItem
                            name="Colorful Heaven"
                            author="By Mark Benjamin"
                            date="30s ago"
                            image={Nft5}
                            price="0.91 ETH"
                        />
                        <HistoryItem
                            name="Abstract Colors"
                            author="By Esthera Jackson"
                            date="58s ago"
                            image={Nft1}
                            price="0.91 ETH"
                        />
                        <HistoryItem
                            name="ETH AI Brain"
                            author="By Nick Wilson"
                            date="1m ago"
                            image={Nft2}
                            price="0.91 ETH"
                        />
                        <HistoryItem
                            name="Swipe Circles"
                            author="By Peter Will"
                            date="1m ago"
                            image={Nft4}
                            price="0.91 ETH"
                        />
                        <HistoryItem
                            name="Mesh Gradients "
                            author="By Will Smith"
                            date="2m ago"
                            image={Nft3}
                            price="0.91 ETH"
                        />
                        <HistoryItem
                            name="3D Cubes Art"
                            author="By Manny Gates"
                            date="3m ago"
                            image={Nft6}
                            price="0.91 ETH"
                        />
                    </Card>
                </Flex>
            </Grid>
            {/* Delete Product */}
        </Box>
    );
}