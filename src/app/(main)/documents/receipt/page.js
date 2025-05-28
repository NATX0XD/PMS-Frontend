'use client'
import React, { Suspense } from 'react'
import FormReceipt from '@/views/documents/receipt'
import LoadingReceiptPage from './loading'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'

const Receipt = () => {
  useSetPageTitle('เอกสารใบเสร็จรับเงิน')
  return (
    <Suspense fallback={<LoadingReceiptPage />}>
      <FormReceipt />
    </Suspense>
  )
}

export default Receipt
