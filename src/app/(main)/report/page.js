'use client'
import React, { Suspense } from 'react'
import FormReports from '@/views/reports'
import LoadingReportsPage from './loading'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'

const Reports = () => {
  useSetPageTitle('รายงาน')
  return (
    <Suspense fallback={<LoadingReportsPage />}>
      <FormReports />
    </Suspense>
  )
}

export default Reports
