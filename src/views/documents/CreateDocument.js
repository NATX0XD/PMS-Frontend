'use client'
import { Button, Input, Textarea } from '@heroui/react'
import React from 'react'
import { FaRegSave } from 'react-icons/fa'
import { IoMdPrint } from 'react-icons/io'

const CreateDocument = ({ title, selectedDocument, setSelectedDocument }) => {
  return (
    <div className='flex flex-col h-full  w-full min-h-0'>
      <div className='flex justify-between items-center mb-4 pt-4'>
        <h1 className='text-2xl font-bold'>
          New {title} - {selectedDocument?.name || 'No Name'}
        </h1>
        <div className='flex space-x-2'>
          <Button
            radius='md'
            variant='ghost'
            size='sm'
            color='warning'
            // startContent={<FaRegSave />}
            onPress={() => setSelectedDocument(null)}
          >
            ย้อนกลับ
          </Button>

          <Button
            radius='md'
            variant='ghost'
            size='sm'
            color='success'
            startContent={<FaRegSave />}
          >
            Save as Draft
          </Button>
          <Button
            radius='md'
            size='sm'
            startContent={<IoMdPrint />}
            style={{ backgroundColor: '#4CAF50', color: 'white' }}
          >
            Print
          </Button>
        </div>
      </div>

      <div className='flex flex-col md:flex-row h-full  min-h-0 gap-4'>
        {/* Left side: Form Input */}
        <div className='w-full md:w-2/3 bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-md overflow-auto'>
          <h2 className='text-lg font-semibold mb-2'>ตัวอย่างเอกสาร</h2>
          <div className='border-none p-4 bg-white dark:bg-zinc-800 shadow-sm rounded-md text-sm space-y-2'>
            <p>
              <strong>ลูกค้า:</strong> บริษัท เอ บี ซี จำกัด
            </p>
            <p>
              <strong>ที่อยู่:</strong> 123 ถนนสุขุมวิท กรุงเทพฯ
            </p>
            <p>
              <strong>เลขที่ใบเสนอราคา:</strong> RC021054PDF
            </p>
            <p>
              <strong>วันที่:</strong> 29 พฤษภาคม 2025
            </p>
            <p>
              <strong>รายละเอียด:</strong> จัดทำเว็บไซต์ระบบจัดการสินค้าและคลัง
            </p>
            <p>
              <strong>ราคารวม:</strong> 25,000.00 บาท
            </p>
          </div>
        </div>

        {/* Right side: Document Preview */}
        <div className='w-full md:w-1/3 bg-gray-50 dark:bg-zinc-900 rounded-xl p-6 shadow-inner overflow-auto'>
          <h2 className='text-xl font-semibold mb-4'>ข้อมูล{title}</h2>
          <form className='space-y-4'>
            <Input label='ชื่อลูกค้า' placeholder='กรอกชื่อลูกค้า' />
            <Input label='ที่อยู่ลูกค้า' placeholder='กรอกที่อยู่ลูกค้า' />
            <Input label={`เลขที่ ${title}`} placeholder='RC021054PDF' />
            <Input type='date' label={`วันที่ออก${title}`} />
            <Textarea label='รายละเอียดงาน' placeholder='อธิบายรายละเอียดงาน' />
            <Input type='number' label='ราคารวม (บาท)' placeholder='0.00' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateDocument
