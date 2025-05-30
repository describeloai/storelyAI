'use client';
import { useDarkMode } from '@/context/DarkModeContext';

export default function GeneralSettings() {
  const { darkMode } = useDarkMode();

  return (
    <div>
      <h3 style={titleStyle(darkMode)}>General Settings</h3>
      <p style={descStyle(darkMode)}>Set the name, timezone, and defaults for your workspace.</p>
    </div>
  );
}

const titleStyle = (dark: boolean) => ({ fontSize: '1.5rem', marginBottom: '1rem', color: dark ? '#f4f4f5' : '#111' });
const descStyle = (dark: boolean) => ({ color: dark ? '#ccc' : '#555', marginBottom: '2rem' });
