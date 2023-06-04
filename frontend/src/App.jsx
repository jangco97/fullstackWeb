import React, { useEffect } from 'react';
import './App.styles.js';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UploadProductPage from './pages/UploadPrductPage';
import DetailProductPage from './pages/DetailProductPage';
import CartPage from './pages/CartPage';
import HistoryPage from './pages/HistoryPage';
import Navbar from './layout/NavBar';
import Footer from './layout/Footer';
import * as S from './App.styles.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from './store/thunkFunctions.js';
import ProtectedPage from './pages/ProtectedPage/index.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import NotAuthRoutes from './components/NotAuthRoutes.jsx';
import TestPage from './pages/TestPage/index.jsx';

function Layout() {
  return (
    <S.Wrapper>
      <ToastContainer position='bottom-right' theme='light' pauseOnHover autoClose={1500} />
      <Navbar />
      <S.Main>
        <Outlet />
      </S.Main>
      <Footer />
    </S.Wrapper>
  );
}
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth);
  const { pathname } = useLocation();
  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* 로그인 상관없이 갈 수 있는 경로 */}
        <Route index element={<LandingPage />} />

        {/* 로그인 안하면 볼 수 없는 페이지 경로 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path='/protected' element={<ProtectedPage />} />
          <Route path='/product/upload' element={<UploadProductPage edit={false} />}></Route>
          <Route path='/product/:productId' element={<DetailProductPage />}></Route>
          <Route path='/user/cart' element={<CartPage />}></Route>
          <Route path='/history' element={<HistoryPage />}></Route>
          <Route path='/test' element={<TestPage />}></Route>
          <Route
            path='/product/edit/:productId'
            element={<UploadProductPage edit={true} />}></Route>
        </Route>
        {/* 로그인 하면 못감 */}
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          {' '}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
