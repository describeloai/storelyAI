'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function RedirectEntry() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const shop = searchParams.get('shop')
    const host = searchParams.get('host')
    const embedded = searchParams.get('embedded')

    const redirectUrl = new URL('/sign-in', window.location.origin)
    if (shop) redirectUrl.searchParams.set('shop', shop)
    if (host) redirectUrl.searchParams.set('host', host)
    if (embedded === '1') redirectUrl.searchParams.set('embedded', '1')

    router.replace(redirectUrl.toString())
  }, [router, searchParams])

  return <p>Redirigiendo...</p>
}
