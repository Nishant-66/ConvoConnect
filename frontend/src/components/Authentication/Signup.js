import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // State for managing visibility of password
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // Using Chakra UI toast hook for notifications
  const toast = useToast();

  // React hook for navigation
  const navigate = useNavigate();

  // States for managing form input values and loading states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const submitHandler = async () => {
    setLoading(true); // Set loading state for form submission
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false); // Reset loading state
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false); // Reset loading state
      return;
    }
    try {
      // Configuration for the API request
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // Send signup request to the server
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
        },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data)); // Save user info in local storage
      setLoading(false); // Reset loading state
      navigate("/chats"); // Navigate to the chats page
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false); // Reset loading state
    }
  };

  return (
    <VStack spacing="5px">
      {/* Form control for name */}
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      {/* Form control for email */}
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* Form control for password */}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"} {/* Toggle password visibility */}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Form control for confirm password */}
      <FormControl id="password-confirm" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"} {/* Toggle password visibility */}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Sign Up button */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading} // Show loading spinner during submission
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
