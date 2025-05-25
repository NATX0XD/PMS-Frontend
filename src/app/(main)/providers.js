'use client'
import { SettingsProvider } from '@/context/settingsContext'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '@/context/authContext'
import ProtectedRoute from '@/layouts/components/ProtectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

export const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider refetchOnWindowFocus={false}>
        <AuthProvider>
          <ProtectedRoute>
            {/* <SettingsProvider> */}
            {children}
            {/* </SettingsProvider> */}
          </ProtectedRoute>
        </AuthProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
