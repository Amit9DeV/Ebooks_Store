import React, { useEffect, useState } from "react";
const BooksCard = React.lazy(() => import("../components/BooksCard"));
import LoadingBar from "@/components/Loading";
import { ArrowRight, BookOpen, Users, Star } from "lucide-react";

export default function Home() {
  const [Loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setIsVisible(true);
    }, 1000);
  }, []);

  const stats = [
    { icon: <BookOpen className="h-6 w-6" />, value: "10K+", label: "Books Available" },
    { icon: <Users className="h-6 w-6" />, value: "2K+", label: "Active Readers" },
    { icon: <Star className="h-6 w-6" />, value: "4.8", label: "Average Rating" },
  ];

  if (Loading) {
    return <LoadingBar />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className={`flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 mb-20 opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}>
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-white dark:bg-gray-800 shadow-sm">
              <span className="animate-pulse bg-primary/20 rounded-full h-2 w-2 mr-2"></span>
              <span>New books added every week</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
              Discover Your Next
              <span className="bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent animate-gradient"> Favorite Book</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-up">
              Explore our vast collection of digital books. From bestsellers to rare finds, 
              we have something for every reader. Start your reading journey today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up delay-200">
              <div className="flex-1 group">
                <label className="input input-bordered flex items-center gap-2 bg-white dark:bg-gray-800 shadow-sm group-hover:shadow-md transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70 group-hover:text-primary transition-colors"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input 
                    type="email" 
                    className="grow bg-transparent" 
                    placeholder="Enter your email" 
                  />
                </label>
              </div>
              <button className="btn btn-primary px-8 group hover:scale-105 transition-all duration-300">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 pt-8 animate-fade-in-up delay-300">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex justify-center text-primary mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 animate-float">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative">
                <img
                  className="rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  src="./tinified/HomeBanner.jpg"
                  alt="Books collection"
                />
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg animate-float delay-100">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg animate-float delay-200">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Books Section */}
        <div className="py-12 space-y-8">
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="text-3xl font-bold">
              Featured Books
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our handpicked selection of must-read books, from timeless classics to contemporary bestsellers.
            </p>
          </div>
          <React.Suspense fallback={<LoadingBar />}>
            <BooksCard />
          </React.Suspense>
        </div>
      </div>

      {/* Add these styles to your CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animate-fade-in {
          animation: fade-in 1s forwards;
        }

        .animate-slide-up {
          animation: slide-up 1s forwards;
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: slide-up 1s forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
