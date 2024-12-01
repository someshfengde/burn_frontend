'use client';

import { Flame, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-white via-orange-50 to-white min-h-screen flex items-center">
      <div className="absolute top-0 left-0 right-0 opacity-10">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="text-orange-500 fill-current"
        >
          <path 
            fillOpacity="1" 
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,170.7C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320L192,320L96,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="custom-screen relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center mb-4 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-orange-600 font-medium">
            <Flame className="mr-2" size={20} />
            New way to track fitness
          </div>

          <h1 className="
            text-5xl md:text-7xl 
            font-black 
            text-transparent 
            bg-clip-text 
            bg-gradient-to-r 
            from-orange-500 
            to-red-600 
            leading-tight 
            mb-6
          ">
            Fitness Tracking 
            <br />
            Made Effortless
          </h1>

          <p className="
            text-xl 
            text-gray-600 
            max-w-2xl 
            mx-auto 
            mb-8 
            leading-relaxed
          ">
            Burn simplifies your fitness journey by providing intuitive calorie calculation and workout tracking. Transform your health with just a few taps.
          </p>

          <div className="flex justify-center items-center space-x-4">
            <a
              href="/start"
              className="
                flex 
                items-center 
                gap-2
                px-6 
                py-3 
                bg-gradient-to-r 
                from-orange-500 
                to-red-500 
                text-white 
                rounded-full 
                font-semibold 
                shadow-lg 
                shadow-orange-500/50 
                hover:scale-105 
                transition-all 
                duration-300 
                group
              "
            >
              Let&apos;s Get Started
              <ChevronRight 
                className="group-hover:translate-x-1 transition-transform" 
                size={20} 
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}