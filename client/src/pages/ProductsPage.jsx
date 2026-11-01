// src/pages/ProductsPage.jsx
import { useState } from 'react';
import { getApiUrl } from '../api';
import { usePagination } from '../hooks/usePagination';
import { useToast } from '../hooks/useToast';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import Toast from '../components/Toast';

export default function ProductsPage() {
  const {
    data: products,
    pagination,
    loading,
    error,
    goToPage,
    refresh,
  } = usePagination('/api/products', 10);
  const { toasts, addToast, removeToast } = useToast();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);

    try {
      const response = await fetch(getApiUrl(`/api/products/${id}`), {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to delete product');
      }

      await refresh();
      addToast('Product deleted successfully', 'success');
    } catch (deleteError) {
      addToast(deleteError.message || 'Failed to delete product', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      <h1>Products</h1>
      <p style={{ color: '#6b7280' }}>
        Showing {products.length} of {pagination.totalItems} products
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <EmptyState
          title="No products yet"
          message="Add your first product to get started."
        />
      ) : (
        <div>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                padding: '1rem',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <h3 style={{ margin: 0 }}>{product.name}</h3>
              <p style={{ color: '#6b7280', margin: '0.25rem 0' }}>
                {product.category} -- KES {product.price}
              </p>
              <button
                type="button"
                onClick={() => handleDelete(product.id)}
                disabled={deletingId === product.id}
              >
                {deletingId === product.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))}
        </div>
      )}

      <Pagination pagination={pagination} onPageChange={goToPage} />
    </div>
  );
}