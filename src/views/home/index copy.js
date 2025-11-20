'use client'
import { ArrowDownRight } from '@/components/icon/Arrow/ArrowDownRight'
import { ArrowRight } from '@/components/icon/Arrow/ArrowRight'
import { ArrowUpRight } from '@/components/icon/Arrow/ArrowUpRight'
import { Button, Card, Chip, cn } from '@heroui/react'
import React from 'react'
import { FaHandHoldingUsd, FaUsers, FaWallet } from 'react-icons/fa'
import SummaryUsers from './SummaryUsers'
import SummaryProducts from './SummaryProducts'
import SummarySales from './SummarySales'

const HomeDashboard = () => {
  return (
    <>
      <dl className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <SummaryUsers />
        <SummaryProducts />
        <SummarySales />
      </dl>
      <div className='mt-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        <Card className='flex flex-col items-start justify-between p-4'>
          <div className='flex items-center gap-3'>
            <FaUsers className='text-2xl text-blue-500' />
            <h3 className='text-lg font-semibold'>Total Users</h3>
          </div>
          <p className='text-xl font-bold'>1,234</p>
          <Button variant='light' size='sm' className='mt-2'>
            View Details
            <ArrowRight className='ml-2' />
          </Button>
        </Card>

        <Card className='flex flex-col items-start justify-between p-4'>
          <div className='flex items-center gap-3'>
            <FaWallet className='text-2xl text-green-500' />
            <h3 className='text-lg font-semibold'>Total Revenue</h3>
          </div>
          <p className='text-xl font-bold'>$12,345</p>
          <Button variant='light' size='sm' className='mt-2'>
            View Details
            <ArrowUpRight className='ml-2' />
          </Button>
        </Card>

        <Card className='flex flex-col items-start justify-between p-4'>
          <div className='flex items-center gap-3'>
            <FaHandHoldingUsd className='text-2xl text-yellow-500' />
            <h3 className='text-lg font-semibold'>Pending Payments</h3>
          </div>
          <p className='text-xl font-bold'>$1,234</p>
          <Button variant='light' size='sm' className='mt-2'>
            View Details
            <ArrowDownRight className='ml-2' />
          </Button>
        </Card>
        <Card className='flex flex-col items-start justify-between p-4'>
          <div className='flex items-center gap-3'>
            <FaUsers className='text-2xl text-purple-500' />
            <h3 className='text-lg font-semibold'>New Users</h3>
          </div>
          <p className='text-xl font-bold'>123</p>
          <Button variant='light' size='sm' className='mt-2'>
            View Details
            <ArrowRight className='ml-2' />
          </Button>
        </Card>
      </div>
      <div className='mt-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        <Card className='p-4'>
          <h3 className='text-lg font-semibold'>Recent Activities</h3>
          <ul className='mt-2 space-y-2'>
            <li className='flex items-center justify-between'>
              <span>User John Doe registered</span>
              <Chip variant='solid' color='blue'>
                New User
              </Chip>
            </li>
            <li className='flex items-center justify-between'>
              <span>Product XYZ added</span>
              <Chip variant='solid' color='green'>
                New Product
              </Chip>
            </li>
            <li className='flex items-center justify-between'>
              <span>Sale made by Jane Smith</span>
              <Chip variant='solid' color='yellow'>
                Sale
              </Chip>
            </li>
          </ul>
        </Card>
        <Card className='p-4'>
          <h3 className='text-lg font-semibold'>Notifications</h3>
          <ul className='mt-2 space-y-2'>
            <li className='flex items-center justify-between'>
              <span>New message from support</span>
              <Chip variant='solid' color='purple'>
                Message
              </Chip>
            </li>
            <li className='flex items-center justify-between'>
              <span>System update available</span>
              <Chip variant='solid' color='orange'>
                Update
              </Chip>
            </li>
            <li className='flex items-center justify-between'>
              <span>New comment on your post</span>
              <Chip variant='solid' color='pink'>
                Comment
              </Chip>
            </li>
          </ul>
        </Card>
        <Card className='p-4'>
          <h3 className='text-lg font-semibold'>Quick Actions</h3>
          <div className='mt-2 flex flex-col space-y-2'>
            <Button variant='solid' color='blue' size='sm'>
              Add User
            </Button>
            <Button variant='solid' color='green' size='sm'>
              Add Product
            </Button>
            <Button variant='solid' color='yellow' size='sm'>
              View Sales
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}

export default HomeDashboard
