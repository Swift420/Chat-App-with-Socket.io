import React from 'react'
import { Box, Container, Tab, TabList, Text, TabPanel, TabPanels, Tabs, } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
         d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        
      >
        <Text fontSize="25" fontFamily="Work sans" color="Black">Chat App</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant='soft-rounded' >
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
     <Login/>
    </TabPanel>
    <TabPanel>
       <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
       


    </Container>
  )
}

export default HomePage