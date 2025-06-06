import { Suspense } from 'react';
import EmbeddedPageClient from './EmbeddedPageClient';

export default function EmbeddedPage() {
  return (
    <Suspense fallback={<div>Cargando app embebida...</div>}>
      <EmbeddedPageClient />
    </Suspense>
  );
}
