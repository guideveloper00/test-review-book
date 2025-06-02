'use client';

import React from 'react';
import { useQuery } from 'react-query';
import { fetchBooks } from '../utils/api';

const BookList = () => {
  const { data: books, isLoading, error } = useQuery('books', fetchBooks);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading books</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {Array.isArray(books) &&
        books.map((book: any, idx: number) => {
          const bookId = book.id || book._id || idx;
          return (
            <div
              key={bookId}
              className="relative bg-gradient-to-br from-white via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="absolute top-4 right-4 text-sm text-zinc-400 group-hover:text-blue-500 transition-colors">
                #{idx + 1}
              </div>
              <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-3">
                {book.title}
              </h2>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                  {book.avgRating ?? book.avg_rating ?? 'N/A'} / 5.0
                </span>
              </div>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                {book.reviews.length ?? 0} review
                {(book.reviews.length ?? 0) !== 1 && 's'}
              </p>

              <a
                href={`/books/${bookId}`}
                className="inline-block w-full text-center mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition-colors"
              >
                📖 View Details
              </a>
            </div>
          );
        })}
    </div>
  );
};

export default BookList;
