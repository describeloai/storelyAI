'use client';

import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import styles from '@/styles/dashboard.module.css';

interface AgentCard {
  name: string;
  label: string;
  role: string;
  tagline: string; // New: Added tagline
  colorClass: string; // Changed 'color' to 'colorClass' to map to CSS classes
  imageSrc: string; // New: Path to agent image
}

const cards: AgentCard[] = [
  {
    name: 'sofia',
    label: 'Sofía',
    role: 'AI Marketer',
    tagline: 'Ignites campaigns, drives growth.',
    colorClass: 'sofia',
    imageSrc: '/images/agents/sofia-icon.png', // Placeholder, replace with actual path
  },
  {
    name: 'echo',
    label: 'Echo',
    role: 'Data Analyst',
    tagline: 'Uncovers insights from complex data.',
    colorClass: 'echo',
    imageSrc: '/images/agents/echo-icon.png', // Placeholder
  },
  {
    name: 'ciro',
    label: 'Ciro',
    role: 'SEO Assistant',
    tagline: 'Optimizes content for search success.',
    colorClass: 'ciro',
    imageSrc: '/images/agents/ciro-icon.png', // Placeholder
  },
  {
    name: 'tariq',
    label: 'Tariq',
    role: 'Customer Support',
    tagline: 'Provides instant, intelligent assistance.',
    colorClass: 'tariq',
    imageSrc: '/images/agents/tariq-icon.png', // Placeholder
  },
  {
    name: 'mara',
    label: 'Mara',
    role: 'Copywriter',
    tagline: 'Crafts compelling, engaging narratives.',
    colorClass: 'mara',
    imageSrc: '/images/agents/mara-icon.png', // Placeholder
  },
  {
    name: 'thalia',
    label: 'Thalia',
    role: 'Ops Manager',
    tagline: 'Streamlines operations, boosts efficiency.',
    colorClass: 'thalia',
    imageSrc: '/images/agents/thalia-icon.png', // Placeholder
  },
];

export default function DashboardHome() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heroTitle}>Unlock Your Potential with AI-Powered Intelligence.</h1> {/* More engaging title */}

      <div className={styles.grid}>
        {cards.map((card) => (
          <Link key={card.name} href={`/dashboard/${card.name}`} passHref>
            <div className={`${styles.card} ${styles[card.colorClass]}`} aria-label={`Go to ${card.label}'s dashboard`}>
              <div className={styles.cardHeader}>
                <h3>{card.label}</h3>
                <p>{card.role}</p>
                <p className={styles.tagline}>{card.tagline}</p> {/* Display tagline */}
              </div>
              <div className={styles.cardImage}>
                <Image
                  src={card.imageSrc}
                  alt={`${card.label} icon`}
                  width={80} // Adjust based on desired size
                  height={80}
                  className={styles.agentImage}
                  priority // Load important images faster
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Optional: Add a call to action or some introductory text below the grid */}
      <div className={styles.callToActionSection}>
        <p>Explore how each AI agent can transform your workflows and drive unprecedented results.</p>
        {/* <Link href="/dashboard/all-agents" className={styles.primaryButton}>Discover All Agents</Link> */}
      </div>
    </div>
  );
}