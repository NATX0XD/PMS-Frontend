'use client'
import React, { useEffect, useState } from 'react'
import QueryWordEditor from '@/components/QueryWordEditor'
import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure
} from '@heroui/react'
import { FaEdit, FaFileAlt, FaFileWord, FaPlus, FaTrash } from 'react-icons/fa'
import dayjs from 'dayjs'
import { IoEllipsisVertical } from 'react-icons/io5'
import ConfirmModal from '../ConfirmModal'

const QueryFilesViews = ({
  title = '',
  dataAll = null,
  setSelectedDocument
}) => {
  const [isWordOpen, setIsWordOpen] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null)
  const {
    isOpen: isConfirmModal,
    onOpen: openConfirmModal,
    onClose: closeConfirmModal
  } = useDisclosure()
  const handleTemplateClick = doc => {
    setSelectedDocument(doc)
    console.log('เปืด:', doc)
  }
  const handleEdit = doc => {
    console.log('แก้ไขเอกสาร:', doc)
    // setSelectedDoc(doc)
    // setIsWordOpen(true)
  }
  const handleDelete = (name, id) => {
    closeConfirmModal()
    console.log('Delete item:', name, id)
  }
  const handleConfirmModal = doc => {
    setSelectedItemToDelete({
      name: doc.name,
      id: doc.id
    })
    openConfirmModal()
  }

  return (
    <>
      <ConfirmModal
        isOpen={isConfirmModal}
        onOpenChange={closeConfirmModal}
        contentHeader={'ยืนยันการลบ '}
        contentBody={
          <>
            <span className='font-bold text-danger-600 dark:text-danger-400  px-1.5 py-0.5 rounded-md'>
              {selectedItemToDelete?.name}
            </span>{' '}
            <span className='block mt-2 text-gray-500 dark:text-gray-400 text-xs'>
              การลบจะเป็นการถาวรและไม่สามารถกู้คืนได้
            </span>
          </>
        }
        contentButtonCancel={'ยกเลิก'}
        contentButtonOk={'ลบ'}
        onPressButtonCancel={closeConfirmModal}
        onPressButtonOk={() =>
          handleDelete(selectedItemToDelete?.name, selectedItemToDelete?.id)
        }
        iconConfirm={<FaTrash className='text-red-500 text-xl' />}
      />

      {!isWordOpen ? (
        <>
          <div className='flex justify-between items-center mb-4 pt-4'>
            <h1 className='text-2xl '>เลือก Template {title}</h1>
            <Button
              radius='lg'
              size='sm'
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                fontSize: '16px'
              }}
              onPress={() => setIsWordOpen(true)}
            >
              <FaPlus />
              เพิ่ม Template
            </Button>
          </div>

          {!dataAll || dataAll.length === 0 ? (
            <p className='text-gray-500'>ไม่พบข้อมูลเอกสาร</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {dataAll.map(doc => (
                <Card
                  key={doc.id}
                  className='cursor-pointer hover:shadow-md transition'
                  isPressable
                  onPress={() => handleTemplateClick(doc)}
                >
                  <div className='flex items-start gap-4 p-4'>
                    <FaFileAlt className='text-3xl text-blue-600 mt-1' />
                    <div className='flex-1 text-start'>
                      <h2 className='text-lg font-semibold'>{doc.name}</h2>
                      <p className='text-sm text-gray-600'>{doc.description}</p>
                      <p className='text-xs text-gray-400 mt-1'>
                        ล่าสุด:{' '}
                        {dayjs(doc.createdAt).format('DD MMM YYYY เวลา HH:mm')}
                      </p>
                    </div>
                    <div
                      className='relative flex justify-end items-center gap-2'
                      onClick={e => e.stopPropagation()}
                    >
                      <Dropdown className='min-w-[40px]'>
                        <DropdownTrigger>
                          <Button isIconOnly size='sm' variant='light'>
                            <IoEllipsisVertical className='text-default-300 text-md' />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          {/* <DropdownItem key='view'>View</DropdownItem> */}
                          <DropdownItem
                            key='edit'
                            onPress={() => handleEdit(doc)}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            key='delete'
                            onPress={() => handleConfirmModal(doc)}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : (
        <QueryWordEditor
          title={title}
          contentDocument={selectedDoc?.content || ''}
          setIsWordOpen={setIsWordOpen}
          isWordOpen={isWordOpen}
        />
      )}
    </>
  )
}

export default QueryFilesViews
