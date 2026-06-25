'use client'
import { auth } from '@/app/_firebase/config'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from '../../_redux/slices/userSlice'
import { useRouter } from 'next/navigation'

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector(selectUser)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const mail = formData.get('email') as string | null // Ensure mail is of type string or null
    const password = formData.get('password') as string | null // Ensure password is of type string or null
    const uname = formData.get('username') as string | null // Ensure password is of type string or null

    if (mail !== null && password !== null && uname !== null) {
      setIsLoading(true)
      try {
        const authUser = await createUserWithEmailAndPassword(
          auth,
          mail,
          password,
        )
        await updateProfile(authUser.user, {
          displayName: uname,
        })
        dispatch(setUser(authUser.user))
        setIsLoading(false)
      } catch (error: Error | any) {
        setIsLoading(false)
        toast.error(error.message)
        console.error(
          'Error during registration or profile update:',
          error.message,
        )
      }
    }
  }

  const singInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      router.push('/')
    } catch (err) {
      console.log('err: ', err)
    }
  }

  return (
    <>
      <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto w-auto"
            src="/assets/Images/ic_logo.png"
            alt=""
            width={60}
            height={60}
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={onSubmit}
            className="space-y-3"
            action="#"
            method="POST"
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? 'Loading...' : 'Sign up'}
              </button>
            </div>
          </form>
          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <p className="px-3 text-gray-500">or try using</p>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <div className="my-6">
            <button
              onClick={singInWithGoogle}
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in using google
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
