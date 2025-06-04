// app/dashboard/settings/[slug]/page.tsx

// ¡IMPORTANTE! NO LLEVA 'use client' AQUÍ. ESTE ES UN SERVER COMPONENT.

// Importa el Client Component que contiene toda la lógica de UI.
import ClientSettingsPage from './ClientSettingsPage';

// Define la interfaz de las props para tu Server Component
interface SettingsPageProps {
  params: {
    slug: string;
  };
  // Si tuvieras searchParams, los definirías aquí también:
  // searchParams?: { [key: string]: string | string[] | undefined };
}

// Este es el Server Component de la página.
// ¡Debe ser una función 'async'!
export default async function SettingsPage({ params }: SettingsPageProps) {
  // --- ¡EL CAMBIO AQUÍ! ---
  // Aunque 'params' en sí no es una promesa, Next.js requiere que lo 'awaitemos'
  // o que desestructuremos sus propiedades con 'await' para cumplir con su API interna.
  // Esto asegura que la lectura del 'slug' se realice en el momento adecuado.
  const { slug } = await params; // <--- Añade 'await' aquí

  // Renderiza el Client Component y le pasa el slug como una prop.
  return (
    <ClientSettingsPage initialSlug={slug} />
  );
}