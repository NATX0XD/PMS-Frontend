import React, { useMemo } from 'react'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Avatar,
  Card
} from '@heroui/react'
import { IoIosSearch, IoMdMenu, IoMdSettings, IoMdSunny } from 'react-icons/io'
import { FaBell, FaMoon } from 'react-icons/fa'
import { useSettings } from '@/hooks/useSettings'
import { signOut } from 'next-auth/react'
import { useAuth } from '@/hooks/useAuth'
import { MdLanguage } from 'react-icons/md'
import { IoSparkles } from 'react-icons/io5'

const NavbarTop = ({ isMobile, onOpenSidebar, titlePage }) => {
  const { settings, saveSettings } = useSettings()
  const { profile } = useAuth()
  const handleChange = (name, value) => {
    saveSettings({ ...settings, [name]: value })
  }

  const languageItem = [
    { label: 'ภาษาไทย', key: 'th', value: 'th' },
    { label: 'English', key: 'en', value: 'en' }
  ]

  const modeItem = [
    {
      label: 'โหมดมืด',
      key: 'Dark',
      icon: <FaMoon />,
      value: 'Dark'
    },
    {
      label: 'โหมดสว่าง',
      key: 'Light',
      icon: <IoMdSunny />,
      value: 'Light'
    }
  ]

  const paletteOptions = [
    {
      label: 'เริ่มต้น',
      color: 'linear-gradient(104deg, #123458 0%, #D4C9BE 50%, #F1EFEC 100%)',
      value: 'Normal'
    },
    {
      label: 'เขียว',
      color: 'linear-gradient(104deg, #196f3d 0%, #289656 50%, #4fdd8a 100%)',
      value: 'Forest'
    },
    {
      label: 'ชมพู',
      color: 'linear-gradient(104deg, #fc94ac 0%, #debef0 50%, #db94f7 100%)',
      value: 'Cherry'
    },
    {
      label: 'ฟ้า',
      color: 'linear-gradient(104deg, #c8b6ff 0%, #b8e1ff 50%, #ddffdb 100%)',
      value: 'Snowy'
    },
    {
      label: 'ส้ม',
      color: 'linear-gradient(104deg, #ff4200 0%, #ff8200 50%, #ffc200 100%)',
      value: 'Desert'
    }
  ]

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: '/sign-in' })
  }

  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }, [])

  const currentTime = useMemo(() => {
    return new Date().toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'สวัสดีตอนเช้า'
    if (hour < 17) return 'สวัสดีตอนบ่าย'
    return 'สวัสดีตอนเย็น'
  }

  return (
    <div className='flex justify-between items-center p-4  space-x-4  '>
      <div className='flex items-center space-x-4'>
        {isMobile && (
          <Button
            className='bg-white dark:bg-zinc-700 shadow-sm hover:shadow-md transition-shadow'
            isIconOnly
            radius='full'
            aria-label='Open Sidebar'
            size='md'
            onPress={onOpenSidebar}
          >
            <IoMdMenu className='text-lg' />
          </Button>
        )}

        <div className='hidden md:block'>
          <div className='flex items-center space-x-4'>
            {/* Page Title Section */}
            <div className='flex items-center space-x-2'>
              <div className='w-1 h-6 bg-gradient-to-b from-[var(--primaryGradientStart)] to-[var(--primaryGradientEnd)] rounded-full'></div>
              <h1 className='text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
                {titlePage}
              </h1>
            </div>

            {/* Divider */}
            <div className='w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600'></div>

            {/* Greeting Section */}
            <div className='flex items-center space-x-2'>
              <div className='flex items-center space-x-1.5 mt-0.5'>
                <span className='text-xs text-gray-600 dark:text-gray-400 font-medium'>
                  {currentDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='block md:hidden'>
          <div className='flex items-center space-x-2'>
            <div className='w-1 h-6 bg-gradient-to-b from-[var(--primaryGradientStart)] to-[var(--primaryGradientEnd)] rounded-full'></div>
            <h1 className='text-lg font-bold text-gray-900 dark:text-white'>
              {titlePage}
            </h1>
          </div>
        </div>
      </div>

      <div className='flex items-center space-x-2'>
        {/* Mode Toggle */}
        <Dropdown placement='bottom-end' className='min-w-[120px]' shadow='sm'>
          <DropdownTrigger>
            <Button
              className='bg-white dark:bg-zinc-700 shadow-sm hover:shadow-md transition-all duration-200'
              isIconOnly
              radius='full'
              aria-label='Theme Mode'
            >
              {settings.mode === 'Dark' ? (
                <IoMdSunny className='text-lg' />
              ) : (
                <FaMoon className='text-lg' />
              )}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            shadow='none'
            aria-label='Select Mode'
            selectedKeys={[settings.mode]}
            selectionMode='single'
            items={modeItem}
          >
            {item => (
              <DropdownItem
                key={item.key}
                onPress={() => handleChange('mode', item.value)}
                startContent={item.icon}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>

        {/* Color Palette */}
        <Dropdown placement='bottom-end' className='min-w-[140px]' shadow='sm'>
          <DropdownTrigger>
            <Button
              className='bg-white dark:bg-zinc-700 shadow-sm hover:shadow-md transition-all duration-200'
              isIconOnly
              radius='full'
              aria-label='Color Theme'
              size='md'
            >
              <IoMdSettings className='text-2xl' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Select Color Theme'
            selectedKeys={[settings.palette]}
            selectionMode='single'
            items={paletteOptions}
          >
            {item => (
              <DropdownItem
                key={item.value}
                onPress={() => handleChange('palette', item.value)}
              >
                <div className='flex items-center space-x-2'>
                  <span
                    className='w-5 h-5 rounded-full border'
                    style={{ background: item.color }}
                  />
                  <span>{item.label}</span>
                </div>
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>

        {/* Language */}
        <Dropdown placement='bottom-end' className='min-w-[100px]' shadow='sm'>
          <DropdownTrigger>
            <Button
              className='bg-white dark:bg-zinc-700 shadow-sm hover:shadow-md transition-all duration-200'
              isIconOnly
              radius='full'
              aria-label='Language'
              size='md'
            >
              <MdLanguage className='text-2xl' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Switch Language'
            selectedKeys={[settings.locale]}
            selectionMode='single'
            variant='flat'
            items={languageItem}
          >
            {item => (
              <DropdownItem
                key={item.key}
                onPress={() => handleChange('locale', item.value)}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>

        {/* Notifications */}
        <Button
          className='bg-white dark:bg-zinc-700 shadow-sm hover:shadow-md transition-all duration-200'
          isIconOnly
          radius='full'
          aria-label='Notifications'
          size='md'
        >
          <FaBell className='text-lg' />
        </Button>

        {/* Profile */}
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              color='primary'
              as='button'
              className='transition-transform hover:scale-105 shadow-lg'
              name={profile?.username?.charAt(0).toUpperCase()}
              size='md'
              showFallback
              radius='full'
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='gap-2'>
              <div>
                <p className='font-semibold'>
                  {profile?.username?.charAt(0).toUpperCase() +
                    profile?.username.slice(1)}
                </p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  {profile?.role}
                </p>
              </div>
            </DropdownItem>
            <DropdownItem key='settings'>My Profile</DropdownItem>
            <DropdownItem key='help_and_feedback'>คู่มือ</DropdownItem>
            <DropdownItem
              key='logout'
              className='text-danger'
              color='danger'
              onPress={handleSignOut}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavbarTop
