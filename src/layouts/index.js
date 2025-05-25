'use client'
import { usePathname, useRouter } from 'next/navigation'
import MainLayout from './MainLayout'
import AuthLayout from './AuthLayout'
import ErrorLayout from './ErrorLayout'

import '../themes/styles/globals.css'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'

const layouts = {
  MainLayout,
  AuthLayout,
  ErrorLayout
}
const AppLayout = ({ children }) => {
  const pathname = usePathname()
  const [queryClient] = useState(
    () =>
      new QueryClient({
        contextSharing: true,
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 2,
            retryDelay: attemptIndex =>
              Math.min(1000 * 2 ** attemptIndex, 30000)
          }
        }
      })
  )

  const authPage = ['/sign-in']
  const errorPage = ['/403', '/server-error', '/network-error']

  const LayoutWrapper = authPage.includes(pathname)
    ? layouts['AuthLayout']
    : errorPage.includes(pathname)
    ? layouts['ErrorLayout']
    : layouts['MainLayout']

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <ToastProvider />
        <LayoutWrapper>{children}</LayoutWrapper>
      </HeroUIProvider>
    </QueryClientProvider>
  )
}
export default AppLayout
