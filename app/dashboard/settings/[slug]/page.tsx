// app/dashboard/settings/[slug]/page.tsx

// ¡IMPORTANTE! NO LLEVA 'use client' AQUÍ. ESTE ES UN SERVER COMPONENT.

import ClientSettingsPage from './ClientSettingsPage';

// Definimos un tipo que incluya lo que Next.js parece estar esperando
// para 'params' en la 'PageProps' interna.
// Esto es un workaround para el tipado estricto de Next.js.
interface PagePropsForNextJS {
  params: {
    slug: string;
  } | Promise<any>; // <-- Permitimos que params sea Promise<any> también.
}

// Y aquí lo usamos en la función de tu Server Component.
// Aunque sabemos que en tiempo de ejecución será { slug: string }
// y lo 'awaitemos' como si fuera una promesa.
export default async function SettingsPage({ params }: PagePropsForNextJS) {
  // Aquí es crucial que SIEMPRE 'awaitemos' params
  // para que Next.js no dé el error de "sync-dynamic-apis".
  const resolvedParams = await params;
  const slug = (resolvedParams as { slug: string }).slug; // <-- Hacemos un 'type assertion'

  return (
    <ClientSettingsPage initialSlug={slug} />
  );
}