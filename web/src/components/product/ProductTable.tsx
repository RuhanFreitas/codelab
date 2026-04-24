import type { Product } from '../../types'

interface ProductTableProps {
    products: Product[]
    loading: boolean
    onEdit: (product: Product) => void
    onDelete: (id: number) => void
}

export function ProductTable({
    products,
    loading,
    onEdit,
    onDelete,
}: ProductTableProps) {
    const formatPrice = (value: number) =>
        new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value)

    return (
        <section className="md:col-span-2 bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                        <tr>
                            <th className="p-4 border-b">Product</th>
                            <th className="p-4 border-b">Price</th>
                            <th className="p-4 border-b">Categories</th>
                            <th className="p-4 border-b text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="p-8 text-center text-gray-400"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            products.map((prod) => (
                                <tr
                                    key={prod.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="p-4">
                                        <div className="font-semibold text-gray-800">
                                            {prod.name}
                                        </div>
                                        <div className="text-[10px] text-gray-400">
                                            ID: #{prod.id}
                                        </div>
                                    </td>
                                    <td className="p-4 text-green-600 font-bold">
                                        {formatPrice(prod.price)}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                            {prod.categories.map((c) => (
                                                <span
                                                    key={c.id}
                                                    className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded border border-blue-100"
                                                >
                                                    {c.name}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => onEdit(prod)}
                                                className="text-blue-500 hover:underline text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onDelete(prod.id)
                                                }
                                                className="text-red-500 hover:underline text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
