'use client'
import TableQuery from '@/components/TableQuery'
import ColumnsTableDocuments from '@/configurations/columns/ColumnsTableDocuments'
import { Button } from '@heroui/react'
import Link from 'next/link'
import React, { useState } from 'react'

const ViewDocumets = () => {
  const [isLoading, setIsLoading] = useState(false)
  // const [documentsList, setDocumentsList] = useState(true)

  const documentsList = [
    {
      id: 'QUO-2025-001',
      type: 'quotation',
      customer: 'ABC Company',
      amount: 15000,
      status: 'sent',
      date: '2025-01-15'
    },
    {
      id: 'INV-2025-001',
      type: 'invoice',
      customer: 'XYZ Corporation',
      amount: 22000,
      status: 'paid',
      date: '2025-01-14'
    }
  ]
  return (
    <TableQuery
      titleTable='Documents List'
      dataAll={documentsList}
      isLoading={isLoading}
      columns={ColumnsTableDocuments}
      isModalAction={false}
      createFunction={null}
      searchField='customer'
      searchPlaceholder='Search Customer '
      initialVisibleColumns={[
        'id',
        'type',
        'customer',
        'amount',
        'status',
        'date'
      ]}
      actionButton={false}
      renderActionButton={
        <>
          <div className='flex gap-2'>
            <Button
              as={Link}
              href='/documents/quotation'
              size='md'
              className='bg-blue-500 text-white hover:bg-blue-700 transition-colors'
            >
              New Quotation
            </Button>
            <Button
              as={Link}
              href='/documents/invoice'
              size='md'
              className='bg-green-600 text-white hover:bg-green-700 transition-colors'
            >
              New Invoice
            </Button>
          </div>
        </>
      }
      statusMapKey='status'
      statusColorMap={{
        paid: 'success',
        sent: 'warning',
        cancel: 'danger'
      }}
    />
  )
}

export default ViewDocumets
