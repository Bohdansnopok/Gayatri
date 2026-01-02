// hooks/useAuth.ts
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    
    if (!isLoggedIn) {
      router.push('/admin')
    }
  }, [router])
}