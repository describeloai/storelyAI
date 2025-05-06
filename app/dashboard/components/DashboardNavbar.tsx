'use client';

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import FeatherIcon from '@/components/FeatherIcon';

export default function DashboardNavbar() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#111827',
        borderBottom: '1px solid #1F2937',
        padding: '0.25rem 1rem',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '44px',
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: '1rem',
          fontWeight: 700,
          color: 'white',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <FeatherIcon size={20} color="white" />
        <span>Storely</span>
      </Link>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '320px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '0.375rem',
            padding: '0.3rem 0.6rem',
            color: '#9CA3AF',
            fontSize: '0.85rem',
            gap: '0.5rem',
          }}
        >
          <span style={{ fontSize: '1rem' }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar en Storely..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'white',
              flexGrow: 1,
              fontSize: '0.85rem',
            }}
          />
          <kbd
            style={{
              backgroundColor: '#374151',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              color: '#D1D5DB',
              fontFamily: 'monospace',
            }}
          >
            Ctrl K
          </kbd>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          title="Ayuda"
          onClick={() => alert('Aquí irá la ayuda inteligente ✨')}
          style={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            color: '#9CA3AF',
            borderRadius: '999px',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          ?
        </button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
