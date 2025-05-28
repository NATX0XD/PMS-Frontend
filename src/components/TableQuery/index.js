'use client'

import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  getKeyValue,
  Image,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
  User,
  Input
} from '@heroui/react'
import React, { useCallback, useMemo, useState } from 'react'
import { FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa'
import { IoEllipsisVertical } from 'react-icons/io5'
import { EyeIcon } from '../icon/EyeIcon'
import { DeleteIcon } from '../icon/DeleteIcon'
import { EditIcon } from '../icon/EditIcon'
import ConfirmModal from '../ConfirmModal'
import TableModalAction from '../TableModalAction'
import { IoIosSearch } from 'react-icons/io'

export function capitalize (s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : ''
}

const TableQuery = ({
  titleTable,
  dataAll = [],
  isLoading = false,
  columns = null,
  height,
  isModalAction = true,
  inputItemsModal = null,
  ModalTitle = null,
  createFunction = null,
  queryFunction = null,
  updateFunction = null,
  deleteFunction = null,
  searchField = 'name',
  searchPlaceholder = 'Search',
  initialVisibleColumns = ['actions'],
  actionButton = true,
  renderActionButton = null,
  searchBar = true,
  columnsFilter = true,
  isTopContent = true,
  isBottomContent = true,
  renderTopContent = null,
  renderBottomContent = null,
  statusColorMap = null,
  statusMapKey = null
}) => {
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null)
  const {
    isOpen: isConfirmModal,
    onOpen: openConfirmModal,
    onClose: closeConfirmModal
  } = useDisclosure()
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange
  } = useDisclosure()
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState(new Set([]))
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(initialVisibleColumns)
  )
  const [statusFilter, setStatusFilter] = useState('all')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'age',
    direction: 'ascending'
  })
  const [page, setPage] = useState(1)
  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter(
      column =>
        Array.from(visibleColumns).includes(column.key) ||
        column.key === 'actions'
    )
  }, [visibleColumns, columns])

  const filteredItems = React.useMemo(() => {
    let filteredData = [...dataAll]

    if (hasSearchFilter) {
      filteredData = filteredData.filter(item =>
        ((item[searchField] || '') + '')
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      )
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredData = filteredData.filter(user =>
        Array.from(statusFilter).includes(user.status)
      )
    }

    return filteredData
  }, [dataAll, hasSearchFilter, statusFilter, searchField, filterValue])

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column]
      const second = b[sortDescriptor.column]
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = useCallback(
    (item, columnKey) => {
      const column = columns.find(col => col.key === columnKey)
      const cellValue = item[columnKey]
      if (!column) return cellValue

      switch (column.type) {
        case 'profile':
          return (
            <User
              avatarProps={{ radius: 'lg', src: cellValue }}
              description={item.email}
              name={`${item.firstName} ${item.lastName}`}
            ></User>
          )
        case 'image':
          return (
            <Image
              src={cellValue}
              alt={item.title || 'product image'}
              className='w-10 h-10 object-cover rounded'
            />
          )
        case 'chip':
          return (
            <div className='flex gap-2 flex-wrap'>
              {(Array.isArray(cellValue) ? cellValue : [cellValue]).map(
                (tag, idx) => (
                  <Chip
                    key={idx}
                    className='capitalize'
                    color={
                      statusColorMap && statusMapKey
                        ? statusColorMap[item[statusMapKey]] || 'secondary'
                        : 'secondary'
                    }
                    size='sm'
                    variant='flat'
                  >
                    {tag}
                  </Chip>
                )
              )}
            </div>
          )
        case 'actions':
          return (
            <div className='relative flex items-center gap-2'>
              <span
                // onClick={}
                className='text-lg text-default-400 cursor-pointer active:opacity-50'
              >
                <EyeIcon />
              </span>

              <span // onClick={}
                className='text-lg text-default-400 cursor-pointer active:opacity-50'
              >
                <EditIcon />
              </span>

              <span
                onClick={() => {
                  setSelectedItemToDelete({
                    name: [item[searchField]],
                    id: item.id
                  })
                  openConfirmModal()
                }}
                className='text-lg text-danger cursor-pointer  active:opacity-50'
              >
                <DeleteIcon />
              </span>
            </div>
          )
        default:
          return cellValue
      }
    },
    [columns]
  )
  const handleDelete = (name, id) => {
    closeConfirmModal()
    console.log('Delete item:', name, id)
  }

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onRowsPerPageChange = React.useCallback(e => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const onSearchChange = React.useCallback(value => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = React.useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const topContent = React.useMemo(() => {
    return isTopContent ? (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          {searchBar ? (
            <Input
              isClearable
              className='w-full sm:max-w-[44%]'
              placeholder={searchPlaceholder}
              startContent={<IoIosSearch />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
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
          ) : null}
          <div className='flex gap-3'>
            {columnsFilter ? (
              <Dropdown>
                <DropdownTrigger className='hidden sm:flex'>
                  <Button endContent={<FaChevronDown />} variant='flat'>
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label='Table Columns'
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode='multiple'
                  onSelectionChange={setVisibleColumns}
                >
                  {columns
                    .filter(column => column.key !== 'actions')
                    .map(column => (
                      <DropdownItem key={column.key} className='capitalize'>
                        {capitalize(column.label)}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            ) : null}
            {actionButton ? (
              <Button
                color='primary'
                size='md'
                endContent={<FaPlus />}
                onPress={onModalOpen}
              >
                Add New
              </Button>
            ) : (
              renderActionButton
            )}
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>
            Total {dataAll.length}
          </span>
          <label className='flex items-center text-default-400 text-small'>
            Rows per page:
            <select
              className='bg-transparent outline-none text-default-400 text-small'
              defaultValue={rowsPerPage}
              onChange={onRowsPerPageChange}
            >
              <option value='10'>10</option>
              <option value='15'>15</option>
              <option value='20'>20</option>
            </select>
          </label>
        </div>
      </div>
    ) : (
      renderTopContent
    )
  }, [
    isTopContent,
    searchBar,
    searchPlaceholder,
    filterValue,
    onSearchChange,
    columnsFilter,
    visibleColumns,
    columns,
    actionButton,
    onModalOpen,
    renderActionButton,
    dataAll.length,
    rowsPerPage,
    onRowsPerPageChange,
    renderTopContent,
    onClear
  ])

  const bottomContent = React.useMemo(() => {
    return isBottomContent ? (
      <div className='py-2 px-2 flex justify-between items-center'>
        <span className='w-[30%] text-small text-default-400'>
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={page === 1}
            size='sm'
            variant='flat'
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={page === pages}
            size='sm'
            variant='flat'
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    ) : (
      renderBottomContent
    )
  }, [
    isBottomContent,
    selectedKeys,
    filteredItems.length,
    page,
    pages,
    onPreviousPage,
    onNextPage,
    renderBottomContent
  ])

  return (
    <>
      <ConfirmModal
        isOpen={isConfirmModal}
        onOpenChange={closeConfirmModal}
        contentHeader={'ยืนยันการลบ '}
        contentBody={
          <>
            <span className='font-bold text-danger-600 dark:text-danger-400  px-1.5 py-0.5 rounded-md'>
              {selectedItemToDelete?.name}
            </span>{' '}
            <span className='block mt-2 text-gray-500 dark:text-gray-400 text-xs'>
              การลบจะเป็นการถาวรและไม่สามารถกู้คืนได้
            </span>
          </>
        }
        contentButtonCancel={'ยกเลิก'}
        contentButtonOk={'ลบ'}
        onPressButtonCancel={closeConfirmModal}
        onPressButtonOk={() =>
          handleDelete(selectedItemToDelete?.name, selectedItemToDelete?.id)
        }
        iconConfirm={<FaTrash className='text-red-500 text-xl' />}
      />
      {isModalAction ? (
        <TableModalAction
          isModalOpen={isModalOpen}
          onModalOpenChange={onModalOpenChange}
          inputItemsModal={inputItemsModal}
          ModalTitle={ModalTitle}
          actionFunction={createFunction}
        />
      ) : null}

      <div className='flex flex-col h-full  w-full min-h-0'>
        <div className='flex-shrink-0'>{topContent}</div>
        <div className='flex-grow min-h-0 overflow-hidden pt-1 pb-2'>
          <Table
            isHeaderSticky
            aria-label={titleTable}
            selectedKeys={selectedKeys}
            selectionMode='multiple'
            onSelectionChange={setSelectedKeys}
            color='primary'
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            // onRowAction={key => {
            //   const selectedItem = sortedItems.find(item => item.id === key)
            //   console.log(selectedItem)
            //   alert(
            //     `Opening item ${key}... ${selectedItem?.firstName || 'Unknown'}`
            //   )
            // }}

            className='h-full w-full overflow-x-auto'
            classNames={{
              wrapper: 'h-full ',
              // tr: 'data-[selected=true]:bg-primary/60 data-[selected=true]:text-white',
              td: 'data-[selected=true]:font-bold'
            }}
          >
            <TableHeader columns={headerColumns}>
              {column => (
                <TableColumn
                  key={column.key}
                  minWidth={column.width || '20px'}
                  // style={column.width ? { width: column.width } : {}}
                  // allowsSorting
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={sortedItems}
              isLoading={isLoading}
              loadingContent={<Spinner label='Loading...' />}
              emptyContent={'No Data found'}
            >
              {item => (
                <TableRow key={item.name}>
                  {columnKey => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex-shrink-0'>{bottomContent}</div>
      </div>
    </>
  )
}

export default TableQuery
