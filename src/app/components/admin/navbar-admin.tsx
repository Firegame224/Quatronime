import React from 'react'
import MainNavAdmin from './main-nav-admin'
import AnimeSwitcher from '@/components/ui/anime-switcher'
import prisma from '@/libs/prisma'
import LogoutButton from './logout-button'



export default async function NavbarAdmin() {
  
  const animes = await prisma.anime2.findMany({
    select : {
      id : true,
      title : true
    }
  })
  return (
    <nav className="border border-black px-5">
      <div className='h-24 md:h-16 md:flex justify-between items-center'>
          <AnimeSwitcher items={animes} />
          <MainNavAdmin className='mx-6'/>
        <div className='flex ml-auto items-center space-x-4'>
        <LogoutButton/>
        </div>
      </div>
    </nav>
  )
}
