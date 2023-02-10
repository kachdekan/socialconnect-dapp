import React from 'react'
import { Box, HStack,Text, Button, Icon, IconButton, Modal } from 'native-base'
import { Ionicons } from '@expo/vector-icons'



export default function VerifySendModal(props) {
  return(
   <Modal isOpen={props.showModal} onClose={props.closeModal}>
    <Modal.Content minW="85%">
          <Modal.CloseButton />
          <Modal.Header fontSize="4xl" fontWeight="bold">
            Confirm
          </Modal.Header>
          <Modal.Body alignItems="center">
            <Text fontSize="md" >You are sending <Text bold>{props.amount}</Text> cUSD</Text>
            <Text fontSize="md">to <Text bold>{props.identifier}</Text> of</Text>
            <Text fontSize="md">Acc: <Text bold>{props.account}</Text></Text>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="unstyled" mr="1" onPress={props.closeModal}>
              Cancel
            </Button> 
            <Button minW="20%" colorScheme="success" onPress={props.handleSend} >
              Send
            </Button>
          </Modal.Footer>
        </Modal.Content>
   </Modal> 
  )
}