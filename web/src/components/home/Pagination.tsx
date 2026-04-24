interface PaginationProps {
    page: number
    lastPage: number
    total: number
    onPageChange: (newPage: number) => void
    disabled?: boolean
}

export function Pagination({
    page,
    lastPage,
    total,
    onPageChange,
    disabled,
}: PaginationProps) {
    if (lastPage <= 1) return null

    return (
        <div className="flex flex-col items-center justify-center mt-16 gap-4">
            <div className="flex gap-1">
                <button
                    disabled={page === 1 || disabled}
                    onClick={() => onPageChange(page - 1)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 font-medium transition-all"
                >
                    ← Anterior
                </button>

                <div className="flex items-center px-6 font-semibold text-gray-700">
                    {page} <span className="mx-2 text-gray-400">/</span>{' '}
                    {lastPage}
                </div>

                <button
                    disabled={page === lastPage || disabled}
                    onClick={() => onPageChange(page + 1)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 font-medium transition-all"
                >
                    Próxima →
                </button>
            </div>
            <p className="text-xs text-gray-400 italic">
                Total of {total} products found
            </p>
        </div>
    )
}
