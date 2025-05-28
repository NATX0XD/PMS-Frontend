'use client'
import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Card
} from '@heroui/react'
import { useSession } from 'next-auth/react'
import HomeDashboard from '@/views/home'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'

const Page = () => {
  useSetPageTitle('Home Dashboard')
  const { data: session, status } = useSession()
  // ตรวจสอบสถานะของ session ก่อนเข้าถึง
  if (status === 'loading') return <div>Loading...</div>

  return (
    <>
      {/* <Card>Test</Card> */}
      {/* ตรวจสอบว่ามี session ก่อนเรียกใช้ username */}
      {/* {session?.user?.username ? (
        <div>{session.user.username}</div>
      ) : (
        <div>Not signed in</div>
      )}

      <div className="w-full text-red-500">Page HOME</div>
      <div className="bg-primary text-white">Primary Background</div>
      <div className="text-info">Info Text</div>
      <div className="bg-success text-white">Success Background</div>
      <div className="text-error">Error Text</div>
      <div className="bg-warning text-black">Warning Background</div>
      <a className="text-link underline">Link</a>
      <div className="bg-background">Background ตาม Theme</div> */}

      <HomeDashboard />
    </>
  )
}

export default Page
