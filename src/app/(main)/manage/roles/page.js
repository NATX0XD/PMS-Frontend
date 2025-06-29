'use client'
import React, { Suspense } from 'react'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'
import LoadingRolesPage from './loading'
import ViewRoles from '@/views/manage/roles'

const Users = () => {
  useSetPageTitle('Roles Management')
  return (
    <Suspense fallback={<LoadingRolesPage />}>
      <ViewRoles />
    </Suspense>
  )
}

export default Users
