'use client'

import NavbarTop from '@/components/NavbarTop'
import Sidebar from '@/components/Sidebar'
import { usePageTitle } from '@/context/PageTitleContext'
import { useSettings } from '@/hooks/useSettings'
import ThemeComponent from '@/themes'
import { Drawer, DrawerContent } from '@heroui/react'
import React, { useEffect, useState } from 'react'

const MainLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const { title } = usePageTitle()
  const handleOpenSidebar = () => {
    setOpenSidebar(true)
  }
  const handleCloseSidebar = () => {
    setOpenSidebar(false)
  }
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ThemeComponent>
      {/* <div
        style={{
          background: `linear-gradient(135deg, ${palettes.primaryGradientStart} 0%, ${palettes.primaryGradientMiddle} 50%, ${palettes.primaryGradientEnd} 100%)`,
          // minHeight: "100vh",
          transition: "background 1.5s ease-in-out",
        }}
      > */}

      <div className='flex h-screen w-full overflow-hidden'>
        {!isMobile && <Sidebar isMobile={isMobile} />}
        {isMobile && (
          <Drawer
            isOpen={openSidebar}
            onClose={handleCloseSidebar}
            placement='left'
          >
            <DrawerContent className='w-[250px]'>
              <Sidebar isMobile={isMobile} />
            </DrawerContent>
          </Drawer>
        )}

        <div
          className='flex flex-col flex-1 min-h-0'
          style={{ width: 'calc(100vw - 250px)' }}
        >
          <div className='w-full  '>
            <NavbarTop
              isMobile={isMobile}
              onOpenSidebar={handleOpenSidebar}
              titlePage={title}
            />
          </div>

          <main className='flex-1 overflow-y-auto overflow-x-hidden p-4  w-full '>
            {children}
          </main>
        </div>
      </div>

      {/* </div> */}
    </ThemeComponent>
  )
}

export default MainLayout
{
  /* <main className='flex-1 overflow-hidden pt-1 pb-2 p-4 w-full'> */
}

// overflow-x-hidden w-full
// style={{
//   width: "100%",
//   maxWidth: breakpoints[settings.contentWidth],
// }}
