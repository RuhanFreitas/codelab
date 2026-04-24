import { useState, useCallback } from 'react'
import { api } from '../api/axios'
import type { PaginatedProducts } from '../types'

export function useProducts() {
    const [data, setData] = useState<PaginatedProducts | null>(null)
    const [loading, setLoading] = useState(false)

    const fetchProducts = useCallback(
        async (currentPage: number, searchTerm: string) => {
            setLoading(true)
            try {
                const response = await api.get<PaginatedProducts>('/product', {
                    params: {
                        page: currentPage,
                        limit: 6,
                        name: searchTerm.trim() || undefined,
                    },
                })
                setData(response.data)
            } catch (error) {
                console.error('Error retrieving products:', error)
            } finally {
                setLoading(false)
            }
        },
        [],
    )

    return { data, loading, fetchProducts }
}
