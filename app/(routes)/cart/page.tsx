'use client'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotal } from '../../_utility/index'
import {
  addToCart,
  removeFromCart,
  selectCartData,
  removeProductFromCart,
} from '@/app/_redux/slices/cartSlice'
import Image from 'next/image'
import { selectUser } from '@/app/_redux/slices/userSlice'
import { useRouter } from 'next/navigation'
import { checkout } from '@/app/_utility/checkout'
import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/24/outline'

const Cart = () => {
  const router = useRouter()
  const cartData = useSelector(selectCartData)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const handleAddToCart = (product: any) => dispatch(addToCart({ item: product, quantity: 1 }))
  const handleRemoveFromCart = (product: any) => dispatch(removeFromCart(product))
  const handleRemoveProductFromCart = (product: any) => dispatch(removeProductFromCart(product))

  const onCheckOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const address = formData.get('address') as string
    if (!user) {
      router.push('/login')
    } else {
      const lineItems = cartData?.map((item) => ({
        name: item.item.title,
        amount: item.item.price,
        currency: 'INR',
        quantity: item.quantity,
        desc: item.item.description,
        image: item.item.image,
      })) ?? []

      checkout({
        lineItems,
        userName: user.name,
        shippingAddress: address,
        userId: String(user.id),
        userEmail: user.email,
        cart: cartData,
      })
    }
  }

  if (!cartData?.length) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-6xl">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 text-sm">Looks like you haven&apos;t added anything yet.</p>
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Items */}
          <div className="flex-1 space-y-4">
            {cartData?.map((item) => (
              <div
                key={item.item.id}
                className="bg-white rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm"
              >
                <div className="relative w-20 h-20 flex-shrink-0 rounded-xl bg-gray-50 overflow-hidden">
                  <Image
                    fill
                    src={item.item.image}
                    alt={item.item.title}
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {item.item.title}
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    ₹{(item.item.price * 10 * item.quantity).toFixed(0)}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleRemoveFromCart(item.item)}
                    className="w-8 h-8 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center text-lg leading-none"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item.item)}
                    className="w-8 h-8 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center text-lg leading-none"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveProductFromCart(item.item)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <form onSubmit={onCheckOut} method="POST">
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
                <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">₹{calculateTotal(cartData) * 10}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span className="font-medium text-gray-900">₹0</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900 text-base">₹{calculateTotal(cartData) * 10}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows={3}
                    placeholder="Enter your delivery address..."
                    className="block w-full rounded-xl border border-gray-200 py-2.5 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                <p className="text-xs text-gray-400">
                  Test card: <span className="font-mono font-medium text-gray-600">4242 4242 4242 4242</span>
                </p>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 active:scale-[0.98] transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
