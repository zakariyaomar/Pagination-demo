// src/components/InfiniteProductList.jsx
import { useEffect, useRef } from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export default function InfiniteProductList() {
  const { items, loading, hasMore, error, loadMore } = useInfiniteScroll('/api/products', 10);
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, loadMore]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Products</h1>

      {items.map((product) => (
        <div
          key={product.id}
          style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}
        >
          <h3>{product.name}</h3>
          <p style={{ color: '#6b7280' }}>KES {product.price}</p>
        </div>
      ))}

      {/* Sentinel element -- triggers loading when it becomes visible */}
      <div ref={sentinelRef} style={{ height: '1px' }} />

      {loading && <p style={{ textAlign: 'center' }}>Loading more...</p>}
      {!hasMore && items.length > 0 && (
        <p style={{ textAlign: 'center', color: '#9ca3af' }}>
          You have reached the end.
        </p>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}