import React from 'react'
import { Card, CardBody } from '@heroui/react'
import clsx from 'clsx'
import { AiFillDashboard } from 'react-icons/ai'
import { IoMdTrendingDown, IoMdTrendingUp } from 'react-icons/io'
const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    darkBg: 'dark:bg-blue-950',
    text: 'text-blue-600',
    darkText: 'dark:text-blue-400'
  },
  red: {
    bg: 'bg-red-50',
    darkBg: 'dark:bg-red-950',
    text: 'text-red-600',
    darkText: 'dark:text-red-400'
  },
  green: {
    bg: 'bg-green-50',
    darkBg: 'dark:bg-green-950',
    text: 'text-green-600',
    darkText: 'dark:text-green-400'
  },
  yellow: {
    bg: 'bg-yellow-50',
    darkBg: 'dark:bg-yellow-950',
    text: 'text-yellow-600',
    darkText: 'dark:text-yellow-400'
  },
  gray: {
    bg: 'bg-gray-100',
    darkBg: 'dark:bg-gray-800',
    text: 'text-gray-600',
    darkText: 'dark:text-gray-300'
  }
}
const SummaryCard = ({
  title = 'Title',
  description = 'Description',
  icon: Icon = AiFillDashboard,
  color = 'blue',
  value = '0',
  previousValue = 0,
  typeValue = 'number', // 'number' | 'currency' | 'float'
  onClick = () => {}
}) => {
  const selectedColor = colorMap[color]

  const parseToNumber = val => {
    if (typeof val === 'number') return val
    return Number(val.toString().replace(/[^0-9.-]+/g, '')) || 0
  }

  const currentVal = parseToNumber(value)
  const prevVal = parseToNumber(previousValue)

  const percentChange =
    prevVal !== 0 ? ((currentVal - prevVal) / prevVal) * 100 : 0

  const isUp = percentChange > 0
  const isDown = percentChange < 0
  const isNeutral = percentChange === 0

  const formatValue = val => {
    if (typeValue === 'currency') {
      return `฿${val.toLocaleString()}`
    }
    if (typeValue === 'float') {
      return val.toFixed(2)
    }
    return val.toLocaleString()
  }

  return (
    <Card className='p-2' onPress={onClick}>
      <CardBody>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              {title}
            </p>
            {description && (
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                {description}
              </p>
            )}
            <p className='text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1'>
              {formatValue(currentVal)}
            </p>

            <div
              className={clsx(
                'flex items-center mt-2 text-sm',
                isUp
                  ? 'text-green-600'
                  : isDown
                  ? 'text-red-600'
                  : 'text-gray-500'
              )}
            >
              {isUp && <IoMdTrendingUp className='w-4 h-4 mr-1' />}
              {isDown && <IoMdTrendingDown className='w-4 h-4 mr-1' />}
              {isNeutral && <span className='w-4 h-4 mr-1'>–</span>}
              {Math.abs(percentChange).toFixed(2)}%
            </div>
          </div>

          <div
            className={clsx(
              'p-3 rounded-lg ',
              selectedColor.bg,
              selectedColor.darkBg
            )}
          >
            <Icon
              className={clsx(
                'w-6 h-6',
                selectedColor.text,
                selectedColor.darkText
              )}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default SummaryCard
