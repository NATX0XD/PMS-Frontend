'use client'
import { DeleteIcon } from '@/components/icon/DeleteIcon'
import { EditIcon } from '@/components/icon/EditIcon'
import { Button, Card, CardBody, CardHeader, Divider } from '@heroui/react'
import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import {
  FaChartArea,
  FaCheck,
  FaCog,
  FaEdit,
  FaFile,
  FaHome,
  FaPlus,
  FaSave,
  FaShoppingCart,
  FaTimes,
  FaTrash,
  FaUser,
  FaUsers
} from 'react-icons/fa'

// Mock data for pages that can be accessed
const availablePages = [
  { id: 'dashboard', name: 'Dashboard', icon: FaHome },
  { id: 'users', name: 'Users Management', icon: FaUser },
  { id: 'products', name: 'Products', icon: FaShoppingCart },
  { id: 'reports', name: 'Reports', icon: FaChartArea },
  { id: 'documents', name: 'Documents', icon: FaFile },
  { id: 'settings', name: 'Settings', icon: FaCog }
]

const ViewRoles = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full access to all system features',
      permissions: [
        'dashboard',
        'users',
        'products',
        'reports',
        'documents',
        'settings'
      ],
      userCount: 2
    },
    {
      id: 2,
      name: 'Manager',
      description: 'Management level access',
      permissions: ['dashboard', 'users', 'products', 'reports'],
      userCount: 5
    },
    {
      id: 3,
      name: 'Employee',
      description: 'Basic employee access',
      permissions: ['dashboard', 'products'],
      userCount: 12
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  })

  const openModal = (role = null) => {
    if (role) {
      setEditingRole(role)
      setFormData({
        name: role.name,
        description: role.description,
        permissions: [...role.permissions]
      })
    } else {
      setEditingRole(null)
      setFormData({
        name: '',
        description: '',
        permissions: []
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingRole(null)
    setFormData({ name: '', description: '', permissions: [] })
  }

  const handleSave = () => {
    if (!formData.name.trim()) return

    if (editingRole) {
      // Update existing role
      setRoles(
        roles.map(role =>
          role.id === editingRole.id ? { ...role, ...formData } : role
        )
      )
    } else {
      // Add new role
      const newRole = {
        id: Math.max(...roles.map(r => r.id)) + 1,
        ...formData,
        userCount: 0
      }
      setRoles([...roles, newRole])
    }
    closeModal()
  }

  const handleDelete = roleId => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบ role นี้?')) {
      setRoles(roles.filter(role => role.id !== roleId))
    }
  }

  const togglePermission = pageId => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(pageId)
        ? prev.permissions.filter(p => p !== pageId)
        : [...prev.permissions, pageId]
    }))
  }

  return (
    <>
      <div className='flex items-center justify-between mb-8'>
        <p className=' mt-2'>จัดการบทบาทและสิทธิ์การเข้าถึงของผู้ใช้</p>
        <Button
          color='primary'
          size='md'
          endContent={<FaPlus />}
          onPress={openModal}
        >
          เพิ่ม Role ใหม่
        </Button>
      </div>

      {/* Roles Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {roles.map(role => (
          <>
            <div
              key={role.id}
              className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200'
            >
              <div className='p-6'>
                {/* Role Header */}
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <h3 className='text-xl font-semibold text-gray-800 mb-1'>
                      {role.name}
                    </h3>
                    <p className='text-gray-600 text-sm'>{role.description}</p>
                  </div>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => openModal(role)}
                      className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                      title='แก้ไข'
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(role.id)}
                      className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                      title='ลบ'
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* User Count */}
                <div className='mb-4 p-3 bg-gray-50 rounded-lg'>
                  <div className='flex items-center gap-2 text-gray-700'>
                    <FaUsers className='text-sm' />
                    <span className='text-sm font-medium'>
                      {role.userCount} ผู้ใช้
                    </span>
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <h4 className='text-sm font-semibold text-gray-700 mb-3'>
                    สิทธิ์การเข้าถึง:
                  </h4>
                  <div className='space-y-2'>
                    {availablePages.map(page => {
                      const hasPermission = role.permissions.includes(page.id)
                      const IconComponent = page.icon
                      return (
                        <div key={page.id} className='flex items-center gap-2'>
                          <IconComponent
                            className={`text-sm ${
                              hasPermission ? 'text-green-500' : 'text-gray-300'
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              hasPermission ? 'text-gray-700' : 'text-gray-400'
                            }`}
                          >
                            {page.name}
                          </span>
                          {hasPermission && (
                            <FaCheck className='text-green-500 text-xs ml-auto' />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            <Card key={role.id} className='p-2'>
              <CardHeader className=''>
                <div className='w-full flex items-start justify-between'>
                  <div>
                    <h3 className='text-xl font-semibold  mb-1'>{role.name}</h3>
                    <p className='text-gray-600 text-sm'>{role.description}</p>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      isIconOnly
                      color='success'
                      variant='light'
                      onPress={() => openModal(role)}
                      // className='text-default-400'
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      isIconOnly
                      color='danger'
                      variant='light'
                      onPress={() => handleDelete(role.id)}
                      className='text-danger'
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <Divider className='' />
              <CardBody className=''>
                <>
                  <h4 className='text-sm font-semibold text-gray-700 mb-3'>
                    สิทธิ์การเข้าถึง:
                  </h4>
                  <div className='space-y-2'>
                    {availablePages.map(page => {
                      const hasPermission = role.permissions.includes(page.id)
                      const IconComponent = page.icon
                      return (
                        <div key={page.id} className='flex items-center gap-2'>
                          <IconComponent
                            className={`text-sm ${
                              hasPermission ? 'text-green-500' : 'text-gray-300'
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              hasPermission ? 'text-gray-700' : 'text-gray-400'
                            }`}
                          >
                            {page.name}
                          </span>
                          {hasPermission && (
                            <FaCheck className='text-green-500 text-xs ml-auto' />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </>
              </CardBody>
            </Card>
          </>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            {/* Modal Header */}
            <div className='flex items-center justify-between p-6 border-b'>
              <h2 className='text-2xl font-bold text-gray-800'>
                {editingRole ? 'แก้ไข Role' : 'เพิ่ม Role ใหม่'}
              </h2>
              <button
                onClick={closeModal}
                className='text-gray-500 hover:text-gray-700 p-2'
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Content */}
            <div className='p-6 space-y-6'>
              {/* Role Name */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  ชื่อ Role *
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, name: e.target.value }))
                  }
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='กรอกชื่อ Role'
                />
              </div>

              {/* Description */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  คำอธิบาย
                </label>
                <textarea
                  value={formData.description}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      description: e.target.value
                    }))
                  }
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  rows={3}
                  placeholder='กรอกคำอธิบายของ Role'
                />
              </div>

              {/* Permissions */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-4'>
                  สิทธิ์การเข้าถึงหน้าต่างๆ
                </label>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {availablePages.map(page => {
                    const IconComponent = page.icon
                    const isSelected = formData.permissions.includes(page.id)
                    return (
                      <div
                        key={page.id}
                        onClick={() => togglePermission(page.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <div className='flex items-center gap-3'>
                          <IconComponent className='text-lg' />
                          <span className='font-medium'>{page.name}</span>
                          {isSelected && (
                            <FaCheck className='ml-auto text-blue-500' />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className='flex items-center justify-end gap-3 p-6 border-t bg-gray-50'>
              <button
                onClick={closeModal}
                className='px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.name.trim()}
                className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2'
              >
                <FaSave />
                {editingRole ? 'บันทึกการแก้ไข' : 'เพิ่ม Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ViewRoles
