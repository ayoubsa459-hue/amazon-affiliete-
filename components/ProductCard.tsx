
import React from 'react';
import type { Product } from '../types';
import { StarIcon, CheckCircleIcon } from './icons';

interface ProductCardProps {
  product: Product;
  searchQuery?: string;
}

const StarRating: React.FC<{ rating: number; reviews: number }> = ({ rating, reviews }) => {
  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
        ))}
      </div>
      <span className="text-gray-600 ml-2 text-sm">({reviews} reviews)</span>
    </div>
  );
};

const highlightMatch = (text: string, query: string) => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return text;

  const regex = new RegExp(`(${trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === trimmedQuery.toLowerCase() ? (
          <span key={index} className="text-blue-600">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, searchQuery = '' }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden group">
      <div className="relative h-56 w-full bg-gray-200">
        <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" 
            loading="lazy"
            decoding="async"
        />
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">DEAL</div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{highlightMatch(product.name, searchQuery)}</h3>
        <div className="mb-4">
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>
        <ul className="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
          {product.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>{highlightMatch(benefit, searchQuery)}</span>
            </li>
          ))}
        </ul>
        <a
          href={product.affiliateLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-auto block w-full bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg text-center hover:bg-yellow-600 transition duration-300"
        >
          Check Price on Amazon
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
