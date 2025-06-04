// app/dashboard/settings/[slug]/page.tsx

// ¡IMPORTANTE! NO LLEVA 'use client' AQUÍ. ESTE ES UN SERVER COMPONENT.

import ClientSettingsPage from './ClientSettingsPage';

// Definimos la interfaz como Next.js parece esperarla
interface SettingsPageProps {
  params: Promise<any>; // <-- Declara params como Promise<any> directamente
  // searchParams?: { [key: string]: string | string[] | undefined };
}

// Este es el Server Component de la página.
export default async function SettingsPage({ params }: SettingsPageProps) {
  // Await params para resolver la promesa
  const resolvedParams = await params;

  // Ahora, haz un type assertion para indicarle a TypeScript
  // qué estructura esperas que tenga resolvedParams.
  // Aquí estamos seguros de que tendrá un 'slug'.
  const slug = (resolvedParams as { slug: string }).slug;

  return (
    <ClientSettingsPage initialSlug={slug} />
  );
}