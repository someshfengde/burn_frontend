import { Heart } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-100">
    <div className="custom-screen py-12">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3">
          <Heart 
            className="text-red-500 animate-pulse" 
            size={24} 
          />
          <p className="text-gray-600 text-sm md:text-base">
            Crafted with passion by dedicated developers
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <a
            href="https://v0.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group 
              flex 
              items-center 
              gap-2 
              bg-white 
              border 
              border-gray-200 
              rounded-full 
              px-4 
              py-2 
              text-sm 
              font-medium 
              text-gray-700 
              shadow-sm 
              hover:bg-gray-50 
              hover:shadow-md 
              transition-all 
              duration-300
            "
          >
            <span>Built with ❤️</span>
            
            
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;