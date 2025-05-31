'use client'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'
import ViewShippingJob from '@/views/shipping/job'
import React from 'react'

const ShippingJob = () => {
  useSetPageTitle('Shipping JOB / Import shipment')
  return <ViewShippingJob />
}

export default ShippingJob
