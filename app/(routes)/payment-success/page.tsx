'use client'
import { clearCart } from '@/app/_redux/slices/cartSlice'
import { db } from '@/app/_firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Status = 'verifying' | 'success' | 'failed'

const Page = () => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<Status>('verifying')
  const [paymentId, setPaymentId] = useState('')

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (!sessionId) { setStatus('failed'); return }

    const pending = sessionStorage.getItem('pending_order')
    sessionStorage.removeItem('pending_order')

    const verify = async () => {
      try {
        const res = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })
        const { success, paymentId: pid } = await res.json()

        if (success) {
          if (pending) {
            const { items, amount, address, userName, userEmail, userId } = JSON.parse(pending)
            await addDoc(collection(db, 'users', String(userId), 'orders'), {
              items, amount, address, userName, userEmail,
              paymentId: pid || orderId,
              time: Math.floor(Date.now() / 1000),
            })
          }
          setPaymentId(pid || orderId)
          dispatch(clearCart())
          setStatus('success')
        } else {
          setStatus('failed')
        }
      } catch {
        setStatus('failed')
      }
    }

    verify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === 'verifying') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Verifying payment...</p>
        </div>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-sm w-full">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Failed</h2>
          <p className="text-gray-500 text-sm mb-8">Something went wrong. Your cart is intact — please try again.</p>
          <Link
            href="/cart"
            className="inline-block w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-sm w-full">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-500 text-sm mb-1">Thank you for your purchase.</p>
        {paymentId && (
          <p className="text-xs text-gray-400 font-mono mb-8 break-all">{paymentId}</p>
        )}
        <Link
          href="/my-orders"
          className="inline-block w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
        >
          View My Orders
        </Link>
      </div>
    </div>
  )
}

export default Page
