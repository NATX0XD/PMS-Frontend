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
  onPressButtonOk,
  iconConfirm = false,
  colorButtonCancel = false,
  colorButtonOk = 'danger',
  modalSize = 'sm'
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='center'
      size={modalSize}
    >
      <ModalContent className='py-2'>
        <ModalHeader className='flex flex-col gap-4 items-center pb-0'>
          {iconConfirm ? (
            <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center'>
              {iconConfirm}
            </div>
          ) : null}
          <h3 className='text-lg font-semibold text-gray-800  dark:text-gray-100 text-center'>
            {contentHeader}
          </h3>
        </ModalHeader>
        <ModalBody className='px-6 py-2'>
          <p className='text-sm text-gray-600 text-center dark:text-gray-300 leading-relaxed'>
            {contentBody}
          </p>
        </ModalBody>
        <ModalFooter className='px-6 pt-4 pb-2 gap-3'>
          <Button
            color={colorButtonCancel ? colorButtonCancel : false}
            variant='bordered'
            className={`flex-1 ${
              colorButtonCancel === false
                ? 'border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                : ''
            }`}
            onPress={onPressButtonCancel}
          >
            {contentButtonCancel}
          </Button>
          <Button
            color={colorButtonOk}
            className='flex-1 '
            onPress={onPressButtonOk}
          >
            {contentButtonOk}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
