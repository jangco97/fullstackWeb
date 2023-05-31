import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/thunkFunctions';
import React from 'react';
const navigation = [
  { name: '홈', to: '/' },
  { name: '업로드', to: 'product/upload' },
  { name: '장바구니', to: '/user/cart' },
  { name: '주문목록', to: '#' },
  { name: '문의하기', to: '#' },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const [select, setSelect] = useState('홈');
  const handleClick = name => {
    setSelect(name);
  };
  const navigate = useNavigate();
  const isAuth = useSelector(state => state.user?.isAuth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logoutUser()).then(() => {
        navigate('/login');
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-[200px] items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <img
                    className='block h-[120px] w-auto lg:hidden'
                    src={'/image/mainicon.png'}
                    alt='Your Company'
                  />
                  <img
                    className='hidden h-[120px] w-auto lg:block'
                    src={'/image/mainicon.png'}
                    alt='Your Company'
                  />
                </div>
                <div className='hidden sm:ml-6 sm:flex items-center'>
                  <div className='flex space-x-3'>
                    {navigation.map(item => {
                      if (!isAuth) return null;
                      return (
                        <div key={item.name}>
                          <Link to={item.to}>
                            <div
                              className={classNames(
                                item.name === select
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                              aria-current={item.name === select ? 'page' : undefined}
                              onClick={() => handleClick(item.name)}>
                              {item.name}
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* <button
                  type='button'
                  className='rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button> */}
                {/*로그인 회원가입 표시*/}
                <div>
                  {isAuth ? (
                    <Menu as='div' className='relative ml-3'>
                      <div>
                        <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                          <span className='sr-only'>Open user menu</span>
                          <img className='h-8 w-8 rounded-full' src={'/image/avatar.png'} alt='' />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'>
                        <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                                onClick={handleLogout}>
                                로그아웃
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <div className='flex '>
                      <div
                        key={'login'}
                        className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                        <Link to={'login'}>{'로그인'}</Link>
                      </div>
                      <div
                        key={'signup'}
                        className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                        <Link to={'register'}>{'회원가입'}</Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {navigation.map(item => (
                <div key={item.name}>
                  <Link to={item.to}>
                    <Disclosure.Button
                      as='div'
                      className={classNames(
                        item.name === select
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.name === select ? 'page' : undefined}
                      onClick={() => handleClick(item.name)}>
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
