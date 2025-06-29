import { min } from 'lodash'
import React from 'react'
import { MdEmail, MdPhone } from 'react-icons/md'

const InputItemsCustomer = () => [
  {
    key: 'name',
    label: 'ชื่อลูกค้า',
    labelPlacement: 'outside',
    placeholder: 'Customer name',
    typeInput: 'textarea',
    maxLength: '250',
    maxRows: '2'
  },
  {
    key: 'contact_name',
    label: 'ผู้ติดต่อ',
    labelPlacement: 'outside',
    placeholder: 'Contact name',
    typeInput: 'textarea',
    maxLength: '250',
    maxRows: '2'
  },
  {
    key: 'phone',
    label: 'เบอร์โทร',
    labelPlacement: 'outside',
    typeInput: 'number',
    placeholder: 'Phone number',
    endContent: (
      <div className='pointer-events-none flex items-center'>
        <span className='text-default-400 text-small'>
          <MdPhone />
        </span>
      </div>
    )
  },
  {
    key: 'email',
    label: 'อีเมล',
    labelPlacement: 'outside',
    placeholder: 'Email address',
    typeInput: 'email',
    endContent: (
      <div className='pointer-events-none flex items-center'>
        <span className='text-default-400 text-small'>
          <MdEmail />
        </span>
      </div>
    )
  },
  {
    key: 'city',
    label: 'อำเภอ/เขต',
    labelPlacement: 'outside',
    placeholder: 'City',
    typeInput: 'text'
  },
  {
    key: 'address',
    label: 'ที่อยู่',
    labelPlacement: 'outside',
    placeholder: 'Address',
    typeInput: 'textarea',
    maxLength: '500',
    maxRows: '2'
  },
  {
    key: 'state',
    label: 'จังหวัด',
    labelPlacement: 'outside',
    placeholder: 'State/Province',
    typeInput: 'text'
  },
  {
    key: 'postal_code',
    label: 'รหัสไปรษณีย์',
    labelPlacement: 'outside',
    placeholder: 'Postal code',
    typeInput: 'number'
  },
  {
    key: 'country',
    label: 'ประเทศ',
    labelPlacement: 'outside',
    placeholder: 'Country',
    typeInput: 'text'
  },
  {
    key: 'tax_id',
    label: 'เลขประจำตัวผู้เสียภาษี',
    labelPlacement: 'outside',
    placeholder: 'Tax ID number',
    typeInput: 'number'
  },
  {
    key: 'customer_type',
    label: 'ประเภทลูกค้า',
    labelPlacement: 'outside',
    placeholder: 'Customer type',
    typeInput: 'autocomplete',
    defaultItems: [
      { label: 'Retail', key: 'retail' },
      { label: 'Wholesale', key: 'wholesale' },
      { label: 'Corporate', key: 'corporate' }
    ]
  }
]

export default InputItemsCustomer
