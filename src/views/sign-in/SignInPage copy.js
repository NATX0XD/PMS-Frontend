'use client'
import { useSettings } from '@/hooks/useSettings'
import Palette from '@/themes/palette'
import React, { useState } from 'react'

const SignInPage = () => {
  const { settings } = useSettings()
  const currentPalette = Palette(settings.palette, 'Light')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = e => {
    e.preventDefault()
    // Handle sign in logic here
    console.log('Signing in with:', email, password)
  }
  return (
    <div
      className='flex h-screen w-full'
      style={{
        background: `linear-gradient(135deg, ${currentPalette.primaryGradientStart} 0%, ${currentPalette.primaryGradientMiddle} 50%, ${currentPalette.primaryGradientEnd} 100%)`,
        transition: 'background 1.5s ease-in-out'
      }}
    >
      <div className='hidden md:flex md:w-1/2 relative flex-col justify-center items-center  p-8'>
        <div className='absolute inset-0 z-0'></div>

        <div className='z-10 relative max-w-md'>
          <h1 className='text-4xl font-bold mb-6'>Logistics Portal</h1>
          <p className='text-xl mb-8'>
            Streamline your supply chain management with our powerful logistics
            platform.
          </p>

          <div className='space-y-6'>
            <div className='flex items-center'>
              <div className='bg-primary p-2 rounded-full mr-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <span className='text-lg'>Real-time tracking and insights</span>
            </div>

            <div className='flex items-center'>
              <div className='bg-blue-500 p-2 rounded-full mr-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </div>
              <span className='text-lg'>
                End-to-end supply chain visibility
              </span>
            </div>

            <div className='flex items-center'>
              <div className='bg-blue-500 p-2 rounded-full mr-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
              </div>
              <span className='text-lg'>Advanced analytics and reporting</span>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full md:w-1/2 flex items-center justify-center p-8 '>
        <div
          className='w-full max-w-md p-8'
          style={{
            borderRadius: 16,
            background: 'rgba(255, 255, 255, 0.21)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold '>Sign In</h2>
            <p className=' mt-2'>
              Welcome back! Please sign in to your account
            </p>
          </div>

          <form onSubmit={handleSignIn} className='space-y-6'>
            <div>
              <label className='block  text-sm font-medium mb-2'>Email</label>
              <input
                type='email'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='your@email.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className='flex justify-between mb-2'>
                <label className=' text-sm font-medium'>Password</label>
                <a href='#' className='text-sm  hover:text-blue-800'>
                  Forgot password?
                </a>
              </div>
              <input
                type='password'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter your password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4  focus:ring-blue-500 border-gray-300 rounded'
              />
              <label htmlFor='remember-me' className='ml-2 block text-sm '>
                Remember me
              </label>
            </div>

            <button
              type='submit'
              className='w-full bg-blue-600 hover:bg-blue-700 font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
            >
              Sign In
            </button>
          </form>

          <div className='mt-6 text-center'>
            <p className=''>
              Don&apos;t have an account?{' '}
              <a href='#' className='text-primary hover:text-info font-medium'>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default SignInPage
// style={{
//   borderRadius: 16,
//   background: "rgba(255, 255, 255, 0.21)",
//   backdropFilter: "blur(10px)",
//   boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
// }}
{
  /* <div className="hidden sm:flex md:w-1/2 relative flex-col justify-center items-center p-8">
        <div className="absolute inset-0 z-0"></div>
        <div className="z-10 relative max-w-md">
          <h1 className="text-4xl font-bold mb-6">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </h1>
          <p className="text-xl mb-8">
            ยินดีต้อนรับสู่ {process.env.NEXT_PUBLIC_APP_NAME}{" "}
            ระบบจัดการเนื้อหาการขนส่งและโลจิสติกส์ที่มีประสิทธิภาพ
          </p>
        </div>
      </div> */
}

{
  /* <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div
          className="w-full max-w-md p-8 shadow-lg"
          style={{
            borderRadius: 26,
            background: "rgba(255, 255, 255)",
          }}
        >
          <div className="text-center mb-8">
            <h2
              className={clsx(
                "pb-5 text-3xl font-bold bg-gradient-to-r transition-all duration-1000 from-[var(--primaryGradientStart)] via-[var(--primaryGradientMiddle)] to-[var(--primaryGradientEnd)] bg-clip-text text-transparent"
              )}
            >
              {process.env.NEXT_PUBLIC_APP_NAME}
            </h2>
            <h2 className="text-2xl font-bold">ลงชื่อเข้าใช้</h2>
            <p className="mt-2">
              ยินดีต้อนรับกลับมา! กรุณาลงชื่อเข้าใช้บัญชีของคุณ
            </p>
          </div>

          <Form onSubmit={handleSignIn} className="space-y-8 w-full">
            <Input
              key={"username"}
              label="ชื่อผู้ใช้"
              labelPlacement={"inside"}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              classNames={inputStyles}
              size="md"
            />
            <Input
              key={"password"}
              label="รหัสผ่าน"
              labelPlacement={"inside"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              classNames={inputStyles}
              size="md"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary rounded-lg"
              disabled={!username || !password}
            >
              เข้าสู่ระบบ
            </Button>
          </Form>
        </div>
      </div> */
}
