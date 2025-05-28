'use client'
import React, { Suspense } from 'react'
import LoadingQuotationPage from './loading'
import FormQuotation from '@/views/documents/quotation'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'

const Quotation = () => {
  useSetPageTitle('เอกสารใบเสนอราคา')
  return (
    <Suspense fallback={<LoadingQuotationPage />}>
      <FormQuotation />
    </Suspense>
  )
}

export default Quotation
