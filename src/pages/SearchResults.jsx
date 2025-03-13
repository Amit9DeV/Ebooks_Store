import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, BookOpen, Filter } from 'lucide-react';
import Card from '../components/Card';
import { searchBooks } from '../services/api';
import { toast } from 'react-toastify';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const books = await searchBooks(query);
        setResults(books);
      } catch (error) {
        console.error('Search error:', error);
        setError('Failed to fetch search results. Please try again.');
        toast.error('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  // Filter and sort results
  const filteredResults = results
    .filter(book => {
      const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
      const matchesCategory = selectedCategories.length === 0 || 
        book.categories.some(cat => selectedCategories.includes(cat));
      return matchesPrice && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  // Get unique categories from results
  const availableCategories = [...new Set(results.flatMap(book => book.categories))];

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Search className="w-8 h-8" />
            Search Results
          </h1>
          <p className="text-muted-foreground">
            {loading ? (
              'Searching...'
            ) : error ? (
              error
            ) : (
              `Found ${filteredResults.length} ${filteredResults.length === 1 ? 'result' : 'results'} for "${query}"`
            )}
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground">Searching for books...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-12 h-12 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p className="text-muted-foreground text-center max-w-md">{error}</p>
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>

                {/* Sort Options */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 rounded-md border border-border bg-background"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Price Range</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-24 p-2 rounded-md border border-border bg-background"
                      min="0"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-24 p-2 rounded-md border border-border bg-background"
                      min="0"
                    />
                  </div>
                </div>

                {/* Categories */}
                {availableCategories.length > 0 && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Categories</label>
                    <div className="space-y-2">
                      {availableCategories.map((category) => (
                        <label key={category} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([...selectedCategories, category]);
                              } else {
                                setSelectedCategories(selectedCategories.filter(c => c !== category));
                              }
                            }}
                            className="rounded border-border"
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredResults.map((book) => (
                  <Card key={book.id} book={book} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground text-center max-w-md">
              We couldn't find any books matching your search. Try using different keywords or check for typos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 