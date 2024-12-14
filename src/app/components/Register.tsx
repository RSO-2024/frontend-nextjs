"use client"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"


export default function Register() {

    const { toast } = useToast()

    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */} 


        <div className="flex min-h-full flex-1">

        <div className="relative hidden w-0 flex-1 lg:block max-h-[650px]">
            <img
              alt=""
              src='./bmw1.jpg'
              className="absolute inset-0 size-full object-cover"
            />
          </div>

        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                alt="Your Company"
                src="./icon.svg"
                className="h-10 w-auto"
              />
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Create your account</h2>
              <p className="mt-2 text-sm/6 text-gray-500">
                Already a member?{' '}
                <Link href="/login" className="font-semibold text-orange-500 hover:text-orange-600">
                  Sign In
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form action="#" method="POST" className="space-y-2">

                <div className="flex">

                    <div className="flex flex-col pr-1">
                    <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">
                     First Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="firstName"
                        name="firstName"
                        type="firstName"
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6"
                      />
                    </div>
                    </div>

                    <div className="flex flex-col pl-1">
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                      Last Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="lastName"
                        name="lastName"
                        type="lastName"
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6"
                      />

                    </div>
                    </div>

                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="userName" className="block text-sm/6 font-medium text-gray-900">
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        id="userName"
                        name="userName"
                        type="userName"
                        required
                        autoComplete="userName"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                 

                  <div className="py-3">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>

             
            </div>
          </div>
        </div>
        </div>
      </>
    )
  }
  