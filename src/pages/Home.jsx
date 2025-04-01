import React, { useEffect, useState } from "react";
import { searchBooks } from '../services/api';
import Card from '../components/Card';
import BookCover from '../components/BookCover';
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
  GraduationCap,
  Search,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
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
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden -mx-20">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] animate-[move_20s_linear_infinite]" />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-40 right-1/4 w-24 h-24 bg-accent/20 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between py-20 gap-12">
            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary">
                  Discover Your Next
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary/80 to-primary">
                  Favorite Book
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 animate-fade-in delay-100">
                Explore our vast collection of books across various genres and embark on your reading journey today.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative mb-8 animate-fade-in delay-200">
                <div className="relative max-w-xl mx-auto lg:mx-0">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for books, authors, or genres..."
                    className="w-full px-6 py-4 pr-12 rounded-full bg-card shadow-lg focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary btn-circle"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in delay-300">
                <Link
                  to="/search"
                  className="btn btn-primary btn-lg gap-2 group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25"
                >
                  Browse Books
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/Course"
                  className="btn btn-secondary btn-lg gap-2 group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-secondary/25"
                >
                  View Courses
                  <BookOpen className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <script type="text/javascript">
	atOptions = {
		'key' : 'e91df4237631f3e78b3e73acdc4980b0',
		'format' : 'iframe',
		'height' : 60,
		'width' : 468,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/e91df4237631f3e78b3e73acdc4980b0/invoke.js"></script>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left animate-fade-in delay-400">
                {[
                  { label: 'Books', value: '10K+' },
                  { label: 'Authors', value: '2K+' },
                  { label: 'Students', value: '50K+' },
                  { label: 'Reviews', value: '100K+' }
                ].map((stat, index) => (
                  <div key={stat.label} className="p-4">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Book Illustration */}
            <div className="flex-1 relative w-full max-w-xl mx-auto animate-fade-in delay-200">
              <div className="aspect-square relative">
                {/* Book cover shadow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-2xl animate-pulse" />
                
                {/* Floating books */}
                <div className="absolute inset-0">
                  <BookCover
                    image="/images/programming-book.svg"
                    title="Modern Programming"
                    position="left"
                  />
                  <BookCover
                    image="/images/design-book.svg"
                    title="Creative Design"
                    position="middle"
                  />
                  <BookCover
                    image="/images/business-book.svg"
                    title="Business Strategy"
                    position="right"
                  />
                </div>
              </div>
            </div>
          </div>
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
  );
}
