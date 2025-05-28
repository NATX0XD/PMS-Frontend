'use client'
import TableQuery from '@/components/TableQuery'
import ColumnsTableUsers from '@/configurations/columns/ColumnsTableUsers'
import { useAsyncList } from '@react-stately/data'
import React, { useEffect, useState } from 'react'
import InputItemsAccounts from '@/configurations/InputItemsAccounts'
const FormUsers = () => {
  // let listUsers = useAsyncList({
  //   async load ({ signal }) {
  //     let res = await fetch('https://dummyjson.com/users', {
  //       signal
  //     })
  //     let json = await res.json()

  //     setIsLoading(false)

  //     return {
  //       items: json.users
  //     }
  //   },
  //   async sort ({ items, sortDescriptor }) {
  //     return {
  //       items: items.sort((a, b) => {
  //         let first = a[sortDescriptor.column]
  //         let second = b[sortDescriptor.column]
  //         let cmp =
  //           (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

  //         if (sortDescriptor.direction === 'descending') {
  //           cmp *= -1
  //         }

  //         return cmp
  //       })
  //     }
  //   }
  // })
  const [isLoading, setIsLoading] = useState(true)
  const [listUsers, setListUsers] = useState([])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://dummyjson.com/users')
        const data = await res.json()
        setListUsers(data.users)
      } catch (err) {
        console.error('Error fetching users:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <TableQuery
      titleTable='Accounts Users List'
      dataAll={listUsers}
      isLoading={isLoading}
      columns={ColumnsTableUsers}
      inputItemsModal={InputItemsAccounts}
      ModalTitle='Add New Account'
      createFunction={null}
      searchField='firstName'
      initialVisibleColumns={['image', 'username', 'email', 'phone', 'role']}
      // height="600px"
    />
  )
}

export default FormUsers
