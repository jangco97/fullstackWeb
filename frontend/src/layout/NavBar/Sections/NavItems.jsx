import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../store/thunkFunctions';
import { ShoppingCartOutlined } from '@ant-design/icons';
const routes = [
  { to: '/login', name: '로그인', auth: false },
  { to: '/register', name: '회원가입', auth: false },
  { to: '/product/upload', name: '업로드', auth: true },
  {
    to: '/user/cart',
    name: '카트',
    auth: true,
    icon: <ShoppingCartOutlined style={{ fontSize: '1.5rem', color: '#08c' }} />,
  },
  { to: '', name: '로그아웃', auth: true },
  { to: '/history', name: '주문목록', auth: true },
];
const NavItems = ({ mobile }) => {
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
    <ul
      className={`text-md justify-center w-full flex gap-4 ${
        mobile && 'flex-col bg-blue-300 h-full'
      } items-center`}>
      {routes.map(({ to, name, auth, icon }) => {
        if (isAuth !== auth) return null;

        if (name === '로그아웃') {
          return (
            <li key={name} className='py-2 text-center border-b-4 cursor-pointer'>
              <Link onClick={handleLogout}>{name}</Link>
            </li>
          );
        } else if (icon) {
          return (
            <li className='relative py-2 text-center border-b-4 cursor-pointer' key={name}>
              <Link to={to}>
                {icon}
                <span className='absolute top-o inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -right-3'>
                  {1}
                </span>
              </Link>
            </li>
          );
        } else {
          return (
            <li key={name} className='py-2 text-center border-b-4 cursor-pointer'>
              <Link to={to}>{name}</Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default NavItems;
