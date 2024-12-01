'use client';

import { useState } from 'react';
import { Home, Flame, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { title: 'Homepage', path: '/', icon: Home },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('overflow-hidden');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="custom-screen relative py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <Flame 
              className="text-orange-500 group-hover:rotate-12 transition-transform duration-300" 
              size={28} 
            />
            <span className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
              Burn
            </span>
          </a>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`
              fixed inset-0 bg-white md:static md:block md:bg-transparent
              ${isMenuOpen ? 'block' : 'hidden'}
            `}
          >
            <ul className="flex flex-col md:flex-row items-center justify-center md:justify-end h-full gap-6 md:gap-4 p-6 md:p-0">
              {navigation.map((item, idx) => (
                <li 
                  key={idx}
                  className="text-center md:text-left"
                >
                  <a 
                    href={item.path} 
                    className="
                      flex items-center gap-2 text-lg md:text-base 
                      text-gray-700 hover:text-orange-600 
                      transition-colors group
                    "
                  >
                    <item.icon 
                      size={20} 
                      className="group-hover:text-orange-500 transition-colors" 
                    />
                    {item.title}
                  </a>
                </li>
              ))}
              
              <li className="mt-4 md:mt-0 w-full md:w-auto">
                <a
                  href="/start"
                  className="
                    block w-full md:inline-block text-center px-6 py-2.5 
                    bg-orange-500 text-white font-medium rounded-full
                    hover:bg-orange-600 focus:bg-orange-700 
                    transition-colors shadow-md hover:shadow-lg
                  "
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

