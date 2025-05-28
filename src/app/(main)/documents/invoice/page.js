'use client'
import React, { Suspense } from 'react'
import FormInvoice from '@/views/documents/invoice'
import LoadingInvoicePage from './loading'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'

const Invoice = () => {
  useSetPageTitle('เอกสารใบแจ้งหนี้')
  return (
    <Suspense fallback={<LoadingInvoicePage />}>
      <FormInvoice />
    </Suspense>
  )
}

export default Invoice
