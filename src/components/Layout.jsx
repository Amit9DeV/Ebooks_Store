import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <div className="px-20">
        {children}
      </div>
    </div>
  );
} 