'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function NavbarAnime() {
    const router = useRouter()
  return (
    <div className='w-full fixed z-10 '>
      <Button
      className='border-none bg-black shadow-none text-xl text-[#fc0b03] items-center flex rounded-sm justify-center'
      onClick={()=> router.push("/")}
      >
        <ArrowLeft className='w-7 h-7'/>
        Back
      </Button>
    </div>
  )
}
