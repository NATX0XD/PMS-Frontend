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
  User
} from '@heroui/react'
import { Input } from 'postcss'
import React, { useCallback, useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoEllipsisVertical } from 'react-icons/io5'
import { EyeIcon } from '../icon/EyeIcon'
import { DeleteIcon } from '../icon/DeleteIcon'
import { EditIcon } from '../icon/EditIcon'

const TableQuery = ({
  titleTable,
  sorting,
  isLoading,
  columns,
  height,
  onClickCreate,

  queryFunction,
  updateFunction,
  deleteFunction
}) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]))
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const pages = Math.ceil(sorting.items.length / rowsPerPage)

  const itemsRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return sorting.items.slice(start, end)
  }, [page, sorting, rowsPerPage])

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])
  const onRowsPerPageChange = useCallback(e => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const onSearchChange = useCallback(value => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const renderCell = useCallback(
    (item, columnKey) => {
      const column = columns.find(col => col.key === columnKey)
      const cellValue = item[columnKey]
      if (!column) return cellValue

      switch (column.type) {
        case 'users':
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
                  <Chip key={idx} color='primary' size='sm'>
                    {tag}
                  </Chip>
                )
              )}
            </div>
          )
        case 'actions':
          return (
            // <div className="relative flex justify-end items-center gap-2">
            //   <Dropdown className="min-w-[120px]">
            //     <DropdownTrigger>
            //       <Button isIconOnly size="sm" variant="light">
            //         <IoEllipsisVertical />
            //       </Button>
            //     </DropdownTrigger>
            //     <DropdownMenu>
            //       <DropdownItem key="view">View</DropdownItem>
            //       <DropdownItem key="edit">Edit</DropdownItem>
            //       <DropdownItem key="delete">Delete</DropdownItem>
            //     </DropdownMenu>
            //   </Dropdown>
            // </div>
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
                // onClick={}
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
  const topContent = useMemo(() => {
    return (
      <div className='flex flex-col gap-4 '>
        <div className='flex justify-between gap-3 items-center'>
          <h1 className='text-xl font-bold p-2'>
            {' '}
            {titleTable}{' '}
            {selectedKeys.size > 0 || selectedKeys === 'all' ? (
              <span className='w-[30%] text-small text-default-400'>
                {selectedKeys === 'all'
                  ? 'All items selected'
                  : `${selectedKeys.size} of ${sorting.items.length} selected`}
              </span>
            ) : (
              <span className='text-default-400 text-small'>
                Total {sorting.items.length}
              </span>
            )}
          </h1>
          <Button
            color='primary'
            size='sm'
            endContent={<FaPlus />}
            onPress={onClickCreate}
          >
            Add New
          </Button>
        </div>
      </div>
    )
  }, [selectedKeys, sorting.items.length, page, pages, onRowsPerPageChange])

  const bottomContent = useMemo(() => {
    return (
      <div className='flex justify-between items-center'>
        {pages > 0 ? (
          <>
            <Pagination
              isCompact
              showControls
              showShadow
              color='primary'
              page={page}
              total={pages}
              onChange={setPage}
            />
          </>
        ) : null}

        {pages > 0 ? (
          <>
            <div className='hidden sm:flex w-[30%] justify-end gap-2'>
              <label className='flex items-center text-default-400 text-small'>
                Rows per page:
                {/* <Select
              className="max-w-xs"
              size="sm"
              selectedKeys={new Set([rowsPerPage.toString()])}
              variant="bordered"
              onSelectionChange={onRowsPerPageChange}
            >
              <SelectItem key="5">5</SelectItem>
              <SelectItem key="10">10</SelectItem>
              <SelectItem key="15">15</SelectItem>
            </Select> */}
                <select
                  className='bg-transparent outline-none text-default-400 text-small'
                  defaultValue={rowsPerPage}
                  // value={rowsPerPage}
                  onChange={onRowsPerPageChange}
                >
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='15'>15</option>
                </select>
              </label>
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
          </>
        ) : null}
      </div>
    )
  }, [selectedKeys, sorting.items.length, page, pages, onRowsPerPageChange])

  return (
    <>
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
            sortDescriptor={sorting.sortDescriptor}
            onSortChange={sorting.sort}
            // onRowAction={key => {
            //   const selectedItem = itemsRows.find(item => item.id === key)
            //   console.log(selectedItem)
            //   alert(
            //     `Opening item ${key}... ${selectedItem?.firstName || 'Unknown'}`
            //   )
            // }}
            className='h-full w-full overflow-x-auto'
            classNames={{ wrapper: 'h-full ' }}
          >
            <TableHeader columns={columns}>
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
              items={itemsRows}
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
