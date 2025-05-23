'use client';

import styles from '@/components/dashboard/dashboard.module.css';

const cards = [
  { name: 'Nova', role: 'AI Marketer', color: 'orange' },
  { name: 'Zeno', role: 'Data Analyst', color: 'green' },
  { name: 'Astra', role: 'SEO Assistant', color: 'blue' },
  { name: 'Lumi', role: 'Customer Support', color: 'yellow' },
  { name: 'Iris', role: 'Copywriter', color: 'lavender' },
  { name: 'Nyra', role: 'Ops Manager', color: 'purple' },
];

export default function DashboardHome() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heroTitle}>Everything in one place.</h1>

      <div className={styles.grid}>
        {cards.map((card) => (
          <div key={card.name} className={`${styles.card} ${styles[card.color]}`}>
            <div className={styles.cardHeader}>
              <h3>{card.name}</h3>
              <p>{card.role}</p>
            </div>
            <div className={styles.cardImage}>
              <div className={styles.imagePlaceholder}>[ image ]</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
