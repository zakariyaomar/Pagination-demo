// src/components/Pagination.jsx

export default function Pagination({ pagination, onPageChange }) {
  const { page, totalPages, hasPreviousPage, hasNextPage } = pagination;

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    // Adjust start if we are near the end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      margin: '2rem 0',
    }}>
      {/* Previous button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPreviousPage}
        style={{
          padding: '0.5rem 1rem',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          backgroundColor: hasPreviousPage ? 'white' : '#f3f4f6',
          cursor: hasPreviousPage ? 'pointer' : 'not-allowed',
          color: hasPreviousPage ? '#374151' : '#9ca3af',
        }}
      >
        Previous
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: pageNum === page ? '#2563eb' : 'white',
            color: pageNum === page ? 'white' : '#374151',
            cursor: 'pointer',
            fontWeight: pageNum === page ? 'bold' : 'normal',
          }}
        >
          {pageNum}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        style={{
          padding: '0.5rem 1rem',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          backgroundColor: hasNextPage ? 'white' : '#f3f4f6',
          cursor: hasNextPage ? 'pointer' : 'not-allowed',
          color: hasNextPage ? '#374151' : '#9ca3af',
        }}
      >
        Next
      </button>
    </div>
  );
}