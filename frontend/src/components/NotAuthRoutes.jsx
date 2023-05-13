//로그인이 된 사람이 로그인이나 회원가입 페이지 입장시 메인페이지로 들어가면 리다이렉트시킴
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const NotAuthRoutes = ({ isAuth }) => {
  return isAuth ? <Navigate to={'/'} /> : <Outlet />;
};

export default NotAuthRoutes;
