import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, XIcon, SearchIcon } from './icons';
import { PRODUCTS } from '../constants';
import type { Product } from '../types';

interface HeaderProps {
  setSearchQuery: (query: string) => void;
}

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

const Header: React.FC<HeaderProps> = ({ setSearchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [localQuery, setLocalQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navLinks = [
    { href: '#products', text: 'Top Picks' },
    { href: '#testimonials', text: 'Reviews' },
    { href: '#about', text: 'Why Us?' },
    { href: '#contact', text: 'Contact' },
  ];

  useEffect(() => {
    if (isSearchActive) {
      document.body.style.overflow = 'hidden';
      searchInputRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchActive]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocalQuery(query);
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const results = PRODUCTS.filter(product => {
      const q = query.toLowerCase().trim();
      const nameMatch = product.name.toLowerCase().includes(q);
      const benefitsMatch = product.benefits.some(benefit =>
        benefit.toLowerCase().includes(q)
      );
      return nameMatch || benefitsMatch;
    });
    setFilteredProducts(results);
  };

  const openSearch = () => {
    setIsSearchActive(true);
    setIsMenuOpen(false);
  };

  const closeSearch = () => {
    setIsSearchActive(false);
    setLocalQuery('');
    setFilteredProducts([]);
    setSearchQuery('');
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center h-20">
          {!isSearchActive ? (
            <>
              <a href="#" className="text-2xl font-bold text-gray-800">
                Tradify
              </a>

              <div className="hidden md:flex items-center space-x-6">
                <nav className="flex space-x-8">
                  {navLinks.map(link => (
                    <a key={link.href} href={link.href} className="text-gray-600 hover:text-blue-500 transition duration-300">
                      {link.text}
                    </a>
                  ))}
                </nav>
                <button onClick={openSearch} aria-label="Open search" className="text-gray-600 hover:text-blue-500">
                  <SearchIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="md:hidden flex items-center space-x-4">
                <button onClick={openSearch} aria-label="Toggle search">
                  <SearchIcon className="w-6 h-6" />
                </button>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                  {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center animate-fade-in">
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <SearchIcon className="h-6 w-6 text-gray-400" />
                </span>
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="What are you looking for?"
                  value={localQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 bg-gray-50 rounded-full text-lg text-blue-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoComplete="off"
                  aria-label="Search for products"
                />
              </div>
              <button onClick={closeSearch} aria-label="Close search" className="ml-4 p-2 rounded-full hover:bg-gray-200 flex-shrink-0">
                <XIcon className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          )}
        </div>

        {isMenuOpen && !isSearchActive && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-30 animate-fade-in">
            <nav className="flex flex-col items-center py-4">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-800 py-3 text-lg hover:text-blue-500 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
      
      {isSearchActive && (
        <div className="fixed inset-0 z-30 animate-fade-in" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/50" onClick={closeSearch} aria-hidden="true"></div>
          <div className="relative container mx-auto px-4 sm:px-6 pt-2">
            <div className="bg-white rounded-lg shadow-lg max-h-[calc(100vh-6rem)] overflow-y-auto">
              {localQuery.trim() === '' ? (
                <div className="p-8 text-center text-gray-500">
                  <p>Start typing to find amazing products!</p>
                </div>
              ) : (
                <>
                  {filteredProducts.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                      {filteredProducts.map(product => (
                        <li key={product.id}>
                          <a
                            href={product.affiliateLink}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="p-4 hover:bg-gray-100 flex items-center space-x-4 transition-colors duration-200"
                            onClick={closeSearch}
                          >
                            <img src={product.image} alt={product.name} className="w-12 h-12 object-contain flex-shrink-0 bg-white rounded" />
                            <span className="text-md text-gray-800 font-medium">{highlightMatch(product.name, localQuery)}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-8 text-center text-green-600 flex flex-col items-center justify-center min-h-[200px]">
                      <p className="font-semibold text-lg">Sorry, this product is not currently available!</p>
                      <p className="mt-1">Try searching for something else.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;