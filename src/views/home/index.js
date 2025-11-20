'use client'
import React, { useState } from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  Pie
} from 'recharts'
import { IoMdTrendingDown, IoMdTrendingUp } from 'react-icons/io'
import { BiMapPin, BiPackage } from 'react-icons/bi'
import {
  FaClock,
  FaDollarSign,
  FaHashtag,
  FaTruck,
  FaUsers
} from 'react-icons/fa'
import { IoBarChart, IoPieChart } from 'react-icons/io5'
import SummaryUsers from './SummaryUsers'

const HomeDashboard = () => {
  const [salesViewType, setSalesViewType] = useState('chart')
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  // Mock data
  const dayData = [
    { name: 'จันทร์', revenue: 45000, expense: 32000, orders: 120 }
  ]
  const weeklyData = [
    { name: 'จันทร์', revenue: 45000, expense: 32000, orders: 120 },
    { name: 'อังคาร', revenue: 52000, expense: 35000, orders: 135 },
    { name: 'พุธ', revenue: 48000, expense: 33000, orders: 128 },
    { name: 'พฤหัสบดี', revenue: 61000, expense: 38000, orders: 152 },
    { name: 'ศุกร์', revenue: 55000, expense: 36000, orders: 145 },
    { name: 'เสาร์', revenue: 58000, expense: 34000, orders: 148 },
    { name: 'อาทิตย์', revenue: 43000, expense: 30000, orders: 115 }
  ]

  const monthlyData = [
    { name: 'ม.ค.', revenue: 320000, expense: 240000, orders: 850 },
    { name: 'ก.พ.', revenue: 380000, expense: 260000, orders: 920 },
    { name: 'มี.ค.', revenue: 350000, expense: 245000, orders: 880 },
    { name: 'เม.ย.', revenue: 420000, expense: 280000, orders: 1050 }
  ]

  const pieData = [
    { name: 'ขนส่งทางบก', value: 45, color: '#3B82F6' },
    { name: 'ขนส่งทางเรือ', value: 30, color: '#10B981' },
    { name: 'ขนส่งทางอากาศ', value: 20, color: '#F59E0B' },
    { name: 'อื่นๆ', value: 5, color: '#EF4444' }
  ]

  const userData = [{ name: 'ผู้ใช้ใหม่', value: 120, color: '#3B82F6' }]

  const currentData =
    selectedPeriod === 'week' ? weeklyData : 'month' ? monthlyData : dayData
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0)
  const totalExpense = currentData.reduce((sum, item) => sum + item.expense, 0)
  const totalOrders = currentData.reduce((sum, item) => sum + item.orders, 0)
  const profit = totalRevenue - totalExpense
  const profitMargin = ((profit / totalRevenue) * 100).toFixed(1)

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium text-gray-600'>{title}</p>
          <p className='text-2xl font-bold text-gray-900 mt-1'>{value}</p>
          {change && (
            <div
              className={`flex items-center mt-2 text-sm ${
                change > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change > 0 ? (
                <IoMdTrendingUp className='w-4 h-4 mr-1' />
              ) : (
                <IoMdTrendingDown className='w-4 h-4 mr-1' />
              )}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  )

  const renderSalesDisplay = () => {
    if (salesViewType === 'number') {
      return (
        <div className='grid grid-cols-2 gap-4'>
          <div className='text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg'>
            <h3 className='text-lg font-semibold text-blue-900 mb-2'>
              ยอดขายรวม
            </h3>
            <p className='text-3xl font-bold text-blue-600'>
              ฿{totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className='text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg'>
            <h3 className='text-lg font-semibold text-green-900 mb-2'>
              กำไรสุทธิ
            </h3>
            <p className='text-3xl font-bold text-green-600'>
              ฿{profit.toLocaleString()}
            </p>
          </div>
        </div>
      )
    }

    if (salesViewType === 'bar') {
      return (
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={currentData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip formatter={value => `฿${value.toLocaleString()}`} />
            <Bar dataKey='revenue' fill='#3B82F6' name='รายได้' />
            <Bar dataKey='expense' fill='#EF4444' name='รายจ่าย' />
          </BarChart>
        </ResponsiveContainer>
      )
    }

    if (salesViewType === 'pie') {
      return (
        <ResponsiveContainer width='100%' height={300}>
          <RechartsPieChart>
            <Pie
              data={pieData}
              cx='50%'
              cy='50%'
              outerRadius={100}
              dataKey='value'
              label={({ name, value }) => `${name} ${value}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </RechartsPieChart>
        </ResponsiveContainer>
      )
    }

    return (
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={currentData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip formatter={value => `฿${value.toLocaleString()}`} />
          <Area
            type='monotone'
            dataKey='revenue'
            stackId='1'
            stroke='#3B82F6'
            fill='#3B82F6'
            fillOpacity={0.6}
            name='รายได้'
          />
          <Area
            type='monotone'
            dataKey='expense'
            stackId='2'
            stroke='#EF4444'
            fill='#EF4444'
            fillOpacity={0.6}
            name='รายจ่าย'
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  return (
    <div className='max-w-7xl mx-auto'>
      {/* Header */}
      {/* <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Logistics Dashboard
        </h1>
        <p className='text-gray-600'>ภาพรวมข้อมูลการขนส่งและโลจิสติกส์</p>
      </div> */}

      <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 gap-6 mb-8'>
        <SummaryUsers />
        <SummaryUsers />
        <SummaryUsers />
        <SummaryUsers />
      </div>
      {/* <StatCard
            title='บัญชีผู้ใช้'
            value={`฿${totalRevenue.toLocaleString()}`}
            change={8.2}
            icon={FaDollarSign}
            color='green'
          />
          <StatCard
            title='จำนวนคลังสินค้า'
            value={`฿${totalExpense.toLocaleString()}`}
            change={-3.1}
            icon={IoMdTrendingDown}
            color='red'
          />
          <StatCard
            title='กำไรสุทธิ'
            value={`฿${profit.toLocaleString()}`}
            change={12.5}
            icon={IoMdTrendingUp}
            color='blue'
          />
          <StatCard
            title='จำนวนออเดอร์'
            value={totalOrders.toLocaleString()}
            change={5.8}
            icon={BiPackage}
            color='purple'
          /> */}

      <div className='mb-6'>
        <div className='flex items-center space-x-4'>
          <div className='flex bg-white rounded-lg p-1 shadow-sm border'>
            <button
              onClick={() => setSelectedPeriod('day')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === 'day'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              รายวัน
            </button>
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              รายสัปดาห์
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              รายเดือน
            </button>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <StatCard
          title='รายได้รวม'
          value={`฿${totalRevenue.toLocaleString()}`}
          change={8.2}
          icon={FaDollarSign}
          color='green'
        />
        <StatCard
          title='รายจ่ายรวม'
          value={`฿${totalExpense.toLocaleString()}`}
          change={-3.1}
          icon={IoMdTrendingDown}
          color='red'
        />
        <StatCard
          title='กำไรสุทธิ'
          value={`฿${profit.toLocaleString()}`}
          change={12.5}
          icon={IoMdTrendingUp}
          color='blue'
        />
        <StatCard
          title='จำนวนออเดอร์'
          value={totalOrders.toLocaleString()}
          change={5.8}
          icon={BiPackage}
          color='purple'
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
        <div className='lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-semibold text-gray-900'>
              ยอดขายทั้งหมด
            </h2>
            <div className='flex space-x-2'>
              <button
                onClick={() => setSalesViewType('number')}
                className={`p-2 rounded-lg transition-colors ${
                  salesViewType === 'number'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title='แสดงตัวเลข'
              >
                <FaHashtag className='w-4 h-4' />
              </button>
              <button
                onClick={() => setSalesViewType('bar')}
                className={`p-2 rounded-lg transition-colors ${
                  salesViewType === 'bar'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title='กราฟแท่ง'
              >
                <IoBarChart className='w-4 h-4' />
              </button>
              <button
                onClick={() => setSalesViewType('pie')}
                className={`p-2 rounded-lg transition-colors ${
                  salesViewType === 'pie'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title='กราฟวงกลม'
              >
                <IoPieChart className='w-4 h-4' />
              </button>
              <button
                onClick={() => setSalesViewType('chart')}
                className={`p-2 rounded-lg transition-colors ${
                  salesViewType === 'chart'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title='กราฟพื้นที่'
              >
                <IoMdTrendingUp className='w-4 h-4' />
              </button>
            </div>
          </div>
          {renderSalesDisplay()}
        </div>

        {/* Quick Stats */}
        <div className='space-y-6'>
          <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              สถิติด่วน
            </h3>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <FaTruck className='w-5 h-5 text-blue-600 mr-3' />
                  <span className='text-gray-600'>รถขนส่งทั้งหมด</span>
                </div>
                <span className='font-semibold'>45</span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <FaUsers className='w-5 h-5 text-green-600 mr-3' />
                  <span className='text-gray-600'>พนักงานขับรถ</span>
                </div>
                <span className='font-semibold'>68</span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <BiMapPin className='w-5 h-5 text-purple-600 mr-3' />
                  <span className='text-gray-600'>จุดส่งมอบ</span>
                </div>
                <span className='font-semibold'>1,248</span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <FaClock className='w-5 h-5 text-orange-600 mr-3' />
                  <span className='text-gray-600'>เวลาส่งเฉลี่ย</span>
                </div>
                <span className='font-semibold'>2.4 ชม.</span>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              อัตรากำไร
            </h3>
            <div className='text-center'>
              <div className='text-3xl font-bold text-green-600 mb-2'>
                {profitMargin}%
              </div>
              <p className='text-gray-600 text-sm'>อัตรากำไรสุทธิ</p>
              <div className='mt-4 bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-green-600 h-2 rounded-full transition-all duration-500'
                  style={{ width: `${profitMargin}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-6'>
          กิจกรรมล่าสุด
        </h2>
        <div className='space-y-4'>
          {[
            {
              action: 'การส่งมอบสำเร็จ',
              detail: 'ออเดอร์ #12345 ส่งมอบที่กรุงเทพฯ',
              time: '10 นาทีที่แล้ว',
              status: 'success'
            },
            {
              action: 'รถขนส่งออกเดินทาง',
              detail: 'รถหมายเลข TK-001 ออกเดินทางไปเชียงใหม่',
              time: '25 นาทีที่แล้ว',
              status: 'info'
            },
            {
              action: 'ออเดอร์ใหม่',
              detail: 'รับออเดอร์ใหม่ #12346 จากลูกค้า ABC Company',
              time: '1 ชั่วโมงที่แล้ว',
              status: 'new'
            },
            {
              action: 'การบำรุงรักษา',
              detail: 'รถหมายเลข TK-005 เข้ารับการบำรุงรักษา',
              time: '2 ชั่วโมงที่แล้ว',
              status: 'warning'
            }
          ].map((activity, index) => (
            <div
              key={index}
              className='flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors'
            >
              <div
                className={`w-3 h-3 rounded-full mr-4 ${
                  activity.status === 'success'
                    ? 'bg-green-500'
                    : activity.status === 'info'
                    ? 'bg-blue-500'
                    : activity.status === 'new'
                    ? 'bg-purple-500'
                    : 'bg-yellow-500'
                }`}
              ></div>
              <div className='flex-1'>
                <p className='font-medium text-gray-900'>{activity.action}</p>
                <p className='text-sm text-gray-600'>{activity.detail}</p>
              </div>
              <span className='text-xs text-gray-500'>{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeDashboard
