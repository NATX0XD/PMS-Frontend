'use client'
import { productController } from '@/api/controllers/products'
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
import React, { useRef, useState } from 'react'
import { FaBoxes, FaImage, FaUpload } from 'react-icons/fa'
const ModalActionProduct = ({
  isModalOpen,
  onModalOpen,
  onModalOpenChange
}) => {
  const { create } = productController()
  const [imagePreview, setImagePreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [form, setForm] = useState({
    title: '',
    category: '',
    stock: 0,
    price: 0,
    image: null //Base64
  })
  const isFormValid =
    form.title.trim() &&
    form.category.trim() &&
    form.stock &&
    form.price &&
    form.image
  const fileInputRef = useRef(null)
  const resetImagePreview = () => {
    setImagePreview(null)
    setForm({
      title: '',
      category: '',
      stock: 0,
      price: 0,
      image: null
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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
      e.key !== 'Backspace' &&
      e.key !== 'Tab' &&
      e.key !== 'Delete' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight' &&
      e.key !== 'Home' &&
      e.key !== 'End'
    ) {
      e.preventDefault()
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={open => {
        onModalOpenChange(open)
        if (!open) resetImagePreview()
      }}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Add New Product
            </ModalHeader>
            <ModalBody>
              <div
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`mb-2 h-40 w-full flex flex-col justify-center items-center gap-2 border-2 border-dashed transition-colors duration-150 cursor-pointer ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700'
                }`}
              >
                {imagePreview ? (
                  <Image
                    alt='Preview Image'
                    src={imagePreview}
                    width={200}
                    className='rounded-md object-contain max-h-36'
                  />
                ) : (
                  <>
                    <FaImage className='text-3xl text-gray-400 dark:text-white/30' />
                    <span className='text-sm text-gray-500 dark:text-white/40'>
                      Click or Drag & Drop to upload
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

              <Textarea
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                isClearable
                label='Title'
                labelPlacement='outside'
                minRows={1}
                placeholder='Your product title'
                maxLength={250}
              />
              <Textarea
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                isClearable
                label='Category'
                labelPlacement='outside'
                minRows={1}
                placeholder='Enter product category'
                maxLength={550}
              />
              <Input
                value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })}
                name='stock'
                endContent={
                  <div className='pointer-events-none flex items-center'>
                    <span className='text-default-400 text-small'>
                      <FaBoxes />
                    </span>
                  </div>
                }
                label='Stock'
                labelPlacement='outside'
                placeholder='0'
                type='number'
                onKeyDown={onKeyDown}
              />
              <Input
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                name='price'
                endContent={
                  <div className='pointer-events-none flex items-center'>
                    <span className='text-default-400 text-small'>$</span>
                  </div>
                }
                label='Price'
                labelPlacement='outside'
                placeholder='0.00'
                type='number'
                errorMessage={'Price must be greater than 0'}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color='danger'
                variant='flat'
                onPress={() => {
                  resetImagePreview()
                  onClose()
                }}
              >
                Cancel
              </Button>
              <Button
                isDisabled={!isFormValid}
                color='primary'
                onPress={async () => {
                  try {
                    console.log(' Data to be sent:', form)
                    await create(form)
                    onClose()
                    resetImagePreview()
                  } catch (error) {
                    console.error('Create error:', error)
                  }
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

export default ModalActionProduct
