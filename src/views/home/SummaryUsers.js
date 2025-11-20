'use client'
import React, { useEffect, useState } from 'react'
import { ArrowUpRight } from '@/components/icon/Arrow/ArrowUpRight'
import { Button, Card, Chip, cn } from '@heroui/react'
import { FaUsers } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import SummaryCard from '@/components/SummaryCard'

const SummaryUsers = () => {
  const router = useRouter()
  const [totalUsers, setTotalUsers] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [percentChange, setPercentChange] = useState(0)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('https://dummyjson.com/users')

        if (!response.ok) {
          throw new Error('การดึงข้อมูลล้มเหลว')
        }

        const data = await response.json()

        if (data && data.users && Array.isArray(data.users)) {
          setTotalUsers(data.users.length)

          setPercentChange('N/A')
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])
  return (
    <>
      <SummaryCard
        title='รายได้รวมทั้งหมด'
        description={null}
        color='green'
        value={230000}
        previousValue={100000}
        typeValue='currency'
        // icon={}
      />

      {/* <Card
      key={"UsersAccounts"}
      className="border border-transparent dark:border-default-100"
    >
      <div className="flex p-4">
        <div
          className={cn(
            "mt-1 flex h-8 w-8 items-center justify-center rounded-md bg-success-50"
          )}
        >
          <FaUsers className="text-success" />
        </div>

        <div className="flex flex-col gap-y-2">
          <dt className="mx-4 text-small font-medium text-default-500">
            บัญชีผู้ใช้ทั้งหมด
          </dt>
          <dd className="px-4 text-2xl font-semibold text-default-700">
            {isLoading ? "กำลังโหลด..." : totalUsers.toLocaleString()}
          </dd>
        </div>

        <Chip
          className={cn("absolute right-4 top-4")}
          classNames={{
            content: "font-semibold text-[0.65rem]",
          }}
          color="success"
          radius="sm"
          size="sm"
          startContent={<ArrowUpRight width={12} height={12} />}
          variant="flat"
        >
          {percentChange}
        </Chip>
      </div>

      <div className="bg-default-100">
        <Button
          fullWidth
          className="flex justify-start text-xs text-default-500 data-[pressed]:scale-100"
          radius="none"
          variant="light"
          onPress={() => router.push("/users")}
        >
          เพิ่มเติม
        </Button>
      </div>
    </Card> */}
    </>
  )
}

export default SummaryUsers
