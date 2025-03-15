'use client'
import { Button } from '@/components/ui/button'
import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React from 'react'


export default function LogoutButton() {
  return (
    <div>
      <Button onClick={()=> signOut()} >
          <LogOutIcon/>
          <h1>Logout</h1>
        </Button>
    </div>
  )
}
