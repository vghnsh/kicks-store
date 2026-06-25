'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32 flex flex-col items-center text-center">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-300">
            New Season
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-6">
            Dress the
            <br />
            <span className="text-gray-400">Future.</span>
          </h1>
          <p className="max-w-md text-gray-400 text-base sm:text-lg mb-10">
            Discover curated styles across fashion, electronics, and accessories — all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="categories/women"
              className="px-8 py-3.5 rounded-full bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="categories/electronics"
              className="px-8 py-3.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Explore Electronics
            </Link>
          </div>
        </div>
      </section>

      {/* Categories — bento layout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Browse</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Shop by Category</h2>
        </div>

        {/*
          Desktop bento (lg+):
            col 1 (40%): Women tall card (2 rows)
            col 2 (60%): top row split Electronics | Jewelery, bottom row Men wide
          Mobile: stacked single column
        */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4">

          {/* Women — tall left card */}
          <Link
            href="categories/women"
            className="relative overflow-hidden rounded-2xl group lg:col-span-2 lg:row-span-2 h-64 lg:h-auto lg:min-h-[540px]"
          >
            <Image
              src="https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png"
              alt="Women's Fashion"
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">Women&apos;s Fashion</p>
              <h3 className="text-2xl font-bold text-white leading-tight">Shop Women</h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                Explore collection
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Right column top row: Electronics + Jewelery */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-3 sm:gap-4">
            <Link
              href="categories/electronics"
              className="relative overflow-hidden rounded-2xl group h-52 sm:h-64"
            >
              <Image
                src="/assets/Images/elect.jpg"
                alt="Electronics"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-0.5">Tech</p>
                <h3 className="text-lg font-bold text-white">Electronics</h3>
              </div>
            </Link>

            <Link
              href="categories/jewelery"
              className="relative overflow-hidden rounded-2xl group h-52 sm:h-64"
            >
              <Image
                src="/assets/Images/jew1.jpg"
                alt="Jewelery"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-0.5">Accessories</p>
                <h3 className="text-lg font-bold text-white">Jewelery</h3>
              </div>
            </Link>
          </div>

          {/* Men — wide bottom-right card */}
          <Link
            href="categories/men"
            className="relative overflow-hidden rounded-2xl group lg:col-span-3 h-52 sm:h-64"
          >
            <Image
              src="/assets/Images/men.jpg"
              alt="Men's Clothing"
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">Men&apos;s Fashion</p>
              <h3 className="text-2xl font-bold text-white leading-tight">Shop Men</h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                Explore collection
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Value props */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🚀', title: 'Fast Delivery', desc: 'Orders dispatched within 24 hours' },
              { icon: '🔒', title: 'Secure Checkout', desc: 'Powered by Stripe — 100% safe' },
              { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free return policy' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
