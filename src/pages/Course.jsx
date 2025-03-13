import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { lazy } from "react";
const BooksCard_Course = React.lazy(()=>import("../components/BookCard_Course"))
import LoadingSpinner from "../components/LoadingSpinner";
import { searchBooks } from '../services/api';
import Card from '../components/Card';
import { BookOpen, Code, GraduationCap, Database, Globe, Terminal, Server, Cpu } from 'lucide-react';

export default function Course() {
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const courseCategories = [
    {
      id: 'programming',
      title: 'Programming',
      icon: <Code className="w-6 h-6" />,
      query: 'programming+development',
      description: 'Learn programming languages and software development'
    },
    {
      id: 'webdev',
      title: 'Web Development',
      icon: <Globe className="w-6 h-6" />,
      query: 'web+development+javascript',
      description: 'Master web technologies and frameworks'
    },
    {
      id: 'database',
      title: 'Database',
      icon: <Database className="w-6 h-6" />,
      query: 'database+sql+nosql',
      description: 'Explore database management and design'
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: <Server className="w-6 h-6" />,
      query: 'backend+development+server',
      description: 'Learn server-side programming and APIs'
    },
    {
      id: 'ai',
      title: 'AI & Machine Learning',
      icon: <Cpu className="w-6 h-6" />,
      query: 'artificial+intelligence+machine+learning',
      description: 'Dive into AI, ML, and data science'
    },
    {
      id: 'devops',
      title: 'DevOps',
      icon: <Terminal className="w-6 h-6" />,
      query: 'devops+cloud+computing',
      description: 'Learn about DevOps practices and tools'
    }
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const courseData = {};
        for (const category of courseCategories) {
          const books = await searchBooks(category.query);
          courseData[category.id] = books.slice(0, 4);
        }
        setCourses(courseData);
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center p-4">
        <GraduationCap className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Error Loading Courses</h1>
        <p className="text-muted-foreground mb-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Learn & Grow with Our Courses
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our comprehensive collection of programming and technology books to enhance your skills.
          </p>
        </div>

        {/* Course Categories */}
        {courseCategories.map((category, index) => (
          <section 
            key={category.id} 
            className="mb-16 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                {category.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{category.title}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses[category.id]?.map((book) => (
                <Card key={book.id} book={book} />
              ))}
            </div>
          </section>
        ))}
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
      `}</style>
    </div>
  );
}
