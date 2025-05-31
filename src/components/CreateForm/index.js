'use client'
import {
  Input,
  Radio,
  RadioGroup,
  Card,
  CardBody,
  CardHeader,
  Divider
} from '@heroui/react'
import React from 'react'

const CreateForm = ({ titleForm, listInput, shipmentType }) => {
  const onChangeShipmentType = e => {
    // call api
  }
  const renderForm = item => {
    const {
      key,
      label,
      placeholder = null,
      type,
      orientation,
      labelPlacement,
      maxLength,
      endContent,
      onkeydown,
      defaultItems,
      maxRows = 4,
      minRows = 1,

      optionValue
    } = item

    if (type === 'radioGroup') {
      return (
        <div key={key} className='flex flex-col gap-2 p-3'>
          <label className='text-sm font-medium text-gray-700'>{label}:</label>
          <RadioGroup
            orientation={orientation}
            className='ml-2'
            onChange={onChangeShipmentType}
          >
            {optionValue.map(option => (
              <Radio key={option.key} value={option.value} className='text-sm'>
                {option.label}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      )
    } else if (type === 'input') {
      return (
        <div key={key} className='p-2'>
          <Input
            label={label}
            labelPlacement={labelPlacement}
            placeholder={placeholder}
            type='text'
            size='sm'
            variant='bordered'
            classNames={{
              label: 'text-sm font-medium',
              input: 'text-sm'
            }}
          />
        </div>
      )
    }
  }

  const sectionLabels = {
    basic: 'ข้อมูลพื้นฐาน / Basic Information',
    document: 'เอกสาร / Documents',
    terminal: 'ท่าเรือและสถานที่ / Terminal & Location',
    customer: 'ข้อมูลลูกค้า / Customer Information',
    timing: 'เวลาและวันที่ / Timing & Dates',
    financial: 'ข้อมูลการเงิน / Financial Information',
    operation: 'การดำเนินงาน / Operations',
    container: 'ข้อมูลตู้คอนเทนเนอร์ / Container Information'
  }

  const grouped = listInput.reduce((acc, item) => {
    const section = item.section || 'other'
    if (!acc[section]) acc[section] = []
    acc[section].push(item)
    return acc
  }, {})

  return (
    <div className='max-w-7xl mx-auto p-4'>
      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold text-primary bg-background p-4 rounded-lg border-2 border-primary'>
          {titleForm}
        </h2>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {Object.entries(grouped).map(([section, items]) => (
          <Card className='shadow-md' key={section}>
            <CardHeader className='bg-gray-50'>
              <h3 className='text-lg font-semibold text-gray-800'>
                {sectionLabels[section] || section}
              </h3>
            </CardHeader>
            <CardBody className='p-4'>
              {items.map(item => renderForm(item))}
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className='flex justify-center gap-4 mt-8 p-4'>
        <button className='px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'>
          บันทึกข้อมูล / Save
        </button>
        <button className='px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium'>
          ยกเลิก / Cancel
        </button>
        <button className='px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium'>
          พิมพ์ / Print
        </button>
      </div>
    </div>
  )
}

export default CreateForm
