"use client";

import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, Menu, X, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Delivery Partners
                </span>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link href="/support">
              <Button 
                variant="outline" 
                className="inline-flex items-center px-4 py-2 border-2 border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-xl font-medium"
              >
                <HelpCircle className="mr-2 h-4 w-4 text-blue-600" />
                <span>Support</span>
              </Button>
            </Link>
            
            <Link href="/auth">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-2 rounded-xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <LogIn className="mr-2 h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
          </div>
          
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-500 ease-in-out",
        isMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="pt-2 pb-3 space-y-3 px-4 transform transition-all duration-300 delay-100">
          <Link href="/support" className="block transform transition-all duration-200 hover:scale-105">
            <Button 
              variant="outline" 
              className="w-full justify-center border-2 border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-xl font-medium transition-all duration-200"
            >
              <HelpCircle className="mr-2 h-4 w-4 text-blue-600" />
              <span>Support</span>
            </Button>
          </Link>
          
          <Link href="/auth" className="block transform transition-all duration-200 hover:scale-105">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl font-medium transition-all duration-200"
            >
              <LogIn className="mr-2 h-4 w-4" />
              <span>Login</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
