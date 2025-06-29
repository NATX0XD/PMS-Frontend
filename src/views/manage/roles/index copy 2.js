'use client'
import { DeleteIcon } from '@/components/icon/DeleteIcon'
import { EditIcon } from '@/components/icon/EditIcon'
import { EyeIcon } from '@/components/icon/EyeIcon'
import {
  Accordion,
  AccordionItem,
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
import { BiSearch } from 'react-icons/bi'
import { FaHome, FaListUl, FaPlus, FaShieldAlt, FaUsers } from 'react-icons/fa'
import { IoIosSearch } from 'react-icons/io'
import { IoBarChart, IoGridOutline, IoSettingsOutline } from 'react-icons/io5'

const ViewRoles = () => {
  const [viewMode, setViewMode] = useState('table') // 'table' or 'card'
  const [selectedRole, setSelectedRole] = useState(null)
  const [editingRole, setEditingRole] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

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
      color: 'primary',
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

  const renderPermissions = permissions => {
    return Object.entries(permissions)
      .filter(([_, enabled]) => enabled)
      .map(([key, _]) => (
        <Chip key={key} size='sm' variant='flat' color='primary'>
          {permissionLabels[key].label}
        </Chip>
      ))
  }

  const renderUserList = users => {
    return (
      <div className='space-y-2'>
        {users.slice(0, 5).map(user => (
          <div
            key={user.id}
            className='flex items-center gap-3 p-2 bg-gray-50 rounded-lg'
          >
            <Avatar size='sm' name={user.name} src={user.avatar} />
            <div className='flex-1'>
              <p className='text-sm font-medium'>{user.name}</p>
              <p className='text-xs text-gray-500'>{user.email}</p>
            </div>
          </div>
        ))}
        {users.length > 5 && (
          <p className='text-sm text-gray-500 text-center py-2'>
            และอีก {users.length - 5} คน
          </p>
        )}
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
              <Chip color='default' variant='flat' startContent={<FaUsers />}>
                {role.userCount}
              </Chip>
            </TableCell>
            <TableCell>
              <div className='flex flex-wrap gap-1'>
                {renderPermissions(role.permissions).slice(0, 2)}
                {Object.values(role.permissions).filter(Boolean).length > 2 && (
                  <Chip size='sm' variant='flat' color='default'>
                    +
                    {Object.values(role.permissions).filter(Boolean).length - 2}
                  </Chip>
                )}
              </div>
            </TableCell>
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
              <Chip color='default' variant='flat' startContent={<FaUsers />}>
                {role.userCount}
              </Chip>
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
            <p className='mb-4'>{role.description}</p>

            <div className='mb-4'>
              <p className='text-sm font-medium text-default-700 mb-2'>
                สิทธิ์การเข้าใช้งาน:
              </p>
              <div className='flex flex-wrap gap-1'>
                {renderPermissions(role.permissions)}
              </div>
            </div>

            <Accordion variant='light'>
              <AccordionItem
                key='users'
                aria-label='Users in this role'
                title={
                  <div className='flex items-center gap-2'>
                    <EyeIcon />
                    <span>ดูผู้ใช้งานใน Role นี้</span>
                  </div>
                }
              >
                {renderUserList(role.users)}
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>
      ))}
    </div>
  )

  return (
    <div className='max-w-7xl mx-auto'>
      {/* Header */}
      <p className=' mb-6 '>จัดการ Role และสิทธิ์การเข้าใช้งานระบบ</p>

      {/* Header */}
      <div className='flex justify-between gap-3 items-center  mb-6'>
        <Input
          // isClearable
          className='w-full sm:max-w-[44%]'
          placeholder='ค้นหา Role...'
          startContent={<IoIosSearch />}
          value={searchTerm}
          // onClear={() => onClearSearch()}
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
