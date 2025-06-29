'use client'
import React, { useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Button,
  Tabs,
  Tab,
  Divider,
  Chip,
  Badge,
  Switch,
  Textarea
} from '@heroui/react'
import {
  FaDownload,
  FaRegFileAlt,
  FaSave,
  FaShip,
  FaUpload
} from 'react-icons/fa'
import { IoSettings } from 'react-icons/io5'
import { BiBox, BiEdit, BiPlus, BiSearch } from 'react-icons/bi'

export default function JobForm () {
  const [activeTab, setActiveTab] = useState('general')
  const [formData, setFormData] = useState({
    referenceNo: 'PUIV10000071C',
    invoiceNo: '2025TH0512',
    refDate: '05/06/2025',
    importerCode: 'RUGBY',
    importerName: 'RUGBY SCHOOL THAILAND',
    documentType: '0',
    houseBL: 'FGSH2505000191',
    masterBL: '',
    countryOfOrigin: 'CN',
    portOfLoading: '2801',
    portOfDischarge: '2836',
    netWeight: '770.000',
    grossWeight: '810.000',
    packages: '25'
  })

  const tabs = [
    { key: 'general', label: 'General Info', icon: FaRegFileAlt },
    { key: 'shipping', label: 'Shipping Details', icon: FaShip },
    { key: 'cargo', label: 'Cargo Info', icon: BiBox },
    { key: 'settings', label: 'Settings', icon: IoSettings }
  ]

  const documentTypes = [
    { key: '0', label: 'Import Declaration' },
    { key: '1', label: 'Export Declaration' },
    { key: '2', label: 'Transit Declaration' }
  ]

  const countries = [
    { key: 'CN', label: 'China' },
    { key: 'TH', label: 'Thailand' },
    { key: 'JP', label: 'Japan' },
    { key: 'KR', label: 'South Korea' }
  ]

  const ports = [
    { key: '2801', label: 'Shanghai Port' },
    { key: '2836', label: 'Bangkok Port' },
    { key: '2840', label: 'Laem Chabang Port' }
  ]

  const renderGeneralInfo = () => (
    <div className='space-y-6'>
      {/* Header Info */}
      <Card className='bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'>
        <CardHeader className='pb-3'>
          <div className='flex justify-between items-center'>
            <h3 className='text-lg font-semibold text-blue-900'>
              Declaration Details
            </h3>
            <div className='flex gap-2'>
              <Chip color='success' variant='flat' size='sm'>
                Active
              </Chip>
              <Chip color='primary' variant='flat' size='sm'>
                Invoice: {formData.invoiceNo}
              </Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody className='pt-0'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Input
              label='Reference No.'
              value={formData.referenceNo}
              onChange={e =>
                setFormData({ ...formData, referenceNo: e.target.value })
              }
              variant='bordered'
              size='sm'
            />
            <Input
              label='Reference Date'
              type='date'
              value={formData.refDate}
              onChange={e =>
                setFormData({ ...formData, refDate: e.target.value })
              }
              variant='bordered'
              size='sm'
            />
            <Input
              label='Invoice Date'
              type='date'
              value='2025-06-05'
              variant='bordered'
              size='sm'
            />
          </div>
        </CardBody>
      </Card>

      {/* Importer Information */}
      <Card>
        <CardHeader>
          <h3 className='text-lg font-semibold'>Importer Information</h3>
        </CardHeader>
        <CardBody>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              label='Importer Code'
              value={formData.importerCode}
              onChange={e =>
                setFormData({ ...formData, importerCode: e.target.value })
              }
              variant='bordered'
              endContent={<BiSearch />}
            />
            <Input
              label='Importer Name'
              value={formData.importerName}
              onChange={e =>
                setFormData({ ...formData, importerName: e.target.value })
              }
              variant='bordered'
              isReadOnly
              className='bg-gray-50'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <Select
              label='Document Type'
              selectedKeys={[formData.documentType]}
              onSelectionChange={keys =>
                setFormData({ ...formData, documentType: Array.from(keys)[0] })
              }
              variant='bordered'
            >
              {documentTypes.map(type => (
                <SelectItem key={type.key} value={type.key}>
                  {type.label}
                </SelectItem>
              ))}
            </Select>
            <Input label='Customer Job No.' value='21SJ06' variant='bordered' />
          </div>
        </CardBody>
      </Card>

      {/* Document Control */}
      <Card>
        <CardHeader>
          <h3 className='text-lg font-semibold'>Document Control</h3>
        </CardHeader>
        <CardBody>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              label='House B/L No.'
              value={formData.houseBL}
              onChange={e =>
                setFormData({ ...formData, houseBL: e.target.value })
              }
              variant='bordered'
            />
            <Input
              label='Master B/L No.'
              value={formData.masterBL}
              onChange={e =>
                setFormData({ ...formData, masterBL: e.target.value })
              }
              variant='bordered'
            />
          </div>
          <div className='flex gap-4 mt-4'>
            <Switch size='sm'>
              <span className='text-sm'>Importer Sign</span>
            </Switch>
            <Switch size='sm'>
              <span className='text-sm'>Not Send AEO</span>
            </Switch>
            <Switch size='sm' defaultSelected>
              <span className='text-sm'>CA Broker Authorization</span>
            </Switch>
          </div>
        </CardBody>
      </Card>
    </div>
  )

  const renderShippingDetails = () => (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <h3 className='text-lg font-semibold'>Origin & Destination</h3>
        </CardHeader>
        <CardBody>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Select
              label='Country of Origin'
              selectedKeys={[formData.countryOfOrigin]}
              onSelectionChange={keys =>
                setFormData({
                  ...formData,
                  countryOfOrigin: Array.from(keys)[0]
                })
              }
              variant='bordered'
            >
              {countries.map(country => (
                <SelectItem key={country.key} value={country.key}>
                  {country.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              label='Port of Loading'
              selectedKeys={[formData.portOfLoading]}
              onSelectionChange={keys =>
                setFormData({ ...formData, portOfLoading: Array.from(keys)[0] })
              }
              variant='bordered'
            >
              {ports.map(port => (
                <SelectItem key={port.key} value={port.key}>
                  {port.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <Select
              label='Port of Discharge'
              selectedKeys={[formData.portOfDischarge]}
              onSelectionChange={keys =>
                setFormData({
                  ...formData,
                  portOfDischarge: Array.from(keys)[0]
                })
              }
              variant='bordered'
            >
              {ports.map(port => (
                <SelectItem key={port.key} value={port.key}>
                  {port.label}
                </SelectItem>
              ))}
            </Select>
            <Input label='Export Tax Incentive ID' variant='bordered' />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className='text-lg font-semibold'>Shipping Marks</h3>
        </CardHeader>
        <CardBody>
          <Textarea
            label='Shipping Mark Line 1'
            value='RUGBY SCHOOL'
            variant='bordered'
            minRows={2}
          />
          <Textarea
            label='Shipping Mark Line 2'
            value='THAILAND'
            variant='bordered'
            minRows={2}
            className='mt-4'
          />
          <div className='mt-4'>
            <p className='text-sm text-gray-600 mb-2'>Additional Marks:</p>
            <div className='flex gap-2'>
              <Chip variant='flat' size='sm'>
                Shipmark
              </Chip>
              <Chip variant='flat' size='sm'>
                INV
              </Chip>
              <Chip variant='flat' size='sm'>
                MAWB
              </Chip>
              <Chip variant='flat' size='sm'>
                HAWB
              </Chip>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )

  const renderCargoInfo = () => (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <h3 className='text-lg font-semibold'>
            Weight & Package Information
          </h3>
        </CardHeader>
        <CardBody>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Input
              label='No. of Packages'
              value={formData.packages}
              onChange={e =>
                setFormData({ ...formData, packages: e.target.value })
              }
              variant='bordered'
              endContent={<span className='text-sm text-gray-500'>BG</span>}
            />
            <Input
              label='Net Weight'
              value={formData.netWeight}
              onChange={e =>
                setFormData({ ...formData, netWeight: e.target.value })
              }
              variant='bordered'
              endContent={<span className='text-sm text-gray-500'>KGM</span>}
            />
            <Input
              label='Gross Weight'
              value={formData.grossWeight}
              onChange={e =>
                setFormData({ ...formData, grossWeight: e.target.value })
              }
              variant='bordered'
              endContent={<span className='text-sm text-gray-500'>KGM</span>}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <h3 className='text-lg font-semibold'>Manifest Information</h3>
            <Button color='primary' size='sm' startContent={<BiPlus />}>
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              label='License/Permit No.'
              value='0224041464'
              variant='bordered'
            />
            <Input
              label='Authority'
              value='บริษัท ซี.เจ.เอ็ม. โลจิสติกส์ จำกัด'
              variant='bordered'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <Input label='License Type' value='014' variant='bordered' />
            <Input label='License Code' value='16104' variant='bordered' />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className='text-lg font-semibold'>
            Vendor & Contact Information
          </h3>
        </CardHeader>
        <CardBody>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input label='Vendor' value='C.J.M.' variant='bordered' />
            <Input
              label='Contact Person'
              value='SUTHASINEE'
              variant='bordered'
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )

  const renderSettings = () => (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <h3 className='text-lg font-semibold'>System Settings</h3>
        </CardHeader>
        <CardBody>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <div>
                <p className='font-medium'>Auto Save</p>
                <p className='text-sm text-gray-500'>
                  Automatically save changes every 30 seconds
                </p>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className='flex justify-between items-center'>
              <div>
                <p className='font-medium'>Email Notifications</p>
                <p className='text-sm text-gray-500'>
                  Receive email updates on status changes
                </p>
              </div>
              <Switch defaultSelected />
            </div>
            <Divider />
            <div className='flex justify-between items-center'>
              <div>
                <p className='font-medium'>Data Validation</p>
                <p className='text-sm text-gray-500'>
                  Enable real-time data validation
                </p>
              </div>
              <Switch defaultSelected />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className='text-lg font-semibold'>Export Options</h3>
        </CardHeader>
        <CardBody>
          <div className='flex flex-wrap gap-3'>
            <Button variant='bordered' startContent={<FaDownload />}>
              Export PDF
            </Button>
            <Button variant='bordered' startContent={<FaDownload />}>
              Export Excel
            </Button>
            <Button variant='bordered' startContent={<FaDownload />}>
              Import Template
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralInfo()
      case 'shipping':
        return renderShippingDetails()
      case 'cargo':
        return renderCargoInfo()
      case 'settings':
        return renderSettings()
      default:
        return renderGeneralInfo()
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-6'>
          <div className='flex justify-between items-center mb-4'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>
                Declaration Control
              </h1>
              <p className='text-gray-600'>
                Manage import/export declarations and documentation
              </p>
            </div>
            <div className='flex gap-3'>
              <Button variant='bordered' startContent={<BiEdit />}>
                Edit
              </Button>
              <Button color='primary' startContent={<BiEdit />}>
                Save Changes
              </Button>
            </div>
          </div>

          {/* Status Bar */}
          <Card className='bg-white border-l-4 border-l-blue-500'>
            <CardBody className='py-3'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                  <div>
                    <p className='text-sm text-gray-600'>Invoice No.</p>
                    <p className='font-semibold'>{formData.invoiceNo}</p>
                  </div>
                  <Divider orientation='vertical' className='h-8' />
                  <div>
                    <p className='text-sm text-gray-600'>Reference No.</p>
                    <p className='font-semibold'>{formData.referenceNo}</p>
                  </div>
                  <Divider orientation='vertical' className='h-8' />
                  <div>
                    <p className='text-sm text-gray-600'>Status</p>
                    <Chip color='warning' variant='flat' size='sm'>
                      In Progress
                    </Chip>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-sm text-gray-600'>Last Updated</p>
                  <p className='text-sm font-medium'>05/06/2025 14:30</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <Card className='bg-white shadow-sm'>
          <CardBody className='p-0'>
            <Tabs
              aria-label='Declaration tabs'
              selectedKey={activeTab}
              onSelectionChange={setActiveTab}
              variant='underlined'
              classNames={{
                tabList:
                  'gap-6 w-full relative rounded-none p-0 border-b border-divider',
                cursor: 'w-full bg-blue-500',
                tab: 'max-w-fit px-6 py-4 h-12',
                tabContent:
                  'group-data-[selected=true]:text-blue-600 font-medium'
              }}
            >
              {tabs.map(tab => {
                const IconComponent = tab.icon
                return (
                  <Tab
                    key={tab.key}
                    title={
                      <div className='flex items-center space-x-2'>
                        <IconComponent className='w-4 h-4' />
                        <span>{tab.label}</span>
                      </div>
                    }
                  />
                )
              })}
            </Tabs>

            <div className='p-6'>{renderTabContent()}</div>
          </CardBody>
        </Card>

        {/* Footer Actions */}
        <div className='mt-6 flex justify-end gap-3'>
          <Button variant='bordered'>Cancel</Button>
          <Button variant='bordered' startContent={<FaUpload />}>
            Submit Declaration
          </Button>
          <Button color='primary' startContent={<FaSave />}>
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
