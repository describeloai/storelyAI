import { Suspense } from 'react';
import RedirectEntryPage from './RedirectEntryPage';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RedirectEntryPage />
    </Suspense>
  );
}
