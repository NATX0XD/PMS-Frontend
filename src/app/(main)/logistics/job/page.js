'use client'
import JobForm from '@/components/JobForm'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'
import ViewShippingJob from '@/views/shipping/job'
import React from 'react'

const ShippingJob = () => {
  useSetPageTitle('Shipping JOB / Import shipment')
  return <JobForm />
  // <ViewShippingJob />
  // <JobForm/>
}

export default ShippingJob
