import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; 
//import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  // State to toggle password visibility
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // Using Toast notification hook from Chakra UI
  const toast = useToast();

  // State to manage email, password, and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Hook to programmatically navigate
  const navigate = useNavigate(); 

  // const { setUser } = ChatState(); // Uncomment and use if ChatState context is used

  // Creating  Function to handle form submission
  const submitHandler = async () => {
    setLoading(true); // Set loading state to true during submission
    if (!email || !password) {
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

    try {
      // Configuration for the API request
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Send login request to the server
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      // Notify user of successful login
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // Save user info in local storage and navigate to chats page
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false); // Reset loading state
      navigate("/chats"); // Use navigate instead of history.push
    } catch (error) {
      // Notify user of login error
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
    <VStack spacing="10px">
      {/* Form control for email address */}
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"} {/* Toggle password visibility */}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Submit button */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading} // Show loading spinner when submitting
      >
        Login
      </Button>

      {/* Button to populate fields with guest credentials */}
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
