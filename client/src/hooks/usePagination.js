// src/hooks/usePagination.js
import { useState, useEffect, useCallback } from 'react';
import { getApiUrl } from '../api';

export function usePagination(endpoint, pageSize = 10) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPage = useCallback(async (page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${getApiUrl(endpoint)}?page=${page}&pageSize=${pageSize}`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setData(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, pageSize]);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  const goToPage = (page) => fetchPage(page);
  const refresh = () => fetchPage(pagination.page);
  const nextPage = () => {
    if (pagination.hasNextPage) fetchPage(pagination.page + 1);
  };
  const previousPage = () => {
    if (pagination.hasPreviousPage) fetchPage(pagination.page - 1);
  };

  return {
    data,
    pagination,
    loading,
    error,
    goToPage,
    refresh,
    nextPage,
    previousPage,
  };
}