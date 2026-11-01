// src/hooks/useInfiniteScroll.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { getApiUrl } from '../api';

export function useInfiniteScroll(endpoint, pageSize = 10) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const loadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const response = await fetch(
        `${getApiUrl(endpoint)}?page=${page}&pageSize=${pageSize}`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setItems((prev) => [...prev, ...result.data]);
      setHasMore(result.pagination.hasNextPage);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [endpoint, page, pageSize, hasMore]);

  const loadFirstPage = useCallback(async () => {
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${getApiUrl(endpoint)}?page=1&pageSize=${pageSize}`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setItems(result.data);
      setHasMore(result.pagination.hasNextPage);
      setPage(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [endpoint, pageSize]);

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  return { items, loading, hasMore, error, loadMore };
}