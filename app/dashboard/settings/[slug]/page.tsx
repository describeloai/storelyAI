// app/dashboard/settings/[slug]/page.tsx
// ¡IMPORTANTE! NO LLEVA 'use client' AQUÍ. ESTE ES UN SERVER COMPONENT.

// Importa el Client Component que contiene toda la lógica de UI.
import ClientSettingsPage from './ClientSettingsPage';

// Este es el Server Component de la página.
// Puede ser una función 'async' para recibir 'params'.
// La desestructuración de 'params.slug' puede ser suficiente, o 'params' si lo quieres completo.
// TypeScript puede necesitar una pequeña ayuda para entender que slug es string | Promise<string>
export default async function SettingsPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {

  // --- ¡EL CAMBIO CRUCIAL AQUÍ! ---
  // Desestructura el slug directamente. Next.js App Router maneja la Promesa implícitamente
  // cuando accedes a params en un componente async.
  // La anotación de tipo para params puede ser Promise<{ slug: string }> o directamente { slug: string }.
  // Para ser explícitos con la promesa y la resolución en el server component:
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  const resolvedSlug = resolvedParams.slug;

  // Si estás seguro de que params.slug siempre será una cadena directamente (Next.js podría resolverla antes),
  // a veces solo esto basta, pero el error indica que no es el caso:
  // const resolvedSlug = params.slug; // Esto causa el error si params.slug es una Promise<string>


  // Renderiza el Client Component y le pasa el slug ya resuelto como una prop.
  return (
    <ClientSettingsPage initialSlug={resolvedSlug} />
  );
}