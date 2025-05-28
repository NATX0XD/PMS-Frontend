// helpers/useSetPageTitle.js
'use client'
import { useEffect } from 'react'
import { usePageTitle } from '@/context/PageTitleContext'

export const useSetPageTitle = title => {
  const { setTitle } = usePageTitle()
  useEffect(() => {
    setTitle(title)
  }, [setTitle, title])
}
