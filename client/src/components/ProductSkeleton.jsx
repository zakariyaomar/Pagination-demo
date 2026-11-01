// src/components/ProductSkeleton.jsx

export default function ProductSkeleton({ count = 5 }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{
            padding: '1rem',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          {/* Title skeleton */}
          <div
            style={{
              height: '1.25rem',
              width: '60%',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              animation: 'pulse 1.5s infinite',
            }}
          />
          {/* Subtitle skeleton */}
          <div
            style={{
              height: '1rem',
              width: '40%',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              animation: 'pulse 1.5s infinite',
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}