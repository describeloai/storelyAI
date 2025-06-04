// app/dashboard/settings/page.tsx
// (Este es un Server Component por defecto, no necesita 'use client')

import { redirect } from 'next/navigation';

// Puedes definir tu lista de secciones para saber cuál es la predeterminada
// Idealmente, esto podría ser importado de una constante compartida.
const settingsNavItems = [
  { path: 'general', labelKey: 'General' }, // Primera sección por defecto
  { path: 'account', labelKey: 'Account' },
  { path: 'ai', labelKey: 'AIautomation' },
  { path: 'notifications', labelKey: 'Notifications' },
  { path: 'security', labelKey: 'Security' },
  { path: 'billing', labelKey: 'Billing' },
  { path: 'connections', labelKey: 'Connections' },
  { path: 'help', labelKey: 'Help' },
];

export default function SettingsIndexPage() {
  // Redirige a la primera sección de configuración por defecto
  // Por ejemplo, /dashboard/settings/general
  redirect(`/dashboard/settings/${settingsNavItems[0]?.path || 'general'}`);

  // Este componente nunca se renderizará porque redirect detiene la renderización y emite una redirección.
  return null;
}