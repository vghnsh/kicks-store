'use client'
import React from 'react'
import { StarIcon, ShoppingBagIcon } from '@heroicons/react/20/solid'
import { useQuery } from 'react-query'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import TopLoader from '@/app/_components/TopLoader/page'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/app/_redux/slices/cartSlice'
import { toast } from 'react-toastify'
import Link from 'next/link'

const fetchProductData = async (id: string) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!response.ok) throw new Error('Failed to fetch data')
  return response.json()
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Product = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { product, category } = params

  const { data, isLoading } = useQuery(['productData', product], () =>
    fetchProductData(product as string),
  )

  if (isLoading) return <TopLoader />

  const handleAddToCart = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    dispatch(addToCart({ item: data, quantity: 1 }))
    toast.success('Added to cart')
  }

  const ratingRate = data?.rating?.rate ?? 0
  const ratingCount = data?.rating?.count ?? 0

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/categories/${category}`} className="hover:text-gray-600 transition-colors capitalize">
            {category}
          </Link>
          <span>/</span>
          <span className="text-gray-700 font-medium line-clamp-1">{data?.title}</span>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-square w-full max-w-lg mx-auto lg:mx-0 rounded-3xl bg-gray-50 overflow-hidden mb-10 lg:mb-0">
            <Image
              fill
              src={data?.image}
              alt={data?.title}
              className="object-contain p-10"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 capitalize">
              {category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-4">
              {data?.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon
                    key={i}
                    className={classNames(
                      ratingRate > i ? 'text-amber-400' : 'text-gray-200',
                      'h-4 w-4',
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{ratingRate} · {ratingCount} reviews</span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="text-4xl font-bold text-gray-900">
                ₹{data?.price ? (data.price * 10).toFixed(0) : '—'}
              </p>
              <p className="text-sm text-gray-400 mt-1">Inclusive of all taxes</p>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">About this item</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{data?.description}</p>
            </div>

            {/* CTA */}
            <div className="mt-auto space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 active:scale-[0.98] transition-all"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                Add to Bag
              </button>
              <Link
                href="/cart"
                className="block w-full text-center py-4 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
