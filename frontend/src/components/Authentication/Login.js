import React, { useState } from 'react'
import { FormControl, Input, VStack, FormLabel, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

const Login = () => {
const toast = useToast();
  const [show, setShow] = useState(false)
   
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [loading, setloading] = useState(false)
    
    const [password, setPassword] = useState()
    const history = useHistory();

   

    const handleClick = () => setShow(!show)
   

    const postDetails = (pics) => {

    }
    const submitHandler = async() => {

        setloading(true);
        if(!email || !password ){
            toast({
                title: "Please Fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable:true,
                position: "bottom"

            });
            setloading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-type': "application/json",
                },
                 baseURL: 'http://localhost:5000',
            }

            const {data} = await axios.post("/api/user/login",{email,password}, config);
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable:true,
                position: "bottom"

            });

            localStorage.setItem("userInfo", JSON.stringify(data));

            setloading(false)
            history.pushState('/chats')
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable:true,
                position: "bottom"

            });
            setloading(false)
        }
    }

  return (
    <VStack spacing='5px' color="black">
        

        <FormControl id="email" isRequired>
        <FormLabel>
            Email
        </FormLabel>
        <Input 
            placeholder="Enter Your Email"
            onChange={(e)=>setEmail(e.target.value)}
        />
        </FormControl>

        <FormControl id="password" isRequired>
        <FormLabel>
            Password
        </FormLabel>
        <InputGroup>
        <Input 
            type={show ? "text":"password"}
            placeholder="Enter Your Password"
            onChange={(e)=>setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide":"Show"}
        </Button>
        </InputRightElement>
        </InputGroup>
        </FormControl>
        

       

        

        <Button colorScheme="blue" width="100%" style={{marginTop:15}} onClick={submitHandler} isloading={loading}>
            Login
        </Button>

    </VStack>
  )
}

export default Login