// components/ProtectedRoute.js
'use client'
import { Spinner } from '@heroui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute ({ children }) {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      // router.push('/sign-in')
    }
  }, [status, router])

  // if (status === "loading")
  //   return (
  //     <div className="flex justify-center items-center h-screen w-full">

  //       <Spinner
  //         classNames={{ label: "text-foreground mt-4" }}
  //         variant="spinner"
  //       />
  //       loading ProtectedRoute
  //     </div>
  //   );

  return children
}
