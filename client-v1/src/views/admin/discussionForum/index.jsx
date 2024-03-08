import {
  Box,
  Flex,
  Grid,
  Stack,
  Text,
  Button,
  InputLeftAddon,
  InputGroup,
  Input,
  List,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Collapsible from "components/collapsible/Collapisble";

export default function WidgetPage() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState(null);
  const [isData, setData] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const status = localStorage.getItem("Status");
    if (status !== null) {
      const parsedStatus = JSON.parse(status);
      if (parsedStatus === "logged In") {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } else {
      setLoggedIn(false);
    }
    if (isLoggedIn) {
      axios
        .get("http://127.0.0.1:5000/all-topics")
        .then(function (response) {
          console.log(response);
          console.log(response.data);
          setTopics(response.data);
          setData(true);
        })
        .catch(function (error) {
          console.log(error, "error");
          if (error.response.status === 401) {
            alert("Some Error Occurred, please retry later");
          }
        });
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    axios.get("http://127.0.0.1:5000/logout").then(function (response) {
      console.log(response);
      console.log(response.data);
      localStorage.setItem("Status", JSON.stringify("logged Out"));
      localStorage.setItem("UserId", JSON.stringify(""));
      localStorage.setItem("Username", JSON.stringify(""));
      setLoggedIn(false);
      history.push("/admin/signUp-login");
    });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTopicSubmit = async () => {
    const userId = localStorage.getItem("UserId");
    const userName = localStorage.getItem("Username");

    // Validation Checks
    if (!title || !description || !userId || !userName) {
      alert("Please enter a title and description.");
      return;
    }

    axios
      .post("http://127.0.0.1:5000/all-topics", {
        title: title,
        description: description,
        userId: userId,
        userName: userName,
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data);
        setTopics(response.data);
        setData(true);
        setTitle("");
        setDescription("");
        // history.push("/admin/forum");
      })
      .catch(function (error) {
        console.log(error, "error");
        if (error.response.status === 401) {
          alert("Some Error Occurred, please retry later");
        }
      });
  };

  return (
    <Box style={{ marginTop: 100 }}>
      <Flex
        flexDirection="column"
        // gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
      >
        <Flex direction="column" align="center">
          <Flex
            mt="65px"
            mb="40px"
            justifyContent="center"
            style={{ width: 500 }}
          >
            <Stack
              direction="row"
              spacing={4}
              style={{ justifyContent: "space-between" }}
            >
              {isLoggedIn ? (
                <Text style={{ marginRight: 10 }}>
                  {" "}
                  Add A Topic For Discussion
                </Text>
              ) : (
                ""
              )}
              <Button
                colorScheme="twitter"
                variant="outline"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Stack>
          </Flex>
          <Stack align="center">
            {isLoggedIn ? (
              // <Text> Already Logged In </Text>
              <>
                <Box
                  w="100%"
                  h="200px"
                  // bgGradient="linear(to-l, #ededed, #c9e9f6)"
                  style={{
                    borderBottomLeftRadius: 10,
                    marginBottom: 50,
                    display: "flex",
                    alignContent: "center",
                  }}
                >
                  <Stack direction="column">
                    <InputGroup
                      size="sm"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: 20,
                      }}
                    >
                      <InputLeftAddon marginRight="10" color="white" bg="black">
                        Title
                      </InputLeftAddon>
                      <Input
                        type="text"
                        bg="#fff"
                        placeholder="Please Add a Title"
                        defaultValue={title}
                        onChange={handleTitleChange}
                        variant="outlined"
                        size="sm"
                        width="60"
                        marginRight="10"
                      />
                    </InputGroup>

                    <InputGroup
                      size="sm"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: 20,
                      }}
                    >
                      <InputLeftAddon marginRight="10" color="white" bg="black">
                        Description
                      </InputLeftAddon>
                      <Input
                        type="text"
                        placeholder="Please explain what you want to discuss"
                        defaultValue={description}
                        onChange={handleDescriptionChange}
                        variant="filled"
                        size="sm"
                        width="60"
                        marginRight="10"
                      />
                    </InputGroup>
                  </Stack>
                  <Button
                    // leftIcon={<RepeatIcon />}
                    colorScheme="yellow"
                    variant="outline"
                    onClick={handleTopicSubmit}
                  >
                    Submit
                  </Button>
                </Box>
                <Box>
                  <Text> Get Help! </Text>
                  {isData ? (
                    <List spacing={3}>
                      {topics.map((topic) => (
                        <Collapsible
                          key={topic.id}
                          title={topic.title}
                          author={topic.username}
                          id={topic.id}
                        >
                          <Text>{topic.description}</Text>
                        </Collapsible>
                      ))}
                    </List>
                  ) : (
                    <Text> Please add a topic to start a discussion!</Text>
                  )}
                </Box>
              </>
            ) : (
              <>
                <Text> Please Login First</Text>
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
