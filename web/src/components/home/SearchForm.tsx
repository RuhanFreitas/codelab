import { useState } from 'react'

interface SearchFormProps {
    onSearch: (term: string) => void
    initialValue?: string
}

export function SearchForm({ onSearch, initialValue = '' }: SearchFormProps) {
    const [term, setTerm] = useState(initialValue)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(term)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full md:w-auto shadow-sm"
        >
            <input
                type="text"
                placeholder="What are you looking for?"
                className="border border-gray-300 p-3 rounded-l-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 font-medium transition-colors"
            >
                Search
            </button>
        </form>
    )
}
