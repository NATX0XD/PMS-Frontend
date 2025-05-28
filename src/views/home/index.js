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
    </>
  )
}

export default HomeDashboard
