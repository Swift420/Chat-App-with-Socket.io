import { FormControl, Input, VStack, FormLabel, InputRightElement, Button, InputGroup, } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Signup = () => {
    const [show, setShow] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [password, setPassword] = useState()
    const [pic, setPic] = useState();
    const [loading, setloading] = useState(false)
    const toast = useToast();
    const handleClick = () => setShow(!show)
    const handleClickConfirm = () => setShowConfirm(!showConfirm)
    const history = useHistory();
    

    const postDetails = (pics) => {
        setloading(true);
        if(pics==undefined){
            toast({
                title: "Please Select an Image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return;

        }
        if(pics.type === "image/jpeg" || pics.type === "image/png"){
            const data = new FormData();
            data.append("file",pics)
            data.append("upload_preset", "chat-app")
            data.append("cloud_name", "swift76");
            fetch("https://api.cloudinary.com/v1_1/swift76/image/upload", {
                method: "post",
                body: data
            }).then((res)=> res.json()).then(data => {
                setPic(data.url.toString());
                console.log(data.url.toString())
                setloading(false)
            }).catch((err)=> {
                console.log(err)
                setloading(false)
            })
        } else {
            toast({
                title: "Please Select an Image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
        }
    }
    //https://api.cloudinary.com/v1_1/:cloud_name/:action
    const submitHandler = async() => {
        setloading(true);
        if(!name || !email || !password || !confirmPassword){
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

        if(password !==confirmPassword){
            toast({
                title: "Passwords Fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable:true,
                position: "bottom"

            });
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-type': "application/json",
                },
                 baseURL: 'http://localhost:5000',
            }

            const {data} = await axios.post("/api/user",{name,email,password,pic}, config);
            toast({
                title: "Registration Successful",
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
        <FormControl id="first-name" isRequired>
        <FormLabel>
            Name
        </FormLabel>
        <Input 
            placeholder="Enter Your Name"
            onChange={(e)=>setName(e.target.value)}
        />
        </FormControl>

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
        

       <FormControl id="confirm-password" isRequired>
        <FormLabel>
            Confirm Password
        </FormLabel>
        <InputGroup>
        <Input 
            type={showConfirm ? "text":"password"}
            placeholder="Confirm your password"
            onChange={(e)=>setConfirmPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClickConfirm}>
            {showConfirm ? "Hide":"Show"}
        </Button>
        </InputRightElement>
        </InputGroup>
        </FormControl>

         <FormControl id="pic" >
        <FormLabel>
            Upload your Picture
        </FormLabel>
        <Input 
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e)=>postDetails(e.target.files[0])}
        />
        </FormControl>

        <Button colorScheme="blue" width="100%" style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>
            Sign Up
        </Button>

    </VStack>
  )
}

export default Signup