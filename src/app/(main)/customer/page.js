'use client'
import React, { Suspense } from 'react'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'
import LoadingCustomerPage from './loading'
import ViewCustomer from '@/views/customer'

const Products = () => {
  useSetPageTitle('Customer Management')
  return (
    <Suspense fallback={<LoadingCustomerPage />}>
      <ViewCustomer />
    </Suspense>
  )
}

export default Products
