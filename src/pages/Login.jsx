import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = "ahjhghbuhb";
  const navigate = useNavigate();
  const { state, loginUser, logoutUser } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if username and password are correct
    if (username === "admin" && password === "admin123") {
      // Perform successful login action (e.g., redirect to dashboard)
      console.log("Login successful");
      navigate("/");
      loginUser(token);
      // Reset the form fields
      setUsername("");
      setPassword("");
      setErrorMessage("");
      localStorage.setItem("token", "hello");
    } else {
      // Display error message
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h1" mb={6} textAlign="center">
        Login Page
      </Heading>
      <form onSubmit={handleLogin}>
        <Stack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username:</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
          <Button type="submit" colorScheme="blue" width="full">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginPage;
