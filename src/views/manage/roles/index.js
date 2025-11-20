'use client'
import { DeleteIcon } from '@/components/icon/DeleteIcon'
import { EditIcon } from '@/components/icon/EditIcon'
import { EyeIcon } from '@/components/icon/EyeIcon'
import { useSettings } from '@/hooks/useSettings'
import Palette from '@/themes/palette'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  Tooltip,
  useDisclosure
} from '@heroui/react'
import React, { useState } from 'react'
import { FaHome, FaListUl, FaPlus, FaShieldAlt, FaUsers } from 'react-icons/fa'
import { IoIosSearch } from 'react-icons/io'
import { IoBarChart, IoGridOutline, IoSettingsOutline } from 'react-icons/io5'

const ViewRoles = () => {
  const { settings } = useSettings()
  const palette = Palette(settings.palette, settings.mode)
  const [viewMode, setViewMode] = useState('table') // 'table' or 'card'
  const [selectedRole, setSelectedRole] = useState(null)
  const [editingRole, setEditingRole] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewingUsers, setViewingUsers] = useState(null)

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange
  } = useDisclosure()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange
  } = useDisclosure()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange
  } = useDisclosure()
  const {
    isOpen: isUsersOpen,
    onOpen: onUsersOpen,
    onOpenChange: onUsersOpenChange
  } = useDisclosure()

  // Mock data
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      description: 'มีสิทธิ์เข้าใช้งานระบบทั้งหมด',
      userCount: 2,
      color: 'danger',
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com', avatar: null },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: null }
      ],
      permissions: {
        dashboard: true,
        users: true,
        reports: true,
        settings: true,
        roles: true
      }
    },
    {
      id: 2,
      name: 'Admin',
      description: 'จัดการระบบและผู้ใช้งาน',
      userCount: 5,
      color: 'warning',
      users: [
        {
          id: 3,
          name: 'Mike Johnson',
          email: 'mike@example.com',
          avatar: null
        },
        {
          id: 4,
          name: 'Sarah Wilson',
          email: 'sarah@example.com',
          avatar: null
        },
        { id: 5, name: 'Tom Brown', email: 'tom@example.com', avatar: null },
        { id: 6, name: 'Lisa Davis', email: 'lisa@example.com', avatar: null },
        { id: 7, name: 'Chris Lee', email: 'chris@example.com', avatar: null }
      ],
      permissions: {
        dashboard: true,
        users: true,
        reports: true,
        settings: false,
        roles: false
      }
    },
    {
      id: 3,
      name: 'Manager',
      description: 'จัดการข้อมูลและรายงาน',
      userCount: 8,
      color: 'secondary',
      users: [
        { id: 8, name: 'Alex Chen', email: 'alex@example.com', avatar: null },
        {
          id: 9,
          name: 'Maria Garcia',
          email: 'maria@example.com',
          avatar: null
        },
        { id: 10, name: 'David Kim', email: 'david@example.com', avatar: null },
        {
          id: 11,
          name: 'Emma Taylor',
          email: 'emma@example.com',
          avatar: null
        },
        {
          id: 12,
          name: 'Ryan Miller',
          email: 'ryan@example.com',
          avatar: null
        },
        {
          id: 13,
          name: 'Sophie Anderson',
          email: 'sophie@example.com',
          avatar: null
        },
        {
          id: 14,
          name: 'James Wilson',
          email: 'james@example.com',
          avatar: null
        },
        {
          id: 15,
          name: 'Olivia Moore',
          email: 'olivia@example.com',
          avatar: null
        }
      ],
      permissions: {
        dashboard: true,
        users: false,
        reports: true,
        settings: false,
        roles: false
      }
    },
    {
      id: 4,
      name: 'User',
      description: 'ผู้ใช้งานทั่วไป',
      userCount: 15,
      color: 'success',
      users: Array.from({ length: 15 }, (_, i) => ({
        id: 16 + i,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        avatar: null
      })),
      permissions: {
        dashboard: true,
        users: false,
        reports: false,
        settings: false,
        roles: false
      }
    }
  ])

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: {
      dashboard: false,
      users: false,
      reports: false,
      settings: false,
      roles: false
    }
  })

  const permissionLabels = {
    dashboard: { label: 'หน้าแรก', icon: FaHome },
    users: { label: 'จัดการผู้ใช้', icon: FaUsers },
    reports: { label: 'รายงาน', icon: IoBarChart },
    settings: { label: 'ตั้งค่าระบบ', icon: IoSettingsOutline },
    roles: { label: 'จัดการสิทธิ์', icon: FaShieldAlt }
  }

  const filteredRoles = roles.filter(
    role =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddRole = () => {
    const roleColors = ['primary', 'secondary', 'success', 'warning', 'danger']
    const newRoleData = {
      id: roles.length + 1,
      name: newRole.name,
      description: newRole.description,
      userCount: 0,
      color: roleColors[Math.floor(Math.random() * roleColors.length)],
      users: [],
      permissions: { ...newRole.permissions }
    }

    setRoles([...roles, newRoleData])
    setNewRole({
      name: '',
      description: '',
      permissions: {
        dashboard: false,
        users: false,
        reports: false,
        settings: false,
        roles: false
      }
    })
    onAddOpenChange()
  }

  const handleEditRole = () => {
    setRoles(
      roles.map(role => (role.id === editingRole.id ? editingRole : role))
    )
    onEditOpenChange()
  }

  const handleDeleteRole = () => {
    setRoles(roles.filter(role => role.id !== selectedRole.id))
    onDeleteOpenChange()
  }

  const openEditModal = role => {
    setEditingRole({ ...role })
    onEditOpen()
  }

  const openDeleteModal = role => {
    setSelectedRole(role)
    onDeleteOpen()
  }

  const openUsersModal = role => {
    setViewingUsers(role)
    onUsersOpen()
  }

  const renderPermissionIcons = permissions => {
    return (
      <div className='flex items-center gap-1'>
        {Object.entries(permissions)
          .filter(([_, enabled]) => enabled)
          .slice(0, 4)
          .map(([key, _]) => {
            const Icon = permissionLabels[key].icon
            return (
              <div
                key={key}
                className='p-1.5 bg-primary-100 text-primary-600 rounded-full'
                title={permissionLabels[key].label}
              >
                <Icon size={12} />
              </div>
            )
          })}
        {Object.values(permissions).filter(Boolean).length > 4 && (
          <div className='p-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium min-w-[24px] h-[24px] flex items-center justify-center'>
            +{Object.values(permissions).filter(Boolean).length - 4}
          </div>
        )}
      </div>
    )
  }

  // const renderPermissionCards = permissions => {
  //   return (
  //     <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
  //       {Object.entries(permissions).map(([key, enabled]) => {
  //         const Icon = permissionLabels[key].icon
  //         const mainColor = palette.colorPrimary
  //         const bg = enabled
  //           ? settings.mode === 'Dark'
  //             ? 'bg-opacity-30'
  //             : 'bg-opacity-100'
  //           : settings.mode === 'Dark'
  //           ? 'bg-zinc-800'
  //           : 'bg-gray-50'
  //         const border = enabled
  //           ? settings.mode === 'Dark'
  //             ? 'border'
  //             : 'border'
  //           : settings.mode === 'Dark'
  //           ? 'border-0'
  //           : 'border-gray-200'
  //         const text = enabled
  //           ? settings.mode === 'Dark'
  //             ? 'text-[var(--primaryGradientStart)]'
  //             : 'text-[var(--primaryGradientStart)]'
  //           : settings.mode === 'Dark'
  //           ? 'text-gray-500'
  //           : 'text-gray-400'

  //         return (
  //           <div
  //             key={key}
  //             className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${bg} ${border} ${text}`}
  //             style={
  //               enabled
  //                 ? {
  //                     background:
  //                       settings.mode === 'Dark'
  //                         ? 'rgba(80, 80, 80, 0.15)'
  //                         : 'rgba(80, 80, 80, 0.05)',
  //                     borderColor: mainColor,
  //                     color: mainColor
  //                   }
  //                 : undefined
  //             }
  //           >
  //             <Icon size={16} />
  //             <span className='text-xs font-medium'>
  //               {permissionLabels[key].label}
  //             </span>
  //           </div>
  //         )
  //       })}
  //     </div>
  //   )
  // }

  const renderPermissionCards = permissions => {
    return (
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
        {Object.entries(permissions).map(([key, enabled]) => {
          const Icon = permissionLabels[key].icon
          const mainColor = palette.colorPrimary

          return (
            <div
              key={key}
              className={`flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 ${
                enabled
                  ? 'border'
                  : settings.mode === 'Dark'
                  ? 'bg-zinc-900/50 border-zinc-700/50'
                  : 'bg-gray-100/50 border-gray-300/50'
              }`}
              style={
                enabled
                  ? {
                      background:
                        settings.mode === 'Dark'
                          ? 'rgba(80, 80, 80, 0.15)'
                          : 'rgba(80, 80, 80, 0.05)',
                      borderColor: mainColor,
                      color: mainColor
                    }
                  : {
                      opacity: 1,
                      filter: 'grayscale(0.6)',
                      color: settings.mode === 'Dark' ? '#6b7280' : '#9ca3af'
                    }
              }
            >
              <Icon
                size={16}
                className={
                  !enabled
                    ? settings.mode === 'Dark'
                      ? 'opacity-50'
                      : 'opacity-40'
                    : ''
                }
              />
              <span
                className={`text-xs font-medium ${
                  !enabled ? 'opacity-70' : ''
                }`}
              >
                {permissionLabels[key].label}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  const renderTableView = () => (
    <Table aria-label='Roles table'>
      <TableHeader>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>DESCRIPTION</TableColumn>
        <TableColumn>USERS</TableColumn>
        <TableColumn>PERMISSIONS</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {filteredRoles.map(role => (
          <TableRow key={role.id}>
            <TableCell>
              <div className='flex items-center gap-2'>
                <Chip color={role.color} variant='flat'>
                  {role.name}
                </Chip>
              </div>
            </TableCell>
            <TableCell>
              <p className='text-sm text-gray-600'>{role.description}</p>
            </TableCell>
            <TableCell>
              <Button
                size='sm'
                variant='flat'
                color='default'
                startContent={<FaUsers />}
                onPress={() => openUsersModal(role)}
              >
                {role.userCount} คน
              </Button>
            </TableCell>
            <TableCell>{renderPermissionIcons(role.permissions)}</TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <Button
                  isIconOnly
                  size='sm'
                  variant='light'
                  onPress={() => openEditModal(role)}
                >
                  <EditIcon />
                </Button>
                <Button
                  isIconOnly
                  size='sm'
                  variant='light'
                  color='danger'
                  onPress={() => openDeleteModal(role)}
                >
                  <DeleteIcon />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const renderCardView = () => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {filteredRoles.map(role => (
        <Card key={role.id} className='w-full'>
          <CardHeader className='flex gap-3 justify-between'>
            <div className='flex gap-3 items-center'>
              <Chip color={role.color} variant='flat'>
                {role.name}
              </Chip>

              <Button
                size='sm'
                variant='flat'
                color='default'
                startContent={<FaUsers />}
                onPress={() => openUsersModal(role)}
              >
                {role.userCount} คน
              </Button>
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size='sm' variant='light'>
                  <IoSettingsOutline />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key='edit'
                  startContent={<EditIcon />}
                  onPress={() => openEditModal(role)}
                >
                  แก้ไข
                </DropdownItem>
                <DropdownItem
                  key='delete'
                  color='danger'
                  startContent={<DeleteIcon />}
                  onPress={() => openDeleteModal(role)}
                >
                  ลบ
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardHeader>
          <CardBody className='px-3 py-0 text-small text-default-400'>
            <p className='mb-4 text-gray-600'>{role.description}</p>

            <div className='mb-4'>
              <p className='text-sm font-medium text-default-700 mb-3'>
                สิทธิ์การเข้าใช้งาน:
              </p>
              {renderPermissionCards(role.permissions)}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )

  return (
    <div className='max-w-7xl mx-auto'>
      {/* Header */}
      <p className=' mb-6 '>จัดการ Role และสิทธิ์การเข้าใช้งานระบบ</p>

      {/* Controls */}
      <div className='flex justify-between gap-3 items-center  mb-6'>
        <Input
          className='w-full sm:max-w-[44%]'
          placeholder='ค้นหา Role...'
          startContent={<IoIosSearch />}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          classNames={{
            label: 'text-black/50 dark:text-white/90',
            input: [
              'bg-white',
              'text-black/90 dark:text-white/90',
              'placeholder:text-default-700/50 dark:placeholder:text-white/60'
            ],
            inputWrapper: [
              'bg-white',
              'hover:bg-white',
              'group-data-[focus=true]:bg-white',
              'dark:bg-zinc-700',
              'dark:hover:bg-zinc-700',
              'dark:group-data-[focus=true]:bg-zinc-700',
              '!cursor-text'
            ]
          }}
        />

        <div className='flex items-center gap-3 rounded-lg'>
          <div className='hidden sm:flex'>
            <Button
              size='sm'
              variant={viewMode === 'table' ? 'solid' : 'light'}
              isIconOnly
              onPress={() => setViewMode('table')}
            >
              <FaListUl />
            </Button>
            <Button
              size='sm'
              variant={viewMode === 'card' ? 'solid' : 'light'}
              isIconOnly
              onPress={() => setViewMode('card')}
            >
              <IoGridOutline />
            </Button>
          </div>
          <Button color='primary' startContent={<FaPlus />} onPress={onAddOpen}>
            เพิ่ม Role
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <div className=''>{renderTableView()}</div>
      ) : (
        <div className=''>{renderCardView()}</div>
      )}

      {/* View Users Modal */}
      <Modal
        isOpen={isUsersOpen}
        onOpenChange={onUsersOpenChange}
        size='3xl'
        scrollBehavior='inside'
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                <div className='flex items-center gap-3'>
                  <Chip color={viewingUsers?.color} variant='flat'>
                    {viewingUsers?.name}
                  </Chip>
                  <span className='text-sm text-gray-500'>
                    ({viewingUsers?.userCount} คน)
                  </span>
                </div>
              </ModalHeader>
              <ModalBody>
                {viewingUsers?.users?.length > 0 ? (
                  <div className='space-y-3'>
                    {viewingUsers.users.map(user => (
                      <div
                        key={user.id}
                        className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                      >
                        <Avatar size='md' name={user.name} src={user.avatar} />
                        <div className='flex-1'>
                          <p className='font-medium text-gray-900'>
                            {user.name}
                          </p>
                          <p className='text-sm text-gray-500'>{user.email}</p>
                        </div>
                        <div className='flex gap-2'>
                          <Button size='sm' variant='light'>
                            <EditIcon />
                          </Button>
                          <Button size='sm' variant='light' color='danger'>
                            <DeleteIcon />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-8 text-gray-500'>
                    <FaUsers size={48} className='mx-auto mb-4 opacity-30' />
                    <p>ไม่มีผู้ใช้งานใน Role นี้</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color='primary' onPress={onClose}>
                  ปิด
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Add Role Modal */}
      <Modal isOpen={isAddOpen} onOpenChange={onAddOpenChange} size='2xl'>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                เพิ่ม Role ใหม่
              </ModalHeader>
              <ModalBody>
                <div className='space-y-4'>
                  <Input
                    label='ชื่อ Role'
                    placeholder='กรอกชื่อ Role'
                    value={newRole.name}
                    onChange={e =>
                      setNewRole({ ...newRole, name: e.target.value })
                    }
                  />
                  <Textarea
                    label='คำอธิบาย'
                    placeholder='กรอกคำอธิบาย Role'
                    value={newRole.description}
                    onChange={e =>
                      setNewRole({ ...newRole, description: e.target.value })
                    }
                  />

                  <div>
                    <p className='text-sm font-medium mb-3'>
                      สิทธิ์การเข้าใช้งาน:
                    </p>
                    <div className='space-y-3'>
                      {Object.entries(permissionLabels).map(
                        ([key, { label, icon: Icon }]) => (
                          <div
                            key={key}
                            className='flex items-center justify-between p-3 border rounded-lg'
                          >
                            <div className='flex items-center gap-3'>
                              <Icon className='text-gray-500' />
                              <span>{label}</span>
                            </div>
                            <Switch
                              isSelected={newRole.permissions[key]}
                              onValueChange={value =>
                                setNewRole({
                                  ...newRole,
                                  permissions: {
                                    ...newRole.permissions,
                                    [key]: value
                                  }
                                })
                              }
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  ยกเลิก
                </Button>
                <Button color='primary' onPress={handleAddRole}>
                  เพิ่ม Role
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Edit Role Modal */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange} size='2xl'>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                แก้ไข Role
              </ModalHeader>
              <ModalBody>
                {editingRole && (
                  <div className='space-y-4'>
                    <Input
                      label='ชื่อ Role'
                      placeholder='กรอกชื่อ Role'
                      value={editingRole.name}
                      onChange={e =>
                        setEditingRole({ ...editingRole, name: e.target.value })
                      }
                    />
                    <Textarea
                      label='คำอธิบาย'
                      placeholder='กรอกคำอธิบาย Role'
                      value={editingRole.description}
                      onChange={e =>
                        setEditingRole({
                          ...editingRole,
                          description: e.target.value
                        })
                      }
                    />

                    <div>
                      <p className='text-sm font-medium mb-3'>
                        สิทธิ์การเข้าใช้งาน:
                      </p>
                      <div className='space-y-3'>
                        {Object.entries(permissionLabels).map(
                          ([key, { label, icon: Icon }]) => (
                            <div
                              key={key}
                              className='flex items-center justify-between p-3 border rounded-lg'
                            >
                              <div className='flex items-center gap-3'>
                                <Icon className='text-gray-500' />
                                <span>{label}</span>
                              </div>
                              <Switch
                                isSelected={editingRole.permissions[key]}
                                onValueChange={value =>
                                  setEditingRole({
                                    ...editingRole,
                                    permissions: {
                                      ...editingRole.permissions,
                                      [key]: value
                                    }
                                  })
                                }
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  ยกเลิก
                </Button>
                <Button color='primary' onPress={handleEditRole}>
                  บันทึก
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                ยืนยันการลบ
              </ModalHeader>
              <ModalBody>
                <p>
                  คุณต้องการลบ Role &quot;{selectedRole?.name}&quot; ใช่หรือไม่?
                  การดำเนินการนี้ไม่สามารถย้อนกลับได้
                </p>
                {selectedRole?.userCount > 0 && (
                  <div className='bg-warning-50 border border-warning-200 rounded-lg p-3 mt-3'>
                    <p className='text-warning-700 text-sm'>
                      ⚠️ Role นี้มีผู้ใช้งาน {selectedRole.userCount} คน
                      ผู้ใช้งานเหล่านี้จะไม่มี Role หลังจากลบ
                    </p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onPress={onClose}>
                  ยกเลิก
                </Button>
                <Button color='danger' onPress={handleDeleteRole}>
                  ลบ Role
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ViewRoles
