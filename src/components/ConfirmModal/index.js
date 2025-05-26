import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@heroui/react'
import React from 'react'

const ConfirmModal = ({
  isOpen,
  onOpenChange,
  contentHeader,
  contentBody,
  contentButtonCancel,
  contentButtonOk,
  onPressButtonCancel,
  onPressButtonOk
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>
          {contentHeader}
        </ModalHeader>
        <ModalBody>{contentBody}</ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' onPress={onPressButtonCancel}>
            {contentButtonCancel}
          </Button>
          <Button color='primary' onPress={onPressButtonOk}>
            {contentButtonOk}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
