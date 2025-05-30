'use client'
import dynamic from 'next/dynamic'

const Landing = dynamic(() => import('./landing/LandingLayout'), {
  ssr: false,
}) as React.ComponentType

export default function EntryPoint() {
  return <Landing />
}
