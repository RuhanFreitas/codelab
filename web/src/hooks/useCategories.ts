import { useState, useEffect, useCallback } from 'react'
import { api } from '../api/axios'
import type { Category } from '../types'

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([])

    const fetchCategories = useCallback(async () => {
        try {
            const { data } = await api.get<Category[]>('/category')
            setCategories(data)
        } catch (error) {
            console.error('Error searching for categories:', error)
        }
    }, [])

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    const saveCategory = async (
        name: string,
        parentId?: number | null,
        id?: number | null,
    ) => {
        const payload = {
            name,
            parentId: parentId || undefined,
        }

        try {
            if (id) {
                await api.patch(`/category/${id}`, payload)
            } else {
                await api.post('/category', payload)
            }
            await fetchCategories()
            return { success: true }
        } catch (error: any) {
            const message =
                error.response?.data?.message || 'Error saving category'
            return { success: false, message }
        }
    }

    const deleteCategory = async (id: number) => {
        if (!confirm('Do you really want to delete this category?')) return
        try {
            await api.delete(`/category/${id}`)
            await fetchCategories()
        } catch (error) {
            alert(
                'Error deleting. Please check if there are any linked products',
            )
        }
    }

    return { categories, saveCategory, deleteCategory }
}
