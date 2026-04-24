import type { Product } from '../../types'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const priceFormatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(product.price)

    return (
        <article className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-6 grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                        {product.name}
                    </h3>
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                        ID: {product.id}
                    </span>
                </div>
                <p className="text-3xl text-green-600 font-black mb-4">
                    {priceFormatted}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {product.categories.map((cat) => (
                        <span
                            key={cat.id}
                            className="bg-gray-50 text-gray-500 text-[11px] font-medium px-2.5 py-1 rounded-md border border-gray-200"
                        >
                            {cat.name}
                        </span>
                    ))}
                </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                <button className="text-blue-600 font-semibold text-sm hover:underline">
                    See Details
                </button>
            </div>
        </article>
    )
}
