import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Slider from "react-slick";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Loader2, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

function CustomArrow({ direction, onClick }) {
  const isLeft = direction === "left";
  const Icon = isLeft ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${
        isLeft ? "-left-12" : "-right-12"
      } z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:scale-110 transition-transform hidden md:flex items-center justify-center group`}
      aria-label={isLeft ? "Previous" : "Next"}
    >
      <Icon className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors" />
    </button>
  );
}

export default function BooksCard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function fetchData() {
    try {
      setIsRefreshing(true);
      const res = await axios.get("https://ebooks-store-backend.onrender.com");
      setData(res.data);
      setError(null);
    } catch (error) {
      setError(error.message || "Failed to fetch books");
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filteredBooks = data.filter((item) => item.price === 0);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-gray-600 dark:text-gray-300 animate-pulse">Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center max-w-2xl mx-auto">
        <p className="text-red-600 dark:text-red-400 text-lg mb-4">
          {error}
        </p>
        <button 
          onClick={fetchData}
          className="btn btn-error btn-sm gap-2 group"
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          {isRefreshing ? 'Refreshing...' : 'Try Again'}
        </button>
      </div>
    );
  }

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
          No free books available at the moment.
        </p>
        <button 
          onClick={fetchData}
          className="btn btn-primary btn-sm gap-2"
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: filteredBooks.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4">
      <div className="relative px-4 md:px-12">
        <Slider {...settings} className="books-slider">
          {filteredBooks.map((item, index) => (
            <div 
              key={uuidv4()} 
              className="px-2 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card book={item} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Add these styles to your CSS */}
      <style jsx>{`
        :global(.books-slider .slick-dots) {
          bottom: -40px;
        }

        :global(.books-slider .slick-dots li button:before) {
          font-size: 8px;
          color: var(--primary);
          opacity: 0.3;
          transition: all 0.3s ease;
        }

        :global(.books-slider .slick-dots li.slick-active button:before) {
          opacity: 1;
          transform: scale(1.5);
        }

        @keyframes fade-in {
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
      `}</style>
    </div>
  );
}
