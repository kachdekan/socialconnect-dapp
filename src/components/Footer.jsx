import React from 'react'
import { Box, HStack, Button, Icon, IconButton } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

export default function Footer() {
  return (
    <Box px={4} py={2} bgColor={true ? "white" : "muted.100"} roundedTop="xl" position="absolute" bottom={0} width="full">
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
  )
}