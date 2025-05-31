import React from 'react'

const inputItemsExportShipment = [
  // ข้อมูลพื้นฐาน
  {
    key: 'job',
    type: 'input',
    label: 'JOB NO',
    placeholder: 'Enter job number',
    labelPlacement: 'outside-left',
    section: 'basic'
  },
  {
    key: 'shipment-type',
    type: 'radioGroup',
    label: 'Shipment Type',
    orientation: 'horizontal',
    optionValue: [
      { key: 'air', value: 'a', label: 'AIR', description: 'Air shipment' },
      {
        key: 'lcl',
        value: 'lcl',
        label: 'LCL',
        description: 'Less than Container Load'
      },
      {
        key: 'fcl',
        value: 'fcl',
        label: 'FCL',
        description: 'Full Container Load'
      }
    ],
    section: 'basic'
  },
  {
    key: 'service-type',
    type: 'radioGroup',
    label: 'Service Type',
    orientation: 'vertical',
    optionValue: [
      {
        key: 'freight-only',
        value: 'freight-only',
        label: 'Freight ONLY',
        description: 'Freight Only'
      },
      {
        key: 'cc-truck',
        value: 'cc-truck',
        label: 'CC + TRUCK',
        description: 'Custom Clearance + Truck'
      },
      {
        key: 'frt-cc-truck',
        value: 'frt-cc-truck',
        label: 'FRT + CC + TRUCK',
        description: 'Freight + Custom Clearance + Truck'
      },
      {
        key: 'frt-cc',
        value: 'frt-cc',
        label: 'FRT + CC',
        description: 'Freight + Custom Clearance'
      },
      {
        key: 'frt-truck-shipping',
        value: 'frt-truck-shipping',
        label: 'FRT + TRUCK // SHIPPING',
        description: 'Freight + Truck + Shipping'
      }
    ],
    section: 'basic'
  },
  {
    key: 'bl-type',
    type: 'radioGroup',
    label: 'TYPE BL',
    orientation: 'horizontal',
    optionValue: [
      {
        key: 'obl',
        value: 'obl',
        label: 'OBL',
        description: 'Original Bill of Lading'
      },
      {
        key: 'telex-release',
        value: 'telex-release',
        label: 'TELEX RELEASE / SURRENDER / SWB',
        description: 'Telex Release / Surrender / Sea Waybill'
      }
    ],
    section: 'basic'
  },

  // เอกสาร
  {
    key: 'booking-no',
    type: 'input',
    label: 'BOOKING NO.',
    placeholder: 'Booking Number',
    labelPlacement: 'outside-left',
    section: 'document'
  },
  {
    key: 'bl',
    type: 'input',
    label: 'BL',
    placeholder: 'Bill of Lading',
    labelPlacement: 'outside-left',
    section: 'document'
  },
  {
    key: 'hbl',
    type: 'input',
    label: 'HBL',
    placeholder: 'House Bill of Lading',
    labelPlacement: 'outside-left',
    section: 'document'
  },
  {
    key: 'pod',
    type: 'input',
    label: 'POD',
    placeholder: 'Port of Discharge',
    labelPlacement: 'outside-left',
    section: 'document'
  },
  {
    key: 'carrier-agent',
    type: 'input',
    label: 'Carrier or Airline or Agent',
    placeholder: 'Enter carrier/airline/agent',
    labelPlacement: 'outside-left',
    section: 'document'
  },
  {
    key: 'vsl-voy-flt',
    type: 'input',
    label: 'VSL&VOY or FLT',
    placeholder: 'Vessel & Voyage or Flight',
    labelPlacement: 'outside-left',
    section: 'document'
  },

  // ท่าเรือและสถานที่
  {
    key: 'pol-terminal',
    type: 'input',
    label: 'POL BKK TERMINAL',
    placeholder: 'Port of Loading Bangkok Terminal',
    labelPlacement: 'outside-left',
    section: 'terminal'
  },
  {
    key: 'lkb-pp',
    type: 'input',
    label: 'LKB PP',
    placeholder: 'LKB PP',
    labelPlacement: 'outside-left',
    section: 'terminal'
  },
  {
    key: 'lch-cfs',
    type: 'input',
    label: 'LCH CFS',
    placeholder: 'LCH Container Freight Station',
    labelPlacement: 'outside-left',
    section: 'terminal'
  },
  {
    key: 'other',
    type: 'input',
    label: 'OTHER',
    placeholder: 'Other information',
    labelPlacement: 'outside-left',
    section: 'terminal'
  },

  // เวลาและวันที่
  {
    key: 'submit-si-vgm',
    type: 'input',
    label: 'SUBMIT SI VGM',
    placeholder: 'Submit Shipping Instructions & VGM',
    labelPlacement: 'outside-left',
    section: 'timing'
  },
  {
    key: 'draft',
    type: 'input',
    label: 'DRAFT: MBL HBL ETC',
    placeholder: 'Draft documents',
    labelPlacement: 'outside-left',
    section: 'timing'
  },
  {
    key: 'volume',
    type: 'input',
    label: 'VOLUME',
    placeholder: 'Volume details',
    labelPlacement: 'outside-left',
    section: 'timing'
  },
  {
    key: 'local-charge',
    type: 'input',
    label: 'LOCAL CHARGE',
    placeholder: 'Local charges',
    labelPlacement: 'outside-left',
    section: 'timing'
  },
  {
    key: 'withdrawal-date',
    type: 'input',
    label: 'เบิกวันที่',
    placeholder: 'Withdrawal Date',
    labelPlacement: 'outside-left',
    section: 'timing'
  },
  {
    key: 'receive-bl',
    type: 'input',
    label: 'รับ B/L',
    placeholder: 'Receive Bill of Lading',
    labelPlacement: 'outside-left',
    section: 'timing'
  },
  {
    key: 'bkk-lch-date',
    type: 'input',
    label: 'BKK LCH วันที่',
    placeholder: 'BKK LCH Date',
    labelPlacement: 'outside-left',
    section: 'timing'
  },
  {
    key: 'date',
    type: 'input',
    label: 'Date',
    placeholder: 'Date',
    labelPlacement: 'outside-left',
    section: 'timing'
  },
  {
    key: 'cy-cfs-date',
    type: 'input',
    label: 'CY/CFS วันที่',
    placeholder: 'Container Yard/CFS Date',
    labelPlacement: 'outside-left',
    section: 'timing'
  },

  // การเงิน
  {
    key: 'insurance',
    type: 'input',
    label: 'INSURANCE',
    placeholder: 'Insurance details',
    labelPlacement: 'outside-left',
    section: 'financial'
  },
  {
    key: 'inv',
    type: 'input',
    label: 'INV',
    placeholder: 'Invoice',
    labelPlacement: 'outside-left',
    section: 'financial'
  },
  {
    key: 'shipping',
    type: 'input',
    label: 'SHIPPING',
    placeholder: 'Shipping details',
    labelPlacement: 'outside-left',
    section: 'financial'
  },

  // การดำเนินงาน
  {
    key: 'truck-booking-pickup',
    type: 'input',
    label: 'จองรถ PICK UP',
    placeholder: 'Truck Booking for Pickup',
    labelPlacement: 'outside-left',
    section: 'operation'
  },
  {
    key: 'truck-details',
    type: 'input',
    label: 'ทะเบียนรถ / คนขับ / เบอร์โทร',
    placeholder: 'License Plate / Driver / Phone Number',
    labelPlacement: 'outside-left',
    section: 'operation'
  },

  // ข้อมูลลูกค้า
  {
    key: 'shpr',
    type: 'input',
    label: 'SHPR',
    placeholder: 'Shipper',
    labelPlacement: 'outside-left',
    section: 'customer'
  },
  {
    key: 'etd',
    type: 'input',
    label: 'ETD',
    placeholder: 'Estimated Time of Departure',
    labelPlacement: 'outside-left',
    section: 'customer'
  },
  {
    key: 'inv-po',
    type: 'input',
    label: 'INV/PO',
    placeholder: 'Invoice/Purchase Order',
    labelPlacement: 'outside-left',
    section: 'customer'
  }
]

export default inputItemsExportShipment
