'use client';

import { useSearchParams } from 'next/navigation';

export default function AccountClient() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  return (
    <div>
      <h1>Tu cuenta</h1>
      {plan && <p>Tu plan: {plan}</p>}
    </div>
  );
}
