// app/hooks/useKnowledgeStats.ts
import { useEffect, useState, useCallback } from 'react';

type Stats = {
  text: number;
  link: number;
  file: number;
};

// El hook ahora acepta 'userId' como un parámetro
export function useKnowledgeStats(storeKey: 'purple' | 'blue', userId: string) { // <--- ¡AÑADIDO userId como parámetro!
  const [stats, setStats] = useState<Stats>({ text: 0, link: 0, file: 0 });
  // Nuevo estado para forzar la re-ejecución de fetchStats cuando se llama a refetch
  const [refetchTrigger, setRefetchTrigger] = useState(0); // <--- ¡NUEVO ESTADO!

  const fetchStats = useCallback(async () => {
    // Asegurarse de que userId esté disponible antes de hacer la petición
    if (!userId) {
      console.warn("useKnowledgeStats: userId no disponible, no se hará fetch.");
      setStats({ text: 0, link: 0, file: 0 }); // Resetear a 0 si no hay userId
      return;
    }
    try {
      // La petición GET ahora incluye el userId en los query params
      const res = await fetch(`/api/brain/stats?storeKey=${storeKey}&userId=${userId}`); // <--- ¡userId EN LA URL!
      const data = await res.json();
      if (res.ok) {
        setStats(data);
      } else {
        console.error('Error fetching stats:', data.error || 'Desconocido');
        setStats({ text: 0, link: 0, file: 0 });
      }
    } catch (e) {
      console.error('Error fetching stats:', e);
      setStats({ text: 0, link: 0, file: 0 });
    }
  }, [storeKey, userId, refetchTrigger]); // <--- ¡AÑADIDO userId Y refetchTrigger a las dependencias!

  useEffect(() => {
    fetchStats();
  }, [fetchStats]); // Se ejecutará cuando fetchStats cambie (es decir, cuando cambie storeKey, userId o refetchTrigger)

  // Esta es la función que se expone para forzar una nueva petición
  const refetch = useCallback(() => {
    setRefetchTrigger(prev => prev + 1); // Incrementa el trigger para forzar fetchStats a cambiar
  }, []);

  return {
    stats,
    refetch, // <--- ¡Expone la nueva función refetch!
  };
}