import { Suspense } from 'react';
import FinishAuthPage from './FinishAuthPage';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <FinishAuthPage />
    </Suspense>
  );
}
