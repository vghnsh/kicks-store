'use client'

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '@/app/_firebase/config'
import { clearUser, selectUser } from '@/app/_redux/slices/userSlice'
import { selectCartData } from '@/app/_redux/slices/cartSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const categories = [
  { name: "Men's Clothing", href: '/categories/men' },
  { name: "Women's Clothing", href: '/categories/women' },
  { name: 'Jewelery', href: '/categories/jewelery' },
  { name: 'Electronics', href: '/categories/electronics' },
]

export default function Header() {
  const user = useSelector(selectUser)
  const cartData = useSelector(selectCartData)
  const dispatch = useDispatch()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(clearUser())
    signOut(auth)
    router.push('/')
  }

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-700 transition-colors">
              <span className="text-white text-sm font-black tracking-tighter">KS</span>
            </div>
            <span className="text-base font-bold tracking-tight text-gray-900 hidden sm:block">
              Kickstore
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors outline-none">
                Shop
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-0 top-full mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black/5 p-2">
                  {categories.map((cat) => (
                    <a
                      key={cat.name}
                      href={cat.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      {cat.name}
                    </a>
                  ))}
                </Popover.Panel>
              </Transition>
            </Popover>

            {user && (
              <a
                href="/my-orders"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                My Orders
              </a>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden lg:block text-sm text-gray-600">
                  Hi, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="hidden lg:block text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <a
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Log in
                </a>
                <a
                  href="/signup"
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                >
                  Sign up
                </a>
              </div>
            )}

            {/* Cart */}
            <Link href="/cart">
              <div className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                {cartData?.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-xs text-white font-medium">
                    {cartData.length}
                  </span>
                )}
              </div>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-xl flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <span className="text-lg font-bold text-gray-900">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {user && (
              <div className="mb-6 p-3 rounded-xl bg-gray-50">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Signed in as</p>
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              </div>
            )}

            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Shop
            </p>
            <div className="space-y-1 mb-8">
              {categories.map((cat) => (
                <a
                  key={cat.name}
                  href={cat.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                </a>
              ))}
            </div>

            {user && (
              <a
                href="/my-orders"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 mb-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Orders
              </a>
            )}
          </div>

          <div className="px-6 py-4 border-t border-gray-100">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Log out
              </button>
            ) : (
              <div className="space-y-2">
                <a
                  href="/login"
                  className="block w-full py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-center text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Log in
                </a>
                <a
                  href="/signup"
                  className="block w-full py-2.5 rounded-xl bg-gray-900 text-sm font-medium text-center text-white hover:bg-gray-700 transition-colors"
                >
                  Sign up
                </a>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}
