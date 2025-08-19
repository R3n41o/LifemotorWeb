import React from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navigation />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Navigation isMobile />
      </div>

      {/* Main Content */}
      <div className="md:ml-64 mb-20 md:mb-0">
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};