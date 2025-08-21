import { auth } from '@/lib/auth'
import { Home } from '@/modules/home/ui/views/home-view'
import { caller } from '@/trpc/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const page=async()=> {
  const data=await caller.hello({text:"sahil server"})
    const session=await auth.api.getSession({
      headers:await headers()
    })
  
    if (!session) {
      redirect('/sign-in')
    }
    

  return (
    <Home />
  )
}

export default page