import React, { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import {
    Button,
    Icon,
    Stack,
    Text,
    Textarea,
    Box,
    List,
} from "@chakra-ui/react";
import axios from "axios";

const Collapsible = ({ children, title, author, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [comments, setComments] = useState(null);
    const [isData, setData] = useState(false);
    const [userComment, setUserComment] = useState("");

    let handleInputCommentChange = (e) => {
        let inputValue = e.target.value
        setUserComment(inputValue)
    }

    useEffect(() => {
        if (id) {
            const commentapi = "http://127.0.0.1:5000/topic/" + id
            axios
                .get(commentapi)
                .then(function (response) {
                    console.log(response);
                    console.log(response.data);
                    if (response.data != null) {
                        setComments(response.data);
                        setData(true);
                    }
                })
                .catch(function (error) {
                    console.log(error, "error");
                    if (error.response.status === 401) {
                        alert("Some Error Occurred, please retry later");
                    }
                });
        }
    }, [isOpen])

    const handleFilterOpening = () => {
        setIsOpen((prev) => !prev);
    };

    const postComment = () => {
        const userId = localStorage.getItem("UserId");
        const userName = localStorage.getItem("Username");
        const commentapi = "http://127.0.0.1:5000/topic/" + id

        // Validation Checks
        if (!userComment || !userId || !userName) {
            alert("Please enter a title and description.");
            return;
        }

        axios
            .post(commentapi, {
                text: userComment,
                userId: userId,
                userName: userName,
            })
            .then(function (response) {
                console.log(response);
                console.log(response.data);
                setComments(response.data);
                setData(true);
                setUserComment("")
            })
            .catch(function (error) {
                console.log(error, "error");
                if (error.response.status === 401) {
                    alert("Some Error Occurred, please retry later");
                }
            });
    };

    return (
        <>
            <div className="card" style={{ background: "white", width: "700px", borderRadius: 10 }}>
                <div>
                    <div className="p-3 border-bottom d-flex justify-content-between" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <div>
                            <h6 className="font-weight-bold" style={{ margin: 30 }}>{title} by {author}</h6>
                        </div>
                        <div>
                            <Button onClick={handleFilterOpening} style={{ margin: 30 }}>
                                {!isOpen ? (
                                    <Icon as={FaChevronDown} width="20px" height="20px" color="inherit" />
                                ) : (
                                    <Icon as={FaChevronUp} width="20px" height="20px" color="inherit" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-bottom">
                    <div>{isOpen && <div className="p-3">
                        <Text style={{ margin: 50 }} >{children}</Text>
                        {isData ? (<>
                            <List spacing={3}>
                                {comments.map((comment) => (
                                    <Box w='80%' p={4} color='black' style={{ borderBottom: '1px solid black', margin: 50 }}>
                                        <Text> {comment.text} </Text>
                                        <Text> {comment.username}</Text>
                                    </Box>
                                ))}
                            </List>
                        </>
                        ) : (<>                                 <Box w='80%' p={4} color='black' style={{ borderBottom: '1px solid black', margin: 50 }}>
                            <Text> No Comments Yet! </Text>
                        </Box></>)}
                        <Stack direction="row" style={{ margin: 50 }}>
                            <Textarea
                                value={userComment}
                                onChange={handleInputCommentChange}
                                placeholder='Add your comment'
                                size='sm'
                                colorScheme='purple'
                            />
                            <Button style={{ marginTop: '3%' }}
                                onClick={postComment}>
                                Post Comment
                            </Button>
                        </Stack>
                    </div>}</div>
                </div>
            </div >
        </>
    );
};

export default Collapsible