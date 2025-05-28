'use client'
import ViewDocumets from '@/views/documents'
import React, { Suspense } from 'react'
import LoadingDocuments from './loading'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'

const Documents = () => {
  useSetPageTitle('ภาพรวมเอกสาร')
  return (
    <Suspense fallback={<LoadingDocuments />}>
      <ViewDocumets />
    </Suspense>
  )
}

export default Documents
