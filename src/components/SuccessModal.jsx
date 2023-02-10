import React from 'react'
import { Box, HStack,Text, Button, Icon, IconButton, Modal } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

export default function SuccessModal(props) {
  return(
   <Modal isOpen={props.showModal} onClose={props.closeModal}>
    <Modal.Content minW="85%">
          <Box alignSelf="center" mt={3}>
            <Icon as={Ionicons} color="success.600" name="checkmark-circle-outline" size="4xl" />
          </Box>
          <Modal.Body alignItems="center">
            <Text mb={2} >Your transaction completed successfully!</Text>
            <Text fontSize="md"><Text bold>{props.amount}</Text> cUSD sent to <Text bold>{props.identifier}.</Text></Text>
            <Text fontSize="xs" textAlign="center" mt={2}>TxHash: {props.txhash}</Text>
          </Modal.Body>
          <Modal.Footer >
            <Button alignSelf="center" colorScheme="success" minW="50%" mr="22%" onPress={props.closeModal}>
              OK
            </Button> 
          </Modal.Footer>
        </Modal.Content>
   </Modal> 
  )
}