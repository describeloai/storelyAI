'use client';
import { Suspense } from 'react';
import EntryPointRouter from './EntryPointRouter';
import dynamic from 'next/dynamic';

const Landing = dynamic(() => import('./landing/LandingLayout'), {
  ssr: false,
}) as React.ComponentType;

export default function EntryPointPage() {
  return (
    <>
      <Suspense fallback={<p>Redireccionando...</p>}>
        <EntryPointRouter />
      </Suspense>
      <Landing />
    </>
  );
}
