import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import { addNotification } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item.id));
    dispatch(addNotification({
      title: 'Item Removed',
      message: `${item.name} has been removed from your cart`,
      type: 'info'
    }));
    toast.success(`${item.name} removed from cart`);
  };

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dispatch(addNotification({
        title: 'Order Successful',
        message: `Your order of ${items.length} ${items.length === 1 ? 'item' : 'items'} has been placed successfully`,
        type: 'success'
      }));
      toast.success('Thank you for your purchase!');
      dispatch(clearCart());
    } catch (error) {
      console.error('Checkout error:', error);
      dispatch(addNotification({
        title: 'Checkout Failed',
        message: 'There was an error processing your order. Please try again.',
        type: 'error'
      }));
      toast.error('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
      dispatch(addNotification({
        title: 'Cart Cleared',
        message: 'All items have been removed from your cart',
        type: 'info'
      }));
      toast.info('Cart has been cleared');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 pt-20">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Your Cart</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-muted-foreground">
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
            {items.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-sm text-destructive hover:text-destructive/80 transition-colors"
                aria-label="Clear cart"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center space-y-6 py-12 animate-fade-in">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-xl text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground/60">Looks like you haven't added anything to your cart yet.</p>
            </div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {items.map((item, index) => (
              <div 
                key={item.id} 
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-card hover:bg-card/80 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
                      {item.name}
                    </h2>
                    <p className="text-muted-foreground">₹{item.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <button 
                    className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    onClick={() => handleRemoveItem(item)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-card p-6 rounded-xl shadow-sm space-y-6 animate-slide-up" style={{ animationDelay: `${items.length * 100}ms` }}>
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/" 
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 