import React from 'react'

const inputItemsImportShipment = [
  // ข้อมูลพื้นฐาน
  {
    key: 'job',
    type: 'input',
    label: 'JOB',
    placeholder: 'Enter job number',
    labelPlacement: 'outside',
    startContent: (
      <div className='pointer-events-none flex items-center'>
        <span className='text-default-400 text-small'>NO</span>
      </div>
    ),
    section: 'basic'
  },
  {
    key: 'shipment-type',
    type: 'autoComplete',
    label: 'Shipment Type',
    orientation: 'horizontal',
    optionValue: [
      { key: 'air', value: 'air', label: 'AIR', description: 'Air shipment' },
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
      },
      {
        key: 'truck',
        value: 'truck',
        label: 'Truck',
        description: 'Truck Container Load'
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
        key: 'do-only',
        value: 'do-only',
        label: 'DO ONLY',
        description: 'Delivery Order Only'
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
        key: 'do-truck-shipping',
        value: 'do-truck-shipping',
        label: 'DO + TRUCK // SHIPPING',
        description: 'Delivery Order + Truck + Shipping'
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
    key: 'mbl',
    type: 'input',
    label: 'MBL',
    placeholder: 'Master Bill of Lading',
    labelPlacement: 'outside',
    section: 'document'
  },
  {
    key: 'bl-change',
    type: 'input',
    label: 'BL เปลี่ยน',
    placeholder: 'Bill of Lading Change',
    labelPlacement: 'outside',
    section: 'document'
  },
  {
    key: 'hbl',
    type: 'input',
    label: 'HBL',
    placeholder: 'House Bill of Lading',
    labelPlacement: 'outside',
    section: 'document'
  },
  {
    key: 'con',
    type: 'input',
    label: 'CON',
    placeholder: 'Container NO.',
    labelPlacement: 'outside',
    section: 'document'
  },
  {
    key: 'carrier-agent',
    type: 'input',
    label: 'Carrier or Airline or Agent',
    placeholder: 'Enter carrier/airline/agent   (AIR)',
    labelPlacement: 'outside',
    section: 'document'
  },
  {
    key: 'vsl',
    type: 'input',
    label: 'VSL',
    placeholder: 'Vessel',
    labelPlacement: 'outside',
    section: 'document'
  },
  {
    key: 'voy',
    type: 'input',
    label: 'VOY',
    placeholder: 'Voyage',
    labelPlacement: 'outside',
    section: 'document'
  },

  {
    key: 'pod',
    type: 'checkboxGroupWithInput',
    label: 'POD',
    optionValue: [
      {
        key: 'bkk',
        value: 'bkk',
        labelCheckbox: 'BKK',
        labelInput: 'TERMINAL',
        placeholder: null
      },
      {
        key: 'lkb',
        value: 'lkb',
        labelCheckbox: 'LKB',
        labelInput: 'SHED',
        placeholder: null
      },
      {
        key: 'lch',
        value: 'lch',
        labelCheckbox: 'LCH',
        labelInput: 'เปิดตู้',
        placeholder: null
      },
      {
        key: 'other',
        value: 'other',
        labelCheckbox: 'Other',
        labelInput: null,
        placeholder: null
      }
    ],
    section: 'terminal'
  },

  // ท่าเรือและสถานที่

  {
    key: 'enter-bl',
    type: 'input',
    label: 'ENTER BL',
    placeholder: 'Enter Bill of Lading',
    labelPlacement: 'outside',
    section: 'terminal'
  },

  // เวลาและวันที่
  {
    key: 'free-time',
    type: 'inputGroup',
    label: 'FREE TIME',
    optionValue: [
      {
        key: 'dem',
        startContent: (
          <div className='pointer-events-none flex items-center'>
            <span className='text-default-400 text-small'>DEM</span>
          </div>
        )
      },
      {
        key: 'det',
        startContent: (
          <div className='pointer-events-none flex items-center'>
            <span className='text-default-400 text-small'>DET</span>
          </div>
        )
      },
      {
        key: 'elec',
        startContent: (
          <div className='pointer-events-none flex items-center'>
            <span className='text-default-400 text-small'>ELEC</span>
          </div>
        )
      }
    ],

    placeholder: 'DEM DET ELEC',
    labelPlacement: 'outside',
    section: 'timing'
  },
  {
    key: 'atd',
    type: 'input',
    label: 'ATD',
    placeholder: 'เริ่มนับวันที่ (Actual Time of Departure)',
    labelPlacement: 'outside',
    section: 'timing'
  },
  {
    key: 'do-cost-date',
    type: 'input',
    label: 'ค่าใช้จ่ายแลก DO เบิกวันที่',
    placeholder: 'DO Exchange Cost Date',
    labelPlacement: 'outside',
    section: 'timing'
  },
  {
    key: 'do-exchange',
    type: 'input',
    label: 'รับ DO',
    placeholder: 'DO Exchange',
    labelPlacement: 'outside',
    section: 'timing'
  },
  {
    key: 'do-exchange',
    type: 'input',
    label: 'จ่ายเงิน DO',
    placeholder: 'DO Exchange',
    labelPlacement: 'outside',
    section: 'timing'
  },
  {
    key: 'bkk-lch-date',
    type: 'input',
    label: 'BKK LCH วันที่',
    placeholder: 'BKK LCH Date',
    labelPlacement: 'outside',
    section: 'timing'
  },

  // การเงิน
  {
    key: 'insurance',
    type: 'input',
    label: 'INSURANCE',
    placeholder: 'Insurance details',
    labelPlacement: 'outside',
    section: 'financial'
  },
  {
    key: 'frt-inv',
    type: 'input',
    label: 'FRT INV',
    placeholder: 'Freight Invoice',
    labelPlacement: 'outside',
    section: 'financial'
  },
  {
    key: 'shipping',
    type: 'input',
    label: 'SHIPPING',
    placeholder: 'Shipping details',
    labelPlacement: 'outside',
    section: 'financial'
  },

  // การดำเนินงาน
  {
    key: 'inspection-plan',
    type: 'input',
    label: 'แพลนตรวจปล่อย',
    placeholder: 'Inspection Release Plan',
    labelPlacement: 'outside',
    section: 'operation'
  },
  {
    key: 'truck-booking',
    type: 'input',
    label: 'จองรถ แพลนรับสินค้าที่ท่า',
    placeholder: 'Truck Booking & Cargo Pickup Plan at Port',
    labelPlacement: 'outside',
    section: 'operation'
  },
  {
    key: 'truck-details',
    type: 'input',
    label: 'ทะเบียนรถ / คนขับ / เบอร์โทร',
    placeholder: 'License Plate / Driver / Phone Number',
    labelPlacement: 'outside',
    section: 'operation'
  },

  // ข้อมูลลูกค้า
  {
    key: 'cnee',
    type: 'input',
    label: 'CNEE',
    placeholder: 'Consignee',
    labelPlacement: 'outside',
    section: 'customer'
  },
  {
    key: 'eta',
    type: 'input',
    label: 'ETA',
    placeholder: 'Estimated Time of Arrival',
    labelPlacement: 'outside',
    section: 'customer'
  },
  {
    key: 'inv-po',
    type: 'input',
    label: 'INV/PO',
    placeholder: 'Invoice/Purchase Order',
    labelPlacement: 'outside',
    section: 'customer'
  },
  {
    key: 'delivery-appointment',
    type: 'input',
    label: 'นัดส่งของ / ส่ง DO วันที่',
    placeholder: 'Delivery Appointment / DO Sending Date',
    labelPlacement: 'outside',
    section: 'customer'
  },

  // ข้อมูลตู้คอนเทนเนอร์
  {
    key: 'container-drag',
    type: 'input',
    label: 'ลากตู้',
    placeholder: 'Container Dragging',
    labelPlacement: 'outside',
    section: 'container'
  },
  {
    key: 'con',
    type: 'input',
    label: 'CON',
    placeholder: 'Container Number',
    labelPlacement: 'outside',
    section: 'container'
  }
]

export default inputItemsImportShipment
