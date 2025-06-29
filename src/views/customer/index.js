'use Client'
import TableQuery from '@/components/TableQuery'
import ColumnsTableCustomer from '@/configurations/columns/ColumnsTableCustomer'
import InputItemsCustomer from '@/configurations/modalCreate/InputItemsCustomer'
import React, { useState } from 'react'

const ViewCustomer = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [listCustomer, setListCustomer] = useState([
    {
      id: 1,
      name: 'บริษัท ABC',
      contact_name: 'สมชาย',
      phone: '0812345678',
      email: 'abc@email.com',
      address: '...',
      city: '...',
      state: '...',
      postal_code: '...',
      country: '...',
      tax_id: '...',
      customer_type: { id: 1, name: 'corporate' },
      created_at: '2024-06-21T12:00:00Z'
    }
  ])
  const customersForTable = listCustomer.map(c => ({
    ...c,
    customer_type: c.customer_type?.name || '-'
  }))
  return (
    <>
      <TableQuery
        titleTable='Customer List'
        dataAll={customersForTable}
        isLoading={isLoading}
        columns={ColumnsTableCustomer}
        inputItemsModal={InputItemsCustomer}
        ModalTitle='Add New Customer'
        createFunction={null}
        searchField='firstName'
        initialVisibleColumns={['name', 'email', 'tax_id', 'customer_type']}
        // height="600px"
      />
    </>
  )
}

export default ViewCustomer
