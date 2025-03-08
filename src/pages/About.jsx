import React from 'react';
import { 
  BookOpen, 
  Users, 
  Star, 
  Award,
  BookMarked,
  GraduationCap,
  Target,
  Heart
} from 'lucide-react';

export default function About() {
  const stats = [
    { icon: <BookMarked className="h-6 w-6" />, value: "50K+", label: "Books Available" },
    { icon: <Users className="h-6 w-6" />, value: "100K+", label: "Active Readers" },
    { icon: <Star className="h-6 w-6" />, value: "4.8", label: "Average Rating" },
    { icon: <Award className="h-6 w-6" />, value: "15+", label: "Years of Service" },
  ];

  const values = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Knowledge for All",
      description: "Making quality education and literature accessible to everyone.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Innovation",
      description: "Continuously evolving our platform to enhance the reading experience.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Community",
      description: "Building a vibrant community of book lovers and learners.",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Excellence",
      description: "Committed to providing the highest quality educational resources.",
    },
  ];

  const team = [
    {
      name: "John Smith",
      role: "Founder & CEO",
      image: "https://source.unsplash.com/300x300/?portrait,man,1",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Content",
      image: "https://source.unsplash.com/300x300/?portrait,woman,1",
    },
    {
      name: "Michael Chen",
      role: "Tech Lead",
      image: "https://source.unsplash.com/300x300/?portrait,man,2",
    },
    {
      name: "Emily Brown",
      role: "Customer Success",
      image: "https://source.unsplash.com/300x300/?portrait,woman,2",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-6">About BookStore</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            We're on a mission to make knowledge accessible to everyone. Our digital bookstore 
            brings together readers, authors, and knowledge seekers from around the world.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 animate-fade-in-up delay-200">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800/50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-primary flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-in-up delay-300">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Founded in 2008, BookStore began with a simple idea: to make quality books and 
                educational resources accessible to everyone, anywhere in the world.
              </p>
              <p>
                What started as a small online bookshop has grown into a global platform serving 
                millions of readers, students, and knowledge enthusiasts across the globe.
              </p>
              <p>
                Today, we continue to innovate and expand our services, always keeping our core 
                mission at heart - spreading knowledge and fostering a love for reading.
              </p>
            </div>
          </div>
          <div className="relative animate-fade-in-up delay-400">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-primary-600 rounded-xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000"></div>
            <img 
              src="https://source.unsplash.com/800x600/?library,books" 
              alt="Our Story" 
              className="rounded-xl relative shadow-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up delay-500">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800/50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="text-primary inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up delay-700">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div 
                key={index}
                className="group bg-white dark:bg-gray-800/50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover relative transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add these styles to your CSS */}
      <style jsx>{`
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

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }

        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
      `}</style>
    </div>
  );
} 