// src/components/EmptyState.jsx

export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      color: '#6b7280',
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        {/* Simple text icon instead of emoji */}
        [ ]
      </div>
      <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ marginBottom: '1.5rem' }}>{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}