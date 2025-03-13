import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import { toggleFavorite, addNotification } from '../features/user/userSlice';
import { ShoppingCart, Star, Heart, Share2, Info } from "lucide-react";
import { toast } from 'react-toastify';

function Card({ book }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favorites } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const isLiked = favorites.includes(book.id);
  const [showTooltip, setShowTooltip] = useState(false);
  const isInCart = items.some(item => item.id === book.id);

  const handleNavigateToOverview = () => {
    navigate(`/overview/${book.id}`);
  };

  const handleLike = () => {
    dispatch(toggleFavorite(book.id));
    dispatch(addNotification({
      title: isLiked ? 'Removed from Favorites' : 'Added to Favorites',
      message: `${book.name} has been ${isLiked ? 'removed from' : 'added to'} your favorites`,
      type: isLiked ? 'info' : 'success'
    }));
    toast.info(`${book.name} ${isLiked ? 'removed from' : 'added to'} favorites!`);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: book.name,
          text: `Check out this book: ${book.name}`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(`Check out this book: ${book.name} - ${window.location.href}`);
        toast.success('Book link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share book');
    }
  };

  const handleInfo = () => {
    dispatch(addNotification({
      title: 'Book Details',
      message: book.description || 'No description available.',
      type: 'info'
    }));
    toast.info(`More info about ${book.name}: ${book.description || 'No description available.'}`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(book));
    toast.success(`${book.name} added to cart`);
  };

  const handleRating = (rating) => {
    dispatch(addNotification({
      title: 'Rating Submitted',
      message: `You rated ${book.name} ${rating} stars`,
      type: 'success'
    }));
    toast.success(`Thank you for rating ${book.name}!`);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-card hover:bg-card/80 shadow-md hover:shadow-xl transition-all duration-300 h-[450px] animate-scale-in">
      {/* Quick Action Buttons */}
      <div className="absolute right-4 top-20 z-20 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-full group-hover:translate-x-0">
        <button 
          className={`p-2.5 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:scale-110 transition-all ${
            isLiked ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10' : 'text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10'
          }`}
          onClick={handleLike}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>
        <button 
          className="p-2.5 rounded-full bg-background/80 backdrop-blur-sm shadow-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all hover:scale-110"
          onClick={handleShare}
          aria-label="Share book"
        >
          <Share2 className="w-5 h-5" />
        </button>
        <button 
          className="p-2.5 rounded-full bg-background/80 backdrop-blur-sm shadow-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all hover:scale-110"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={handleInfo}
          aria-label="View book information"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute right-16 top-32 z-30 bg-popover text-popover-foreground text-sm rounded-lg py-2 px-4 max-w-[200px] shadow-lg animate-fade-in">
          Click to view detailed information about this book
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-popover"></div>
        </div>
      )}

      {/* New Badge */}
      {book.isNew && (
        <div className="absolute top-4 left-4 z-10 animate-fade-in">
          <div className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-lg">
            NEW
          </div>
        </div>
      )}

      {/* Price Badge */}
      <div className="absolute top-4 right-4 z-10 animate-fade-in">
        <div className="px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground shadow-lg">
          {book.price === 0 ? "FREE" : `₹${book.price}`}
        </div>
      </div>

      {/* Image Container */}
      <div 
        className="relative h-64 overflow-hidden bg-muted cursor-pointer"
        onClick={handleNavigateToOverview}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          src={book.image}
          alt={book.name}
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h2 
          className="text-xl font-semibold line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors duration-300 cursor-pointer"
          onClick={handleNavigateToOverview}
        >
          {book.name}
        </h2>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-4 h-4 fill-yellow-400 text-yellow-400 transform hover:scale-125 transition-transform cursor-pointer"
                strokeWidth={0}
                onClick={() => handleRating(star)}
                role="button"
                aria-label={`Rate ${star} stars`}
              />
            ))}
          </div>
          <span className="font-medium">(4.5)</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-muted-foreground flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Available Now
          </div>
          <button 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
              isInCart 
                ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            } transition-colors group/btn`}
            onClick={handleAddToCart}
            disabled={isInCart}
            aria-label={isInCart ? 'Already in cart' : 'Add to cart'}
          >
            <ShoppingCart className="w-4 h-4 transform group-hover/btn:rotate-12 transition-transform" />
            <span className="relative font-medium">
              {isInCart ? "In Cart" : book.price === 0 ? "Get Now" : "Buy Now"}
              <span className="absolute inset-x-0 -bottom-px h-px bg-current/50 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
