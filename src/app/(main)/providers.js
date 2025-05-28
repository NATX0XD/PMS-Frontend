'use client'
import { SettingsProvider } from '@/context/settingsContext'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '@/context/authContext'
import ProtectedRoute from '@/layouts/components/ProtectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
import { PageTitleProvider } from '@/context/PageTitleContext'
const queryClient = new QueryClient()

export const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider refetchOnWindowFocus={false}>
        <PageTitleProvider>
          <AuthProvider>
            <ProtectedRoute>
              {/* <SettingsProvider> */}
              {children}
              {/* </SettingsProvider> */}
            </ProtectedRoute>
          </AuthProvider>
        </PageTitleProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
