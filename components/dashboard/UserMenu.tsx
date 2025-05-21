'use client';

import { useSearchParams } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';

export default function UserMenu() {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleLogout = () => {
    let redirect = '/sign-in';
    const host = searchParams.get('host');
    const shop = searchParams.get('shop');
    const embedded = searchParams.get('embedded');

    if (host && shop) {
      redirect = `/sign-in?host=${host}&shop=${shop}`;
      if (embedded === '1') redirect += '&embedded=1';
    }

    signOut({ redirectUrl: redirect });
  };

  const handleOpenProfileImage = () => {
    if (user && 'profileImageUrl' in user) {
      window.open(user.profileImageUrl as string, '_blank');
    } else {
      alert('No profile image available');
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 100 }}>
      <div
        style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          minWidth: '240px',
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
          {user?.primaryEmailAddress?.emailAddress}
        </p>

        <button
          onClick={handleOpenProfileImage}
          style={{
            width: '100%',
            padding: '0.6rem 1rem',
            marginBottom: '0.5rem',
            backgroundColor: '#f0f0f0',
            border: 'none',
            borderRadius: '0.4rem',
            cursor: 'pointer',
          }}
        >
          Manage account
        </button>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '0.6rem 1rem',
            backgroundColor: '#f87171',
            color: 'white',
            border: 'none',
            borderRadius: '0.4rem',
            cursor: 'pointer',
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
