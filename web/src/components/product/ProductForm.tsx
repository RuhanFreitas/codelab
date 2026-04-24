import { useState, useEffect } from 'react'
import type { Category, Product } from '../../types'

interface ProductFormProps {
    categories: Category[]
    editingProduct: Product | null
    onSave: (payload: any, id?: number | null) => Promise<void>
    onCancel: () => void
}

export function ProductForm({
    categories,
    editingProduct,
    onSave,
    onCancel,
}: ProductFormProps) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState<number | ''>('')
    const [selectedCategories, setSelectedCategories] = useState<number[]>([])

    useEffect(() => {
        if (editingProduct) {
            setName(editingProduct.name)
            setPrice(editingProduct.price)
            setSelectedCategories(editingProduct.categories.map((c) => c.id))
        } else {
            resetStates()
        }
    }, [editingProduct])

    const resetStates = () => {
        setName('')
        setPrice('')
        setSelectedCategories([])
    }

    const handleToggleCategory = (id: number) => {
        setSelectedCategories((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (selectedCategories.length === 0)
            return alert('Selecione uma categoria.')

        try {
            await onSave(
                { name, price: Number(price), categoryIds: selectedCategories },
                editingProduct?.id,
            )
            resetStates()
            onCancel()
            alert('Sucesso!')
        } catch (error: any) {
            alert(error.response?.data?.message || 'Erro ao salvar')
        }
    }

    return (
        <section className="bg-white p-6 rounded-lg shadow-sm border h-fit sticky top-4">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">
                {editingProduct ? 'Edit Product' : 'Register Product'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Price (R$)
                    </label>
                    <input
                        required
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) =>
                            setPrice(
                                e.target.value !== ''
                                    ? Number(e.target.value)
                                    : '',
                            )
                        }
                        className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Categorias
                    </label>
                    <div className="max-h-48 overflow-y-auto border rounded p-2 bg-gray-50 space-y-2 border-dashed">
                        {categories.map((cat) => (
                            <label
                                key={cat.id}
                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(
                                        cat.id,
                                    )}
                                    onChange={() =>
                                        handleToggleCategory(cat.id)
                                    }
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm text-gray-600">
                                    {cat.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700"
                    >
                        {editingProduct ? 'Update' : 'Register'}
                    </button>
                    {editingProduct && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 bg-gray-200 py-2 rounded font-medium"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </section>
    )
}
