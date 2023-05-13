import React from 'react';
import * as S from './RegisterPage.styles';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/thunkFunctions';
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();
  const onSubmit = ({ email, name, password }) => {
    const body = {
      email,
      password,
      name,
      image: `https://via.placeholder.com/600x400?text=no+user+image`,
    };

    dispatch(registerUser(body));

    reset();
  };
  const userName = {
    required: '이름을 입력해주세요.',
  };
  const userEmail = {
    required: '이메일을 입력해주세요.',
  };
  const userPassword = {
    required: '비밀번호를 입력해주세요.',
    minLength: {
      value: 6,
      message: '6자리 이상으로 작성해주세요.',
    },
  };

  return (
    <S.Wrapper>
      <S.Title>회원가입</S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-2'>
          <label htmlFor='email' className='text-sm font-semibold text-gray-800'>
            Email
          </label>
          <input
            type='email'
            id='email'
            className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
            {...register('email', userEmail)}
          />
          {errors?.email && (
            <div>
              <span className='text-red-500'>{errors.email.message}</span>
            </div>
          )}
        </div>

        <div className='mb-2'>
          <label htmlFor='name' className='text-sm font-semibold text-gray-800'>
            Name
          </label>
          <input
            type='text'
            id='name'
            className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
            {...register('name', userName)}
          />
          {errors?.name && (
            <div>
              <span className='text-red-500'>{errors.name.message}</span>
            </div>
          )}
        </div>

        <div className='mb-2'>
          <label htmlFor='password' className='text-sm font-semibold text-gray-800'>
            Password
          </label>
          <input
            type='password'
            id='password'
            className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
            {...register('password', userPassword)}
          />
          {errors?.password && (
            <div>
              <span className='text-red-500'>{errors.password.message}</span>
            </div>
          )}
        </div>

        <div className='mt-6'>
          <button
            type='submit'
            className='w-full px-4 py-2 text-white duration-200 bg-black rounded-md hover:bg-gray-700'>
            회원가입
          </button>
        </div>

        <p className='mt-8 text-xs font-light text-center text-gray-700'>
          아이디가 있다면?{' '}
          <a href='/login' className='font-medium hover:underline'>
            로그인
          </a>
        </p>
      </S.Form>
    </S.Wrapper>
  );
};

export default RegisterPage;
