import React from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

interface ProductGridProps {
  searchQuery: string;
  ratingFilter: number | null;
  setRatingFilter: (filter: number | null) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery, ratingFilter, setRatingFilter }) => {
  const filteredProducts = React.useMemo(() => {
    let products = PRODUCTS;
    const query = (searchQuery || '').toLowerCase().trim();

    if (query) {
      products = products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(query);
        const benefitsMatch = product.benefits.some(benefit =>
          benefit.toLowerCase().includes(query)
        );
        return nameMatch || benefitsMatch;
      });
    }
    
    if (ratingFilter !== null) {
      products = products.filter(product => product.rating === ratingFilter);
    }

    return products;
  }, [searchQuery, ratingFilter]);

  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Today's Top-Rated Products</h2>
          <p className="text-gray-600 mt-2">Handpicked for you based on quality, value, and user reviews.</p>
        </div>

        {ratingFilter === 5 && (
          <div className="text-center mb-8 bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-center justify-center space-x-4 animate-fade-in">
            <span className="font-semibold text-blue-800">⭐ Showing 5-star products only.</span>
            <button 
              onClick={() => setRatingFilter(null)} 
              className="font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Show All Products
            </button>
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} searchQuery={searchQuery} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-800">No Products Found</h3>
            <p className="text-gray-500 mt-2">
              We couldn't find any products matching your criteria.
              {(searchQuery || ratingFilter) && ` Try adjusting your search or filter.`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;