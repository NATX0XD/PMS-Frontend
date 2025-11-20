'use client'
import {
  Input,
  Radio,
  RadioGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
  CheckboxGroup,
  Checkbox,
  Autocomplete,
  AutocompleteItem,
  Textarea,
  Button,
  DatePicker
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
      value,
      onkeydown,
      defaultItems,
      maxRows = 4,
      minRows = 1,
      startContent = null,
      endContent = null,
      optionValue
    } = item
    if (type === 'radio') {
      return (
        <Radio key={key} value={value} className='text-sm'>
          {label}
        </Radio>
      )
    } else if (type === 'radioGroup') {
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
        <div key={key} className='p-2 w-full'>
          <Input
            className='w-full'
            label={label}
            labelPlacement={labelPlacement}
            placeholder={placeholder}
            type='text'
            // size='sm'
            // variant='bordered'
            // classNames={{
            //   label: 'text-sm font-medium',
            //   input: 'text-sm'
            // }}
            endContent={endContent}
            startContent={startContent}
          />
        </div>
      )
    } else if (type === 'inputGroup') {
      return (
        <div key={key} className='flex flex-col gap-2 p-3'>
          <label className='text-sm font-medium '>{label}:</label>
          {optionValue.map(option => (
            <div key={option.key} className='p-2'>
              <Input
                label={option.label}
                labelPlacement={option.labelPlacement}
                placeholder={option.placeholder}
                type='text'
                // size='sm'
                // variant='bordered'
                // classNames={option.{
                //   label: 'text-sm font-medium',
                //   input: 'text-sm'
                // }}
                endContent={option.endContent}
                startContent={option.startContent}
              />
            </div>
          ))}
        </div>
      )
    } else if (type === 'autoComplete') {
      return (
        <div key={key} className='p-2 w-full'>
          <Autocomplete
            className='w-full '
            defaultItems={optionValue}
            label={label}
            placeholder={placeholder}
          >
            {item => (
              <AutocompleteItem key={item.key} value={item.value}>
                {item.label}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
      )
    } else if (type === 'checkboxGroupWithInput') {
      return (
        <RadioGroup key={key} label='POD'>
          {optionValue.map(option => (
            <div
              className='flex flex-row justify-between w-full '
              key={option.key}
            >
              <Radio value={option.value}>{option.labelCheckbox}</Radio>
              <div>
                <Input
                  label={option.labelInput}
                  placeholder={option.placeholder}
                  labelPlacement='outside-left'
                />
              </div>
            </div>
          ))}
        </RadioGroup>
      )
    } else if (type === 'Textarea') {
      return (
        <Textarea
          key={key}
          label={label}
          labelPlacement={labelPlacement}
          placeholder={placeholder}
          maxLength={maxLength}
          isClearable
          minRows={minRows}
          maxRows={maxRows}
        />
      )
    } else if (type === 'dataPicker') {
      return (
        <div className='flex'>
          <DatePicker className='max-w-[284px]' label={label} />
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
        <h2 className='text-2xl font-bold text-primary bg-background p-4 rounded-lg'>
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
        <Button className='px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'>
          บันทึกข้อมูล / Save
        </Button>
        <Button className='px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium'>
          ยกเลิก / Cancel
        </Button>
        <Button className='px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium'>
          พิมพ์ / Print
        </Button>
      </div>
    </div>
  )
}

export default CreateForm
