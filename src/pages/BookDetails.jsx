import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { toggleFavorite } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import {
  Heart,
  Share,
  Star,
  BookOpen,
  Calendar,
  User,
  Building,
  Languages,
  Bookmark,
  ShoppingCart,
  ArrowLeft
} from 'lucide-react';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const favorites = useSelector(state => state.user.favorites);
  const isFavorite = favorites.includes(id);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const bookData = await getBookById(id);
        setBook(bookData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch book details');
        toast.error('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(book));
    toast.success('Added to cart successfully');
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center p-4">
        <BookOpen className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Error Loading Book</h1>
        <p className="text-muted-foreground mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to results
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image */}
          <div className="space-y-6">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted">
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleToggleFavorite}
                className={`btn btn-circle btn-lg ${
                  isFavorite ? 'btn-primary' : 'btn-outline'
                }`}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={handleShare}
                className="btn btn-circle btn-lg btn-outline"
                title="Share book"
              >
                <Share className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{book.name}</h1>
              <p className="text-xl text-muted-foreground">{book.author}</p>
            </div>

            {/* Rating and Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(book.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  ({book.ratingCount} reviews)
                </span>
              </div>
              <div className="text-2xl font-bold">₹{book.price}</div>
            </div>

            {/* Book Details */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Pages</div>
                  <div className="font-medium">{book.pageCount}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Published</div>
                  <div className="font-medium">{book.publishedDate}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Publisher</div>
                  <div className="font-medium">{book.publisher}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Language</div>
                  <div className="font-medium">{book.language?.toUpperCase()}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-2">About this book</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {book.description}
              </p>
            </div>

            {/* Categories */}
            {book.categories?.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Categories</h2>
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

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="btn btn-primary w-full gap-2 text-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart - ₹{book.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 