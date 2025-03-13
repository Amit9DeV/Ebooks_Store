import React, { useEffect, useState } from "react";
import { searchBooks } from '../services/api';
import Card from '../components/Card';
import { 
  BookOpen, 
  TrendingUp, 
  Sparkles, 
  ChevronRight, 
  Mail, 
  Star,
  Code,
  Palette,
  BookText,
  GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');

  const categories = [
    { icon: <Code className="w-8 h-8" />, name: "Programming", count: "1000+" },
    { icon: <Palette className="w-8 h-8" />, name: "Design", count: "800+" },
    { icon: <BookText className="w-8 h-8" />, name: "Literature", count: "1200+" },
    { icon: <GraduationCap className="w-8 h-8" />, name: "Education", count: "950+" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      content: "This platform has transformed my learning experience. The variety of books and easy navigation make it perfect for students.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      content: "The programming book collection is outstanding. I've found resources that have significantly improved my coding skills.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Book Enthusiast",
      content: "The best online bookstore I've used. The recommendations are always spot-on!",
      rating: 4
    }
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        // Fetch featured books (programming related)
        const featured = await searchBooks('programming');
        setFeaturedBooks(featured.slice(0, 4));

        // Fetch new releases (books from 2024)
        const newBooks = await searchBooks('subject:fiction+publishedDate:2024');
        setNewReleases(newBooks.slice(0, 4));

        // Fetch popular books (bestsellers)
        const popular = await searchBooks('subject:bestseller');
        setPopularBooks(popular.slice(0, 4));

        setError(null);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    alert('Thank you for subscribing!');
    setEmail('');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-b from-background to-background/50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-lg text-muted-foreground animate-pulse">Loading amazing books for you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-background/50">
        <BookOpen className="w-16 h-16 text-destructive mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold mb-2">Error Loading Books</h1>
        <p className="text-muted-foreground mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <div className="relative overflow-hidden">
        {/* Hero Section with pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }} />
        </div>

        <div className="container mx-auto px-4 py-20 relative">
          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Discover Your Next Favorite Book
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore our vast collection of books across various genres and start your reading journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="btn btn-primary btn-lg gap-2 hover:scale-105 transition-transform"
              >
                Browse Books
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/Course"
                className="btn btn-outline btn-lg gap-2 hover:scale-105 transition-transform"
              >
                View Courses
                <BookOpen className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Categories Section */}
          <section className="mb-20 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link 
                  key={category.name} 
                  to={`/search?category=${category.name.toLowerCase()}`}
                  className="group p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 text-primary group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-muted-foreground">{category.count} Books</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Books Section */}
          <section className="mb-20 animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Featured Books</h2>
              </div>
              <Link
                to="/search?category=featured"
                className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group"
              >
                View All
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBooks.map((book) => (
                <div key={book.id} className="transform hover:-translate-y-2 transition-transform duration-300">
                  <Card book={book} />
                </div>
              ))}
            </div>
          </section>

          {/* New Releases Section */}
          <section className="mb-20 animate-fade-in-up delay-200">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">New Releases</h2>
              </div>
              <Link
                to="/search?category=new"
                className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group"
              >
                View All
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newReleases.map((book) => (
                <div key={book.id} className="transform hover:-translate-y-2 transition-transform duration-300">
                  <Card book={book} />
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mb-20 animate-fade-in-up delay-300">
            <h2 className="text-2xl font-bold text-center mb-12">What Our Readers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="animate-fade-in-up delay-400">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter for the latest book releases and exclusive offers.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input input-bordered flex-1 max-w-md"
                    required
                  />
                  <button type="submit" className="btn btn-primary gap-2">
                    Subscribe
                    <Mail className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Add these styles to your CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }

        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
      `}</style>
    </div>
  );
}
