// Chakra Imports
import {
    Avatar,
    Button,
    Flex,
    Icon,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom Components
import { ItemContent } from "components/menu/ItemContent";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
// Assets
import navImage from "assets/img/layout/Navbar.png";
import { MdNotificationsNone, MdInfoOutline } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import routes from "routes.js";
import { ThemeEditor } from "./ThemeEditor";
export default function HeaderLinks(props) {
    const { secondary } = props;
    // Chakra Color Mode
    const navbarIcon = useColorModeValue("gray.400", "white");
    let menuBg = useColorModeValue("white", "navy.800");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorBrand = useColorModeValue("brand.700", "brand.400");
    const ethColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue(
        "#E6ECFA",
        "rgba(135, 140, 189, 0.3)"
    );
    const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
    const ethBox = useColorModeValue("white", "navy.800");
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
    );
    const borderButton = useColorModeValue(
        "secondaryGray.500",
        "whiteAlpha.200"
    );
    return (
        <Flex
            w={{ sm: "100%", md: "auto" }}
            alignItems="center"
            flexDirection="row"
            bg={menuBg}
            flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
            p="10px"
            borderRadius="30px"
            boxShadow={shadow}
        >
            <SidebarResponsive routes={routes} />

            {/* link to fyp website for more information and reports */}
            <Menu>
                <MenuButton p="0px">
                    <Icon
                        mt="6px"
                        as={MdInfoOutline}
                        color={navbarIcon}
                        w="18px"
                        h="18px"
                        me="10px"
                    />
                </MenuButton>
                <MenuList
                    boxShadow={shadow}
                    p="20px"
                    me={{ base: "30px", md: "unset" }}
                    borderRadius="20px"
                    bg={menuBg}
                    border="none"
                    mt="22px"
                    minW={{ base: "unset" }}
                    maxW={{ base: "360px", md: "unset" }}
                >
                    <Image src={navImage} borderRadius="16px" mb="28px" />
                    <Flex flexDirection="column">
                        <Link
                            w="100%"
                            href="https://horizon-ui.com/pro?ref=horizon-chakra-free"
                        >
                            <Button w="100%" h="44px" mb="10px" variant="brand">
                                Buy Horizon UI PRO
                            </Button>
                        </Link>
                        <Link
                            w="100%"
                            href="https://horizon-ui.com/documentation/docs/introduction?ref=horizon-chakra-free"
                        >
                            <Button
                                w="100%"
                                h="44px"
                                mb="10px"
                                border="1px solid"
                                bg="transparent"
                                borderColor={borderButton}
                            >
                                See Documentation
                            </Button>
                        </Link>
                        <Link
                            w="100%"
                            href="https://github.com/horizon-ui/horizon-ui-chakra"
                        >
                            <Button
                                w="100%"
                                h="44px"
                                variant="no-hover"
                                color={textColor}
                                bg="transparent"
                            >
                                Try Horizon Free
                            </Button>
                        </Link>
                    </Flex>
                </MenuList>
            </Menu>

            <ThemeEditor navbarIcon={navbarIcon} />
        </Flex>
    );
}

HeaderLinks.propTypes = {
    variant: PropTypes.string,
    fixed: PropTypes.bool,
    secondary: PropTypes.bool,
    onOpen: PropTypes.func,
};
