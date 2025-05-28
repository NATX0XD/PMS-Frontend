'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { SettingsProvider } from '@/context/settingsContext'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import './styles/globals.css'

const ThemeComponent = ({ children }) => {
  return (
    <NextThemesProvider attribute='class' defaultTheme='light'>
      <SettingsProvider>{children}</SettingsProvider>
    </NextThemesProvider>
  )
}

export default ThemeComponent
