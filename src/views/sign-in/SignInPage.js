'use client'
import {
  Button,
  Card,
  CardBody,
  Form,
  Input,
  Checkbox,
  Link,
  Divider,
  addToast
} from '@heroui/react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSettings } from '@/hooks/useSettings'
import { signIn } from 'next-auth/react'
import clsx from 'clsx'
import { BiPackage } from 'react-icons/bi'
import { EyeIcon } from '@/components/icon/EyeIcon'
import { EyeSlashIcon } from '@/components/icon/EyeSlashIcon'

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { settings, saveSettings } = useSettings()
  const [resetPasswordToken, setResetPasswordToken] = useState(null)
  const [loading, setLoading] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)
  const handleSignIn = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = new FormData(e.target)
    const username = form.get('username')
    const password = form.get('password')

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false
    })
    setLoading(false)
    if (result.error && !result.ok) {
      const error = JSON.parse(result.error)
      if (error.code === 21201) {
        setResetPasswordToken(error.data.access_token)
      } else if (error.code === 21206) {
        addToast({
          title: 'ไม่ถูกต้อง',
          description: error.description,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: 'danger'
        })
        setError(error.description)
      } else if (error.code === 21202) {
        addToast({
          title: 'ไม่ถูกต้อง',
          description: error.description,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: 'danger'
        })
        setError(error.description)
      } else if (error.code === 21207) {
        addToast({
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          description: error.description,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: 'danger'
        })
        console.log('เข้าสู่ระบบไม่สำเร็จ')
        setError('เข้าสู่ระบบไม่สำเร็จ')
      }
    }
    if (result.ok && result.status === 200) {
      router.replace('/')
    }
  }

  return (
    <div
      className='flex h-screen w-full bg-cover justify-center items-center relative z=0'
      style={{
        backgroundImage: 'url("/images/Bg-Sign-in001.jpg")',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className='absolute inset-0 bg-black/40 backdrop-blur-sm z-0'></div>
      <div
        className='  flex items-center bg-transparent text-white font-bold text-xl'
        style={{
          zIndex: 10,
          position: 'absolute',
          top: 40,
          left: 40
        }}
      >
        <BiPackage className='' />
        {process.env.NEXT_PUBLIC_APP_NAME} | SIGN IN
      </div>

      <div className='flex w-full max-w-md flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small z-20'>
        <div className='flex flex-col gap-1 text-center'>
          <h1 className='text-2xl font-bold p-2'>เข้าสู่ระบบ</h1>

          {error && <p className='text-small text-default-500'>{error}</p>}
        </div>

        <Form
          className='flex flex-col gap-5'
          validationBehavior='native'
          onSubmit={handleSignIn}
        >
          <Input
            errorMessage={error}
            isInvalid={error ? true : false}
            isRequired
            label='Username '
            name='username'
            placeholder='กรุณากรอกชื่อผู้ใช้'
            type='text'
            variant='bordered'
            size='lg'
          />
          <Input
            errorMessage={error}
            isInvalid={error ? true : false}
            isRequired
            endContent={
              <button type='button' onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashIcon className='pointer-events-none text-2xl text-default-400' />
                ) : (
                  <EyeIcon className='pointer-events-none text-2xl text-default-400' />
                )}
              </button>
            }
            label='Password'
            name='password'
            placeholder='กรุณากรอกรหัสผ่าน'
            type={isVisible ? 'text' : 'password'}
            variant='bordered'
            size='lg'
          />
          {/* <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div> */}
          <Button
            className='w-full'
            // color="primary"
            type='submit'
            size='lg'
            loading={loading}
          >
            ลงชื่อเข้าใช้
          </Button>
        </Form>
      </div>
      <div
        className='  bg-transparent text-white '
        style={{
          zIndex: 10,
          position: 'absolute',
          bottom: 40,
          left: 40,
          fontSize: 16
        }}
      >
        &quot; ยินดีต้อนรับสู่ {process.env.NEXT_PUBLIC_APP_NAME}{' '}
        ระบบจัดการเนื้อหาการขนส่งและโลจิสติกส์ที่มีประสิทธิภาพ &quot;
      </div>
    </div>
  )
}

export default SignInPage
