import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, getBookContent } from '../services/api';
import { 
  BookOpen, 
  Star, 
  Share2, 
  ShoppingCart, 
  ChevronLeft,
  Calendar,
  User,
  Languages,
  BookText,
  Building2,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Loader2
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import EbookReader from '../components/EbookReader';
import { toast } from 'react-toastify';

export default function Overview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readMode, setReadMode] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [lastReadPage, setLastReadPage] = useState(1);
  const [bookContent, setBookContent] = useState('');
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookData = await getBookById(id);
        setBook(bookData);
        setError(null);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Failed to load book details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
    
    // Try to get last read page from localStorage
    const savedPage = localStorage.getItem(`book_${id}_page`);
    if (savedPage) {
      setLastReadPage(parseInt(savedPage));
    }
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(book));
    toast.success('Book added to cart!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.name,
        text: `Check out ${book.name} by ${book.author}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.info('Link copied to clipboard!');
    }
  };

  const renderDescription = (description) => {
    const formattedDesc = description
      .replace(/<p>/g, '')
      .replace(/<\/p>/g, '\n')
      .replace(/<i>/g, '')
      .replace(/<\/i>/g, '')
      .replace(/\n\s*\n/g, '\n')
      .trim();
    
    if (!showFullDescription && formattedDesc.length > 300) {
      return { __html: formattedDesc.substring(0, 300) + '...' };
    }
    return { __html: formattedDesc };
  };
  
  // Save reading progress to localStorage
  const handleCloseReader = (currentPage) => {
    localStorage.setItem(`book_${id}_page`, currentPage.toString());
    setLastReadPage(currentPage);
    setReadMode(false);
  };

  // Check if this book is in the user's library
  const isInLibrary = () => {
    const libraryBooks = JSON.parse(localStorage.getItem('library') || '[]');
    return libraryBooks.some(bookId => bookId === id);
  };

  // Add the book to the user's library
  const addToLibrary = () => {
    const libraryBooks = JSON.parse(localStorage.getItem('library') || '[]');
    if (!libraryBooks.includes(id)) {
      libraryBooks.push(id);
      localStorage.setItem('library', JSON.stringify(libraryBooks));
      toast.success('Book added to your library!');
    }
  };

  // Fetch full book content when entering read mode
  const handleStartReading = async () => {
    try {
      setLoadingContent(true);
      const content = await getBookContent(id);
      setBookContent(content);
      setReadMode(true);
    } catch (err) {
      console.error('Error fetching book content:', err);
      toast.error('Failed to load book content. Please try again.');
    } finally {
      setLoadingContent(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-lg text-muted-foreground animate-pulse">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center p-4">
        <BookOpen className="w-16 h-16 text-destructive mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold mb-2">Error Loading Book</h1>
        <p className="text-muted-foreground mb-4">{error}</p>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Go Back
        </button>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-background to-background/50">
      {readMode ? (
        <EbookReader 
          content={bookContent}
          title={book.name}
          author={book.author}
          coverImage={book.image}
          onClose={handleCloseReader}
        />
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost gap-2 mb-8 hover:bg-transparent"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Book Image */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md mb-6">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full rounded-lg shadow-2xl"
                />
                {lastReadPage > 1 && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse">
                    Last Read: Page {lastReadPage}
                  </div>
                )}
              </div>
              
              <div className="flex gap-4 flex-wrap justify-center">
                <button
                  onClick={handleStartReading}
                  className="btn btn-primary gap-2"
                  disabled={loadingContent}
                >
                  {loadingContent ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-5 h-5" />
                      Read Book
                    </>
                  )}
                </button>
                <button
                  onClick={handleAddToCart}
                  className="btn btn-secondary gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={addToLibrary}
                  className="btn btn-outline gap-2"
                  disabled={isInLibrary()}
                >
                  <Bookmark className="w-5 h-5" />
                  {isInLibrary() ? 'In Your Library' : 'Add to Library'}
                </button>
                <button
                  onClick={handleShare}
                  className="btn btn-outline gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>

            {/* Book Details */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{book.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(book.rating)
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  ({book.ratingCount} reviews)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Author</p>
                    <p className="font-medium">{book.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Published</p>
                    <p className="font-medium">{book.publishedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Publisher</p>
                    <p className="font-medium">{book.publisher}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Languages className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Language</p>
                    <p className="font-medium">{book.language.toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pages</p>
                    <p className="font-medium">{book.pageCount}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <div className="space-y-4">
                  <div 
                    className="prose prose-sm max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={renderDescription(book.description)}
                  />
                  {book.description.length > 300 && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      {showFullDescription ? (
                        <>
                          Show Less
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Read More
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {book.categories.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    {book.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 