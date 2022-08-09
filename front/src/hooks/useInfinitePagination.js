import { useCallback, useMemo, useState } from 'react';

const useInfinitePagination = ({ getItems, checkIfHasMore }) => {
  const [items, setItems] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const offset = useMemo(() => items?.length ?? 0, [items]);

  const loadItems = useCallback(async () => {
    if (loading) return;
    if (!hasMore) return;
    setLoading(true);
    try {
      const newItems = await getItems(offset);
      setHasMore(checkIfHasMore(newItems));
      setItems((prevItems) => [...(prevItems ?? []), ...newItems]);
    } catch (e) {
      setError(e.message ?? 'Unexpected error');
    }
    setLoading(false);
  }, [getItems, checkIfHasMore, loading, hasMore, offset]);

  return {
    items,
    hasMore,
    loading,
    error,
    loadItems,
  };
};

export default useInfinitePagination;
