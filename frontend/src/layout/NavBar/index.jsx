import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavItems from './Sections/NavItems';
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };
  return (
    <nav className='relative z-10 bg-blue-300'>
      <div className='w-full'>
        <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
          {/* logo */}
          <div className='flex items-center text-2xl h-20'>
            <Link to='/'>대학서사</Link>
          </div>

          {/* menu button */}
          <div className='text-2xl sm:hidden'>
            <button onClick={handleMenu}>{menu ? '-' : '+'}</button>
          </div>

          {/* big screen */}
          <div className='hidden sm:block'>
            {' '}
            <NavItems />
          </div>
        </div>

        {/* mobile */}
        <div className='block sm:hidden'>{menu && <NavItems mobile />}</div>
      </div>
    </nav>
  );
};

export default Navbar;
