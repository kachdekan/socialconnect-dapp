import React from 'react'
import { Box, HStack, Text, VStack, Button, Icon, Spacer, IconButton } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import Emoji from 'react-native-emoji'


export default function HomeScreen() {
  return (
    <Box flex={1} safeAreaTop="12" bg="muted.100">
      <HStack justifyContent="space-between" safeAreaX={4}>
        <VStack>
          <HStack>
            <Text fontsize="md" fontWeight="medium" >Hi, </Text>
            <Text fontsize="md" fontWeight="bold">Pleb </Text>
            <Emoji name="wave" style={{fontSize: 14}}/>
          </HStack>
          <Text fontWeight="medium">Welcome Back</Text>
        </VStack>
        <Icon as={Ionicons} name="menu-sharp" size="lg" />
      </HStack>
      <Spacer />
      <Box px={4} py={2} bgColor={true ? "white" : "muted.100"} roundedTop="xl">
        <HStack justifyContent="space-between" >
          <HStack>
          {true ? 
          <Button.Group isAttached size="sm" colorScheme="dark">
            <Button _text={{color: "gray.800"}}>Testnet</Button>
            <Button  leftIcon={<Icon as={Ionicons} name="wallet-outline" size="sm" color="gray.500"/>} variant="outline" _text={{color:"gray.800", fontWeight:"medium"}}>0xeF58d...4531</Button>
          </Button.Group> : 
          <Button size="sm" colorScheme="dark" leftIcon={<Icon as={Ionicons} name="wallet-outline" size="sm" color="gray"/>} _text={{color: "gray.800"}}>
            Connect
          </Button>}
        </HStack>
        <HStack space={2} alignItems="center">
          <IconButton size="sm" variant="solid" colorScheme="dark" _icon={{as: Ionicons, name: true ? "sunny-outline" : "moon-outline", color: "gray"}} />
          <IconButton size="sm" variant="solid" colorScheme="dark" _icon={{as: Ionicons, name: "ellipsis-horizontal", color: "gray"}} />
        </HStack>
        </HStack>
        
      </Box>
    </Box>
  )
}