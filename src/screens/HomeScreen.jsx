import React from 'react'
import { Box, HStack, Text, VStack, Button, Icon, Spacer, Input, Divider, FormControl, Stack, Avatar, FlatList} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import Emoji from 'react-native-emoji'

import { Footer } from '../components'
import { lookupAddresses } from '../attestation'


export default function HomeScreen() {
  const [isConnected, setIsConnected ] = React.useState(true)
  const [number, setNumber] = React.useState("")
  const [amount, setAmount] = React.useState("0.01")

  const transactions = [
    {
      id: "tx78236",
      to: "+254712****678",
      from: "0xf1234...8786",
      amount: "0.01",
      date: "Mon, 3 Feb 2023",
    },
    {
      id: "tx78237",
      to: "+254712****678",
      from: "0xf1234...8786",
      amount: "0.01",
      date: "Mon, 4 Feb 2023",
    },
    {
      id: "tx78238",
      to: "+254712****678",
      from: "0xf1234...8786",
      amount: "0.01",
      date: "Mon, 5 Feb 2023",
    },
    {
      id: "tx78239",
      to: "+254712****678",
      from: "0xf1234...8786",
      amount: "0.01",
      date: "Mon, 6 Feb 2023",
    }
  ]

  const handleTx = async () => {
    console.log(`\nSend $${amount} to ${number}`)
    const account = await lookupAddresses(number)
    console.log("Accounts:", account)
  }



  return (
    <Box flex={1} safeAreaTop="12" bg="muted.100">
      <HStack justifyContent="space-between" safeAreaX={4} mb={3}>
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
      <Box p={2} m={3}  rounded="xl" borderWidth={1} borderColor="muted.300">
        <Stack m={3} mt={1}>
          <Text>Send some amount to a phone number.</Text>
          <Text>
            If the number is not linked to an account you will be prompted 
            to link an account or create one for it.
          </Text>
        </Stack>
        <Divider />
        <VStack space={3} mb={2}>
          <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label>Phone No</FormControl.Label>
            <Input type="text" placeholder="+254712345678" size="lg" keyboardType="phone-pad"
              value={number} onChangeText={(text)=>setNumber(text)}
            />
            <FormControl.ErrorMessage>
              Should start with a country code.
            </FormControl.ErrorMessage>
          </Stack>
          <Stack mx="4">
            <FormControl.Label>Amount (cUSD)</FormControl.Label>
            <Input type="text" defaultValue="0.01" placeholder="0.00" size="lg" keyboardType="numeric" 
              value={amount} onChangeText={(text)=>setAmount(text)}
            />
            <FormControl.ErrorMessage>
              Atleast 0.01 cUSD
            </FormControl.ErrorMessage>
          </Stack>
          </FormControl>
        <Button mx="4" variant={isConnected ? null : "subtle"} onPress={()=> handleTx()}>
          { isConnected ? "Send" : "Connect wallet"} 
        </Button>
        </VStack>
        
      </Box>
      <VStack safeAreaX={4}>
          <HStack justifyContent="space-between" mx={2} mb={2}>
            <Text>Some Transactions</Text>
            <Text fontWeight="medium" color="coolGray.500">See all</Text>
          </HStack>
          <FlatList 
            data={transactions} 
            renderItem={({item, index}) => (
              <HStack space={3}  borderBottomWidth={index == 3 ? "0": "1"} borderColor="muted.300" py={2}>
                <Avatar bgColor="muted.300" _text={{color:"warmGray.600" }}>Tx</Avatar>
                <VStack>
                  <Text>{item.to}</Text>
                  <Text>from: {item.from}</Text>
                </VStack>
                <Spacer />
                <VStack alignItems="flex-end" >
                  <HStack space={1}>
                    <Text fontWeight="medium">{item.amount}</Text>
                    <Text>cUSD</Text>
                  </HStack>
                  <Text>{item.date}</Text>
                </VStack>
              </HStack>
            )}  
            keyExtractor={item => item.id}
          />
      </VStack>
      <Footer  isConnected={isConnected}/>
    </Box>
  )
}