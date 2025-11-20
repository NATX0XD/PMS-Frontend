'use client'
import React, { Suspense } from 'react'
import LoadingProductsPage from './loading'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'
import ViewProducts from '@/views/products'

const Products = () => {
  useSetPageTitle('Product Management')
  return (
    <Suspense fallback={<LoadingProductsPage />}>
      <ViewProducts />
    </Suspense>
  )
}

export default Products
