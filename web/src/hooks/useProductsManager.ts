import { useState, useEffect, useCallback } from 'react'
import { api } from '../api/axios'
import type { Product, Category, PaginatedProducts } from '../types'

export function useProductsManager() {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const [prodRes, catRes] = await Promise.all([
                api.get<PaginatedProducts>('/product?limit=50'),
                api.get<Category[]>('/category'),
            ])
            setProducts(prodRes.data.data || [])
            setCategories(Array.isArray(catRes.data) ? catRes.data : [])
        } catch (error) {
            console.error('Error loading data:', error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const saveProduct = async (payload: any, id?: number | null) => {
        if (id) await api.patch(`/product/${id}`, payload)
        else await api.post('/product', payload)
        await fetchData()
    }

    const deleteProduct = async (id: number) => {
        if (!confirm('Do you really want to delete this product?')) return
        await api.delete(`/product/${id}`)
        await fetchData()
    }

    return { products, categories, loading, saveProduct, deleteProduct }
}
