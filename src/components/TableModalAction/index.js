'use client'
import React, { useRef, useState } from 'react'
import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea
} from '@heroui/react'
import { FaBoxes, FaImage } from 'react-icons/fa'
import { productController } from '@/api/controllers/products'

const TableModalAction = ({
  isModalOpen,
  onModalOpenChange,
  inputItemsModal,
  ModalTitle = 'Title Action',
  actionFunction = null
}) => {
  const { create } = productController()
  const fileInputRef = useRef(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [form, setForm] = useState({})

  const resetForm = () => {
    setImagePreview(null)
    setForm({})
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDragOver = e => {
    e.preventDefault()
    if (!isDragging) setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = e => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) previewImage(file)
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) previewImage(file)
  }

  const previewImage = file => {
    const reader = new FileReader()
    reader.onload = ev => {
      setImagePreview(ev.target.result)
      setForm(prev => ({ ...prev, image: ev.target.result }))
    }
    reader.readAsDataURL(file)
  }

  const onKeyDown = e => {
    if (
      !/[0-9]/.test(e.key) &&
      ![
        'Backspace',
        'Tab',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'Home',
        'End'
      ].includes(e.key)
    ) {
      e.preventDefault()
    }
  }

  const renderInput = item => {
    const {
      key,
      label,
      placeholder,
      typeInput,
      labelPlacement,
      maxLength,
      endContent,
      onkeydown
    } = item

    if (typeInput === 'images') {
      return (
        <div key={key}>
          <div
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`rounded-xl mb-2 h-40 w-full flex flex-col justify-center items-center gap-2 border-2 border-dashed transition-colors duration-150 cursor-pointer ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700'
            }`}
          >
            {imagePreview ? (
              <Image
                alt='Preview'
                src={imagePreview}
                width={220}
                className='rounded-md object-contain max-h-36'
              />
            ) : (
              <>
                <FaImage className='text-3xl text-gray-400 dark:text-white/30' />
                <span className='text-sm text-gray-500 dark:text-white/40'>
                  {label}
                </span>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
      )
    } else if (typeInput === 'textarea') {
      return (
        <Textarea
          key={key}
          value={form[key] ? String(form[key]) : ''}
          onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
          onClear={() => setForm(prev => ({ ...prev, [key]: '' }))}
          label={label}
          labelPlacement={labelPlacement}
          placeholder={placeholder}
          maxLength={maxLength}
          isClearable
          minRows={1}
          maxRows={4}
        />
      )
    } else if (typeInput === 'number') {
      return (
        <Input
          key={key}
          value={form[key] ? String(form[key]) : ''}
          onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
          onClear={() => setForm(prev => ({ ...prev, [key]: '' }))}
          label={label}
          labelPlacement={labelPlacement}
          placeholder={placeholder}
          type='text'
          endContent={endContent}
          onKeyDown={onkeydown ? onKeyDown : undefined}
          isClearable
        />
      )
    }

    return null
  }

  const isFormValid = inputItemsModal().every(item => form[item.key])

  return (
    <Modal
      scrollBehavior={'inside'}
      placement='auto'
      isOpen={isModalOpen}
      onOpenChange={open => {
        onModalOpenChange(open)
        if (!open) resetForm()
      }}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              {ModalTitle}
            </ModalHeader>
            <ModalBody>
              {inputItemsModal().map(item => renderInput(item))}
            </ModalBody>
            <ModalFooter>
              <Button
                color='danger'
                variant='flat'
                onPress={() => {
                  resetForm()
                  onClose()
                }}
              >
                Cancel
              </Button>
              <Button
                isDisabled={!isFormValid}
                color='primary'
                onPress={async () => {
                  console.log('Form Data:', form)
                 if (actionFunction) {
  await actionFunction(form)
}

                  onClose()
                  resetForm()
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default TableModalAction
