import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = ["Choose a genre", "Business", "Books", "Marketing", "Fiction", "Horror", "Adventure"]

const TopSellers = () => {
    
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

   const {data: books = []} = useFetchAllBooksQuery();
  
    const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase())

    return (
        <div className='py-10'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-3xl font-semibold'>Top Sellers</h2>
                <div className='text-sm text-gray-600'>
                    Total Books: <span className='font-semibold text-blue-600'>{books.length}</span>
                </div>
            </div>
            
            {/* category filtering */}
            <div className='mb-8 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>

            {/* Show filtered count */}
            <div className='mb-6 text-sm text-gray-600'>
                Showing {filteredBooks.length} books out of {books.length} total books
            </div>

            {/* Grid Layout - Exactly 3 books per row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                   filteredBooks.length > 0 && filteredBooks.map((book, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
                            <BookCard book={book} />
                        </div>
                    ))
                }
            </div>

            {/* Show message if no books found */}
            {filteredBooks.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No books found for the selected category.</p>
                </div>
            )}

        </div>
    )
}

export default TopSellers