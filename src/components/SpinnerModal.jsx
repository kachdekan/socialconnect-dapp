import React from 'react'
import {Modal, Spinner } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

export default function SpinnerModal(props) {
  return(
   <Modal isOpen={props.showSpinner} onClose={props.closeSpinner}>
    <Spinner size="lg" color="primary.200"/>
   </Modal> 
  )
}