import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="">
      <div className="navbar container mx-auto">
        <div className="flex-1"></div>
        <div className="flex-none">
          <Link to="/" className="text-xl font-bold text-center">
            TravelClub
          </Link>
        </div>
        <div className="flex-1"></div>
      </div>
    </header>
  );
}

export default Header;
