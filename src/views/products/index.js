'use client'
import TableQuery from '@/components/TableQuery'
import ColumnsTableProducts from '@/configurations/columns/ColumnsTableProducts'
import { addToast, useDisclosure } from '@heroui/react'
import { useAsyncList } from '@react-stately/data'
import React, { useState } from 'react'
import ModalAddProduct from './ModalAddProduct'
import { productController } from '@/api/controllers/products'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const FormProducts = props => {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(true)
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange
  } = useDisclosure()

  // //findAll
  // const { data: productData, isFetching: isFetchingProducts} = useQuery(
  //   ['products'],
  //   () => productController(props).findAll()
  // )
  // //deletee
  // const { mutate: deleteProduct } = useMutation(
  //   productController(props).delete,
  //   {
  //     onSuccess: () => {
  //       addToast({
  //         title: 'ลบสินค้าเรียบร้อยแล้ว',
  //         timeout: 3000,
  //         shouldShowTimeoutProgress: true,
  //         color: 'success'
  //       })
  //       queryClient.invalidateQueries(['products']) // reload data
  //     },
  //     onError: () => {
  //       message.error({ content: 'ลบสินค้าไม่สำเร็จ' })
  //       addToast({
  //         title: 'ลบสินค้าไม่สำเร็จ',
  //         timeout: 3000,
  //         shouldShowTimeoutProgress: true,
  //         color: 'danger'
  //       })
  //     }
  //   }
  // )
  // //edit
  // const { mutate: updateProduct } = useMutation(
  //   productController(props).update,
  //   {
  //     onSuccess: () => {
  //       addToast({
  //         title: 'อัปเดตสินค้าเรียบร้อยแล้ว',
  //         timeout: 3000,
  //         shouldShowTimeoutProgress: true,
  //         color: 'success'
  //       })
  //       queryClient.invalidateQueries(['products'])
  //     },
  //     onError: () => {
  //       addToast({
  //         title: 'อัปเดตสินค้าไม่สำเร็จ',
  //         timeout: 3000,
  //         shouldShowTimeoutProgress: true,
  //         color: 'danger'
  //       })
  //     }
  //   }
  // )

  let list = useAsyncList({
    async load ({ signal }) {
      let res = await fetch('https://dummyjson.com/products', {
        signal
      })
      let json = await res.json()

      setIsLoading(false)

      return {
        items: json.products
      }
    },
    async sort ({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column]
          let second = b[sortDescriptor.column]
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

          if (sortDescriptor.direction === 'descending') {
            cmp *= -1
          }

          return cmp
        })
      }
    }
  })
  return (
    <>
      <TableQuery
        sorting={list}
        isLoading={isLoading}
        titleTable='Products List'
        columns={ColumnsTableProducts}
        onClickCreate={onModalOpen}
        // queryFunction={() => productData || { data: [] }}
        // isLoading={isFetchingProducts}
        // updateFunction={productController(props).update}
        // deleteFunction={productController(props).delete}
        // height="200px"
      />
      <ModalAddProduct
        isModalOpen={isModalOpen}
        onModalOpen={onModalOpen}
        onModalOpenChange={onModalOpenChange}
      />
    </>
  )
}

export default FormProducts
