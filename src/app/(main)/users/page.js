'use client'
import React, { Suspense } from 'react'
import FormUsers from '@/views/users'
import LoadingUsersPage from './loading'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'

const Users = () => {
  useSetPageTitle('Account Management')
  return (
    <Suspense fallback={<LoadingUsersPage />}>
      <FormUsers />
    </Suspense>
  )
}

export default Users
