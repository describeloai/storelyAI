'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/dashboard.module.css';
import { useDarkMode } from '@/context/DarkModeContext';

interface AgentCard {
  name: string;
  label: string;
  role: string;
  tagline: string;
  colorClass: string;
  imageSrc: string;
}

const cards: AgentCard[] = [
  {
    name: 'sofia',
    label: 'Sofía',
    role: 'AI Marketer',
    tagline: 'Ignites campaigns, drives growth.',
    colorClass: 'sofia',
    imageSrc: '/images/agents/sofia-icon.png',
  },
  {
    name: 'echo',
    label: 'Echo',
    role: 'Data Analyst',
    tagline: 'Uncovers insights from complex data.',
    colorClass: 'echo',
    imageSrc: '/images/agents/echo-icon.png',
  },
  {
    name: 'ciro',
    label: 'Ciro',
    role: 'SEO Assistant',
    tagline: 'Optimizes content for search success.',
    colorClass: 'ciro',
    imageSrc: '/images/agents/ciro-icon.png',
  },
  {
    name: 'tariq',
    label: 'Tariq',
    role: 'Customer Support',
    tagline: 'Provides instant, intelligent assistance.',
    colorClass: 'tariq',
    imageSrc: '/images/agents/tariq-icon.png',
  },
  {
    name: 'mara',
    label: 'Mara',
    role: 'Copywriter',
    tagline: 'Crafts compelling, engaging narratives.',
    colorClass: 'mara',
    imageSrc: '/images/agents/mara-icon.png',
  },
  {
    name: 'thalia',
    label: 'Thalia',
    role: 'Ops Manager',
    tagline: 'Streamlines operations, boosts efficiency.',
    colorClass: 'thalia',
    imageSrc: '/images/agents/thalia-icon.png',
  },
];

export default function DashboardHome() {
  const { darkMode } = useDarkMode();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heroTitle}>
        Unlock Your Potential with AI-Powered Intelligence.
      </h1>

      <div className={styles.grid}>
        {cards.map((card) => (
          <Link key={card.name} href={`/dashboard/${card.name}`} passHref>
            <div
              className={`${styles.card} ${styles[card.colorClass]}`}
              aria-label={`Go to ${card.label}'s dashboard`}
            >
              <div className={styles.cardHeader}>
                <h3>{card.label}</h3>
                <p>{card.role}</p>
                <p className={styles.tagline}>{card.tagline}</p>
              </div>
              <div className={styles.cardImage}>
                <Image
                  src={card.imageSrc}
                  alt={`${card.label} icon`}
                  width={80}
                  height={80}
                  className={styles.agentImage}
                  priority
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.callToActionSection}>
        <p>
          Explore how each AI agent can transform your workflows and drive unprecedented results.
        </p>
      </div>
    </div>
  );
}
