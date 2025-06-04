'use client';

import { useDarkMode } from '@/context/DarkModeContext';
import styles from '@/components/dashboard/ui/AccountSettings.module.css';
import { useState } from 'react';

export default function AccountSettings() {
  const { darkMode } = useDarkMode();

  const [fullName, setFullName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('owner');
  const [industry, setIndustry] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const content = `Full name: ${fullName || '—'}\nStore name: ${storeName || '—'}\nEmail: ${email || '—'}\nRole: ${role}\nIndustry: ${industry || '—'}`;
    const title = `Full name: ${fullName || '—'}, Role: ${role}, Industry: ${industry || '—'}`;

    try {
      await fetch('/api/brain/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user',
          storeKey: 'purple',
          type: 'text',
          title,
          content,
          fileUrl: null,
          source: 'account-settings',
          category: 'profile',
        }),
      });
    } catch (err) {
      console.error('❌ Error saving Account Info:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ''}`}>
      <h3 className={styles.title}>Account</h3>
      <p className={styles.description}>
        Manage your identity, store info, and business settings to personalize your AI assistants.
      </p>

      <form className={styles.form} onSubmit={handleSave}>
        <div className={styles.field}>
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            placeholder="e.g. Clara Gómez"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="storeName">Store or Brand name</label>
          <input
            id="storeName"
            placeholder="e.g. Lunática Shop"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="role">Your role</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="owner">Owner</option>
            <option value="marketing">Marketing</option>
            <option value="designer">Designer</option>
            <option value="support">Support</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="industry">Industry</label>
          <input
            id="industry"
            placeholder="e.g. fashion, tech..."
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" disabled={isSaving} style={{ opacity: isSaving ? 0.6 : 1 }}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
