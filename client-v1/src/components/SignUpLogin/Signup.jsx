import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Card from "components/card/Card.js";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const history = useHistory();

  const registerUser = () => {
    axios
      .post("http://127.0.0.1:5000/signup", {
        email: email,
        password: password,
        username: username,
      })
      .then(function (response) {
        console.log(response);
        localStorage.setItem("Status", JSON.stringify("logged In"));
        localStorage.setItem("UserId", JSON.stringify(response.data.id));
        localStorage.setItem(
          "Username",
          JSON.stringify(response.data.username)
        );
        setPassword("");
        setUsername("");
        setEmail("");
        history.push("/admin/forum");
      })
      .catch(function (error) {
        console.log(error, "error");
        if (error.response.status === 401) {
          alert("Invalid credentials");
        }
      });
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size="xl">Create an Account!</Heading>
            {/* <Text color="fg.muted">
              Have an account? <Link href="#">Log In</Link>
            </Text> */}
          </Stack>
        </Stack>
        <Card>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="username">UserName</FormLabel>
                  <Input
                    id="username"
                    type="text"
                    defaultValue={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </Stack>
              <Stack spacing="6">
                <Button
                  colorScheme="twitter"
                  variant="outline"
                  onClick={() => registerUser()}
                >
                  Sign Up
                </Button>
                <HStack>
                  <Divider />
                  <Divider />
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Card>
      </Stack>
    </Container>

    // <div>
    //   <div className="container h-100">
    //     <div className="container-fluid h-custom">
    //       <div className="row d-flex justify-content-center align-items-center h-100">
    //         <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
    //           <form>
    //             <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
    //               <p className="lead fw-normal mb-0 me-3">
    //                 Create Your Account
    //               </p>
    //             </div>

    //             <div className="form-outline mb-4">
    //               <input
    //                 type="email"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 id="form3Example3"
    //                 className="form-control form-control-lg"
    //                 placeholder="Enter a valid email address"
    //               />
    //               <label className="form-label" for="form3Example3">
    //                 Email address
    //               </label>
    //             </div>

    //             <div className="form-outline mb-3">
    //               <input
    //                 type="password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 id="form3Example4"
    //                 className="form-control form-control-lg"
    //                 placeholder="Enter password"
    //               />
    //               <label className="form-label" for="form3Example4">
    //                 Password
    //               </label>
    //             </div>

    //             <div className="d-flex justify-content-between align-items-center">
    //               <div className="form-check mb-0">
    //                 <input
    //                   className="form-check-input me-2"
    //                   type="checkbox"
    //                   value=""
    //                   id="form2Example3"
    //                 />
    //                 <label className="form-check-label" for="form2Example3">
    //                   Remember me
    //                 </label>
    //               </div>
    //               <a href="#!" className="text-body">
    //                 Forgot password?
    //               </a>
    //             </div>

    //             <div className="text-center text-lg-start mt-4 pt-2">
    //               <button
    //                 type="button"
    //                 className="btn btn-primary btn-lg"
    //                 onClick={() => registerUser()}
    //               >
    //                 Sign Up
    //               </button>
    //               <p className="small fw-bold mt-2 pt-1 mb-0">
    //                 Login to your account{" "}
    //                 <a href="/login" className="link-danger">
    //                   Login
    //                 </a>
    //               </p>
    //             </div>
    //           </form>
    //         </div>
    //         <div className="col-md-9 col-lg-6 col-xl-5">
    //           <img src={imgs[0]} className="img-fluid" />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Signup;
