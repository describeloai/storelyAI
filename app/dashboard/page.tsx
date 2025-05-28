'use client';

import Link from 'next/link';
import styles from '@/components/dashboard/dashboard.module.css';

const cards = [
  { name: 'sofia', label: 'Sofía', role: 'AI Marketer', color: 'orange' },
  { name: 'echo', label: 'Echo', role: 'Data Analyst', color: 'green' },
  { name: 'ciro', label: 'Ciro', role: 'SEO Assistant', color: 'blue' },
  { name: 'tariq', label: 'Tariq', role: 'Customer Support', color: 'yellow' },
  { name: 'mara', label: 'Mara', role: 'Copywriter', color: 'lavender' },
  { name: 'thalia', label: 'Thalia', role: 'Ops Manager', color: 'purple' },
];

export default function DashboardHome() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heroTitle}>Everything in one place.</h1>

      <div className={styles.grid}>
        {cards.map((card) => (
          <Link key={card.name} href={`/dashboard/${card.name}`}>
            <div className={`${styles.card} ${styles[card.color]}`}>
              <div className={styles.cardHeader}>
                <h3>{card.label}</h3>
                <p>{card.role}</p>
              </div>
              <div className={styles.cardImage}>
                <div className={styles.imagePlaceholder}>[ image ]</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}