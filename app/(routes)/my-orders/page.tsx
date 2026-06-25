'use client'
import { DateTime } from 'luxon'
import { db } from '@/app/_firebase/config'
import { selectUser } from '@/app/_redux/slices/userSlice'
import { collection, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import TopLoader from '@/app/_components/TopLoader/page'
import Link from 'next/link'

type OrderItem = {
  title: string
  image: string
  price: number
  quantity: number
}

type Order = {
  items: OrderItem[]
  amount: number
  address: string
  paymentId: string
  time: number
}

const fetchOrders = async (userId: string): Promise<Order[]> => {
  const ordersCollection = collection(db, 'users', userId, 'orders')
  const snapshot = await getDocs(ordersCollection)
  return snapshot.docs.map((doc) => doc.data() as Order)
}

const Page = () => {
  const user = useSelector(selectUser)
  const userId = user?.id?.toString() || ''

  const { data: orders, isLoading } = useQuery(
    ['orders', userId],
    () => fetchOrders(userId),
    { enabled: !!userId },
  )

  if (isLoading) return <TopLoader />

  const sortedOrders = orders?.slice().sort((a, b) => b.time - a.time)

  if (!sortedOrders?.length) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-6xl">📦</div>
        <h2 className="text-2xl font-bold text-gray-900">No orders yet</h2>
        <p className="text-gray-500 text-sm">Your past orders will appear here.</p>
        <Link
          href="/"
          className="mt-4 px-8 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        <div className="space-y-6">
          {sortedOrders.map((order) => (
            <div key={order.paymentId} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-5 sm:px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Order</p>
                  <p className="text-sm font-mono font-medium text-gray-700">{order.paymentId}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Placed</p>
                  <p className="text-sm text-gray-700">
                    {order.time
                      ? DateTime.fromSeconds(order.time).toFormat('dd MMM yyyy, HH:mm')
                      : ''}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 sm:px-6 py-4">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-xl bg-gray-50 overflow-hidden">
                      <Image
                        fill
                        src={item.image}
                        alt={item.title}
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 flex-shrink-0">
                      ₹{(item.price * item.quantity).toFixed(0)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 sm:px-6 py-4 border-t border-gray-100 flex flex-wrap items-end justify-between gap-2">
                <div className="max-w-xs">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Ship to</p>
                  <p className="text-sm text-gray-700">{order.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Total paid</p>
                  <p className="text-lg font-bold text-gray-900">₹{Math.round(order.amount).toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
