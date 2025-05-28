'use client'
import React, { useRef, useState } from 'react'
import {
  Autocomplete,
  AutocompleteItem,
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
import { EyeIcon } from '../icon/EyeIcon'
import { EyeSlashIcon } from '../icon/EyeSlashIcon'

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
  const [isVisible, setIsVisible] = useState(false)

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
      onkeydown,
      defaultItems,
      maxRows = 4,
      minRows = 1,
      showPassword = true,
      isProfile = false
    } = item

    if (typeInput === 'images') {
      return (
        <div key={key} className='flex flex-col items-center'>
          <div
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mb-2 flex justify-center items-center cursor-pointer transition-colors duration-150 ${
              isProfile
                ? `h-40 w-40 rounded-full border-2 border-dashed ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700'
                  }`
                : `h-40 rounded-xl border-2 border-dashed flex-col gap-2 w-full ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700'
                  }`
            }`}
          >
            {imagePreview ? (
              <Image
                alt='Preview'
                src={imagePreview}
                width={isProfile ? 160 : 240}
                height={isProfile ? 160 : undefined}
                className={`object-cover ${
                  isProfile ? 'rounded-full' : 'rounded-md max-h-36'
                }`}
              />
            ) : (
              <div className='flex flex-col items-center'>
                <FaImage className='text-3xl text-gray-400 dark:text-white/30' />
                <span className='text-sm py-2 px-2 text-gray-500 text-center dark:text-white/40'>
                  {label}
                </span>
              </div>
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
          minRows={minRows}
          maxRows={maxRows}
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
    } else if (typeInput === 'email') {
      return (
        <Input
          key={key}
          value={form[key] ? String(form[key]) : ''}
          onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
          onClear={() => setForm(prev => ({ ...prev, [key]: '' }))}
          label={label}
          labelPlacement={labelPlacement}
          placeholder={placeholder}
          type='email'
          endContent={endContent}
          isClearable
        />
      )
    } else if (typeInput === 'password') {
      const toggleVisibility = () => setIsVisible(!isVisible)
      return (
        <Input
          key={key}
          value={form[key] ? String(form[key]) : ''}
          onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
          label={label}
          labelPlacement={labelPlacement}
          placeholder={placeholder}
          type={isVisible ? 'text' : 'password'}
          endContent={
            showPassword ? (
              <div
                className='flex items-center cursor-pointer'
                onClick={toggleVisibility}
              >
                <span className='text-default-400 text-small'>
                  {isVisible ? <EyeIcon /> : <EyeSlashIcon />}
                </span>
              </div>
            ) : null
          }
        />
      )
    } else if (typeInput === 'autocomplete') {
      return (
        <Autocomplete
          defaultItems={defaultItems}
          label={label}
          labelPlacement={labelPlacement}
          placeholder={placeholder}
        >
          {item => (
            <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
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
              {(() => {
                const rendered = new Set()
                const inputs = inputItemsModal()
                const rows = []

                for (let i = 0; i < inputs.length; i++) {
                  const item = inputs[i]
                  if (rendered.has(item.key)) continue

                  if (item.groupWith) {
                    const pairItem = inputs.find(x => x.key === item.groupWith)
                    if (pairItem && !rendered.has(pairItem.key)) {
                      rows.push(
                        <div
                          key={item.key + '-' + pairItem.key}
                          className='flex gap-4'
                        >
                          <div className='w-1/2'>{renderInput(item)}</div>
                          <div className='w-1/2'>{renderInput(pairItem)}</div>
                        </div>
                      )
                      rendered.add(item.key)
                      rendered.add(pairItem.key)
                      continue
                    }
                  }

                  rows.push(<div key={item.key}>{renderInput(item)}</div>)
                  rendered.add(item.key)
                }

                return rows
              })()}
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
