import { useEffect, useState, useCallback } from 'react';

type Stats = {
  text: number;
  link: number;
  file: number;
};

export function useKnowledgeStats(storeKey: 'purple' | 'blue') {
  const [stats, setStats] = useState<Stats>({ text: 0, link: 0, file: 0 });

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`/api/brain/stats?storeKey=${storeKey}`);
      const data = await res.json();
      if (res.ok) {
        setStats(data);
      }
    } catch (e) {
      console.error('Error fetching stats:', e);
    }
  }, [storeKey]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    refetch: fetchStats,
  };
}
