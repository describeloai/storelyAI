'use client';

import Link from 'next/link';
import styles from '@/components/dashboard/dashboard.module.css';

const modules = [
  {
    name: 'Catálogo y SEO',
    description: 'Optimiza productos',
    color: 'blue',
    path: '/dashboard/products',
    image: '/images/modules/catalogo.png',
  },
  {
    name: 'Marketing',
    description: 'Crea campañas',
    color: 'lavender',
    path: '/dashboard/marketing',
    image: '/images/modules/marketing.png',
  },
  {
    name: 'Ventas',
    description: 'Convierte más',
    color: 'orange',
    path: '/dashboard/sales',
    image: '/images/modules/ventas.png',
  },
  {
    name: 'Soporte',
    description: 'Responde a clientes',
    color: 'yellow',
    path: '/dashboard/support',
    image: '/images/modules/soporte.png',
  },
  {
    name: 'Analítica',
    description: 'Datos útiles',
    color: 'green',
    path: '/dashboard/analytics',
    image: '/images/modules/analytics.png',
  },
  {
    name: 'Operaciones',
    description: 'Administra tu tienda',
    color: 'purple',
    path: '/dashboard/operations',
    image: '/images/modules/operaciones.png',
  },
];

export default function DashboardHome() {
  return (
    <div style={{ padding: '2rem 3rem' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 className={styles.titleCromado}>Everything in one place</h1>
      </div>

      <div className={styles.grid}>
        {modules.map((mod) => (
          <Link
            href={mod.path}
            key={mod.name}
            className={`${styles.card} ${styles[mod.color]}`}
          >
            <div>
              <h2 style={{ marginBottom: '0.25rem' }}>{mod.name}</h2>
              <p style={{ fontSize: '0.9rem' }}>{mod.description}</p>
            </div>
            <img src={mod.image} alt={mod.name} className={styles.image} />
          </Link>
        ))}
      </div>
    </div>
  );
}
