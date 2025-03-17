import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBookById } from '../services/api';
import { 
  BookOpen, 
  Library as LibraryIcon,
  BookText,
  Clock,
  Bookmark,
  X,
  Search
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    const loadLibraryBooks = async () => {
      try {
        setLoading(true);
        // Get book IDs from localStorage
        const libraryBooks = JSON.parse(localStorage.getItem('library') || '[]');
        
        if (libraryBooks.length === 0) {
          setBooks([]);
          setLoading(false);
          return;
        }

        // Fetch book details for each ID
        const bookDetails = await Promise.all(
          libraryBooks.map(async (id) => {
            try {
              return await getBookById(id);
            } catch (err) {
              console.error(`Error fetching book ${id}:`, err);
              return null;
            }
          })
        );

        // Filter out any null results (failed fetches)
        setBooks(bookDetails.filter(book => book !== null));
        setError(null);
      } catch (err) {
        console.error('Error loading library:', err);
        setError('Failed to load your library. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadLibraryBooks();
  }, []);

  const removeFromLibrary = (id) => {
    const libraryBooks = JSON.parse(localStorage.getItem('library') || '[]');
    const updatedLibrary = libraryBooks.filter(bookId => bookId !== id);
    localStorage.setItem('library', JSON.stringify(updatedLibrary));
    
    // Update state to reflect removal
    setBooks(books.filter(book => book.id !== id));
    
    toast.success('Book removed from your library');
  };

  const filteredBooks = books.filter(book => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      book.name.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      (book.categories && book.categories.some(category => 
        category.toLowerCase().includes(query)
      ))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-lg text-muted-foreground animate-pulse">Loading your library...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center p-4">
        <LibraryIcon className="w-16 h-16 text-destructive mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold mb-2">Error Loading Library</h1>
        <p className="text-muted-foreground mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <LibraryIcon className="text-primary" />
              My Library
            </h1>
            <p className="text-muted-foreground mt-1">
              {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="join">
              <button 
                className={`join-item btn btn-sm ${view === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setView('grid')}
                title="Grid View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                </svg>
              </button>
              <button 
                className={`join-item btn btn-sm ${view === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setView('list')}
                title="List View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </button>
            </div>
            
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search your library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full max-w-xs pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
            <div className="w-24 h-24 border-4 border-muted-foreground/20 rounded-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-muted-foreground/50" />
            </div>
            <h2 className="text-2xl font-bold">Your library is empty</h2>
            <p className="text-muted-foreground max-w-md">
              You haven't added any books to your library yet. Start browsing and add books to your collection.
            </p>
            <Link to="/" className="btn btn-primary">
              Browse Books
            </Link>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <Search className="w-16 h-16 text-muted-foreground/50" />
            <h2 className="text-xl font-bold">No results found</h2>
            <p className="text-muted-foreground">
              No books match your search query: "{searchQuery}"
            </p>
            <button onClick={() => setSearchQuery('')} className="btn btn-primary btn-sm">
              Clear Search
            </button>
          </div>
        ) : view === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <div key={book.id} className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={book.image} 
                    alt={book.name} 
                    className="w-full h-64 object-cover"
                  />
                  
                  {/* Last read badge */}
                  {localStorage.getItem(`book_${book.id}_page`) && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                      Reading in progress
                    </div>
                  )}
                  
                  {/* Remove button */}
                  <button 
                    onClick={() => removeFromLibrary(book.id)}
                    className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm text-destructive hover:bg-destructive hover:text-destructive-foreground p-2 rounded-full transition-colors"
                    title="Remove from library"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  <Link 
                    to={`/overview/${book.id}`}
                    className="text-lg font-bold hover:text-primary transition-colors line-clamp-1"
                  >
                    {book.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  
                  <div className="mt-4 flex justify-between">
                    <Link 
                      to={`/overview/${book.id}`}
                      className="btn btn-sm btn-primary gap-1"
                    >
                      <BookOpen className="w-4 h-4" />
                      Read
                    </Link>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookText className="w-4 h-4 mr-1" />
                      {book.pageCount} pages
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {filteredBooks.map(book => (
              <div 
                key={book.id}
                className="flex gap-4 bg-card p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <img 
                  src={book.image} 
                  alt={book.name} 
                  className="w-20 h-28 object-cover rounded-md"
                />
                
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link 
                        to={`/overview/${book.id}`}
                        className="font-bold hover:text-primary transition-colors"
                      >
                        {book.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                    
                    <button 
                      onClick={() => removeFromLibrary(book.id)}
                      className="btn btn-ghost btn-sm text-destructive"
                      title="Remove from library"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="mt-auto pt-2 flex items-center text-sm text-muted-foreground gap-4">
                    <div className="flex items-center">
                      <BookText className="w-4 h-4 mr-1" />
                      {book.pageCount} pages
                    </div>
                    
                    {localStorage.getItem(`book_${book.id}_page`) && (
                      <div className="flex items-center">
                        <Bookmark className="w-4 h-4 mr-1 text-primary" />
                        <span className="text-primary">
                          Page {localStorage.getItem(`book_${book.id}_page`)}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center ml-auto">
                      <Link 
                        to={`/overview/${book.id}`}
                        className="btn btn-xs btn-primary gap-1"
                      >
                        <BookOpen className="w-3 h-3" />
                        Read
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 