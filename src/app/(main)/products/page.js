'use client'
import React, { Suspense } from 'react'
import FormProducts from '@/views/products'
import LoadingProductsPage from './loading'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'

const Products = () => {
  useSetPageTitle('Product Management')
  return (
    <Suspense fallback={<LoadingProductsPage />}>
      <FormProducts />
    </Suspense>
  )
}

export default Products
