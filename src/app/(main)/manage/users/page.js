'use client'
import React, { Suspense } from 'react'
import LoadingUsersPage from './loading'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'
import ViewUsers from '@/views/manage/users'

const Users = () => {
  useSetPageTitle('Users Management')
  return (
    <Suspense fallback={<LoadingUsersPage />}>
      <ViewUsers />
    </Suspense>
  )
}

export default Users
