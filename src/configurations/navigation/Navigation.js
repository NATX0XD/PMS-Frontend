import { AiFillDashboard, AiFillFileText } from 'react-icons/ai'
import { BiPackage } from 'react-icons/bi'
import {
  FaFileInvoiceDollar,
  FaMapMarkedAlt,
  FaPage4,
  FaUser
} from 'react-icons/fa'
import { IoIosPeople } from 'react-icons/io'
import { IoBarChart, IoDocumentAttach, IoReceiptSharp } from 'react-icons/io5'

const Navigation = [
  {
    title: 'Dashboard',
    url: '/',
    icon: <AiFillDashboard className='text-lg' />
  },

  {
    title: 'สินค้า',
    url: '/products',
    icon: <BiPackage className='text-lg' />
  },
  { title: 'รายงาน', url: '/report', icon: <IoBarChart className='text-lg' /> },
  {
    title: 'จัดการ',
    // url: '/users',
    icon: <FaUser className='text-lg' />,
    children: [
      {
        title: 'บัญชีผู้ใช้',
        url: '/manage/users',
        icon: <FaUser className='text-lg' />
      },
      {
        title: 'จัดการบทบาท',
        url: '/manage/roles',
        icon: <FaUser className='text-lg' />
      }
    ]
  },
  {
    title: 'ลูกค้า',
    url: '/customer',
    icon: <IoIosPeople className='text-2xl' />
  },
  {
    title: 'Tracking',
    url: '/tracking',
    icon: <FaMapMarkedAlt className='text-lg' />
  },
  {
    title: 'ออกเอกสาร',
    url: '/documents',
    icon: <AiFillFileText />,
    children: [
      {
        title: 'ใบเสนอราคา',
        url: '/documents/quotation',
        icon: <AiFillFileText className='text-lg' />
      },
      {
        title: 'ใบแจ้งหนี้',
        url: '/documents/invoice',
        icon: <FaFileInvoiceDollar className='text-lg' />
      },
      {
        title: 'ใบเสร็จรับเงิน',
        url: '/documents/receipt',
        icon: <IoReceiptSharp className='text-lg' />
      }
    ]
  },
  //   { title: "Customer", url: "/customer", icon: <FaUser /> },
  {
    title: 'Logistics',
    icon: <IoDocumentAttach className='text-lg' />,
    children: [
      {
        title: 'JOB Import',
        url: '/logistics/job',
        icon: <AiFillFileText className='text-lg' />
      },
      {
        title: 'JOB Export',
        url: '/logistics/job',
        icon: <AiFillFileText className='text-lg' />
      }
    ]
  }
]

export { Navigation }
