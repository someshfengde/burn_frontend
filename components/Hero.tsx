'use client';

import Image from 'next/image';
import NavLink from './NavLink';

let heroImages = ['/1.png', '/6.png', '/3.png', '/4.png', '/5.png', '/2.png'];
export default function Hero() {
  return (
      <div className="custom-screen pt-28 text-gray-600">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl text-gray-800 font-extrabold mx-auto sm:text-6xl">
            Manage your fitness like a pro
          </h1>
          <br></br>
          <br></br>
          
          <p className="max-w-xl mx-auto">
            Burn makes it simple to calculate calories and track your workouts.
          </p>
          <div className="flex items-center justify-center gap-x-3 font-medium text-sm">
            <NavLink
              href="/start"
              className="text-white bg-gray-800 hover:bg-gray-600 active:bg-gray-900"
            >
              Let's get started
            </NavLink>
          </div>
        </div>
      </div>
  );
}
