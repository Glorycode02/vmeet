import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignInButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.png"
          width={27}
          height={27}
          alt="Vmeet logo"
          className="max-sm:size-10"
        />
        <p className="text[26px] font-extrabold text-white max-sm:hidden">Vmeet</p>
      </Link>
      <div className='flex-between gap-5'>
        <SignInButton>
          <UserButton />
        </SignInButton>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
