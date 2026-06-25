'use client'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import TopLoader from '@/app/_components/TopLoader/page'
import { addToCart } from '@/app/_redux/slices/cartSlice'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { toast } from 'react-toastify'

const fetchCategoryData = async (category: string) => {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
  )
  if (!response.ok) throw new Error('Failed to fetch data')
  return response.json()
}

const categoryEnum: Record<string, string> = {
  men: "men's clothing",
  women: "women's clothing",
  jewelery: 'jewelery',
  electronics: 'electronics',
}

const CategoryProducts: React.FC = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { category } = params

  const categoryToFetch = categoryEnum[category as keyof typeof categoryEnum]

  const { data, isLoading, isError } = useQuery(
    ['categoryData', categoryToFetch],
    () => fetchCategoryData(categoryToFetch),
  )

  if (isLoading) return <TopLoader />
  if (isError) return <div className="flex items-center justify-center h-64 text-gray-500">Error fetching data.</div>

  const handleAddToCart = (
    e: { preventDefault: () => void; stopPropagation: () => void },
    product: any,
  ) => {
    e.stopPropagation()
    e.preventDefault()
    toast.success('Added to cart')
    dispatch(addToCart({ item: product, quantity: 1 }))
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-700 capitalize font-medium">{categoryToFetch}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 capitalize mb-10">
          {categoryToFetch}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {data.map((product: any) => (
            <Link
              key={product.id}
              href={`${category}/${product.id}`}
              className="group flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-50 mb-3">
                <Image
                  fill
                  src={product.image}
                  alt={product.title}
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-sm text-gray-700 line-clamp-2 mb-1 leading-snug">
                  {product.title}
                </h3>
                <p className="text-base font-bold text-gray-900 mt-auto mb-3">
                  ₹{(product.price * 10).toFixed(0)}
                </p>
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 active:scale-95 transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryProducts
