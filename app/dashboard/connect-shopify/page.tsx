import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function ConexionPage() {
  // @ts-ignore
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }
// @ts-ignore
  const user = await clerkClient.users.getUser(userId);
  const shop = user.privateMetadata?.shop as string | undefined;

  return (
    <div style={{ padding: '2rem', maxWidth: '640px' }}>
      {shop ? (
        <>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            🎉 ¡Tienda conectada exitosamente!
          </h2>
          <p style={{ fontSize: '1.1rem' }}>
            Has conectado la tienda <strong>{shop}</strong> a tu cuenta.
          </p>
        </>
      ) : (
        <>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'red', marginBottom: '1rem' }}>
            ❌ Error
          </h2>
          <p style={{ fontSize: '1.1rem' }}>
            No se encontró ninguna tienda conectada en tu cuenta. Intenta conectar nuevamente.
          </p>
        </>
      )}
    </div>
  );
}
