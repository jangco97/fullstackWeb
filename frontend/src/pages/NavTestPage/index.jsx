// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import NavItems from './Sections/NavItems';
// // import { Fragment } from 'react';
// // import { Disclosure, Menu, Transition } from '@headlessui/react';
// // import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
// // const navigation = [
// //   { name: '홈으로', href: '/', current: true },
// //   { name: '업로드', href: 'product/upload', current: false },
// //   { name: '주문목록', href: '#', current: false },
// //   // { name: 'Calendar', href: '#', current: false },
// // ];
// // function classNames(...classes) {
// //   return classes.filter(Boolean).join(' ');
// // }
// const Navbar = () => {
//   const [menu, setMenu] = useState(false);
//   const handleMenu = () => {
//     setMenu(!menu);
//   };
//   return (
//     <nav className='relative z-10 bg-white-300'>
//       <div className='w-full h-30'>
//         <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
//           {/* logo */}
//           <div className='flex items-center text-2xl h-30'>
//             <Link to='/'>
//               <img src={'/image/mainicon.png'} alt={'아이콘'} />
//             </Link>
//           </div>

//           {/* menu button */}
//           <div className='text-2xl sm:hidden'>
//             <button onClick={handleMenu}>{menu ? '-' : '+'}</button>
//           </div>

//           {/* big screen */}
//           <div className='hidden sm:block'>
//             {' '}
//             <NavItems />
//           </div>
//         </div>

//         {/* mobile */}
//         <div className='block sm:hidden'>{menu && <NavItems mobile />}</div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
