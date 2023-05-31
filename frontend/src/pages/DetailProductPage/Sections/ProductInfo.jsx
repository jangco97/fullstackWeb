import React from 'react';
import { department } from '../../../utils/filterData';
const ProductInfo = ({ userData, product }) => {
  return (
    <div>
      <div>
        <div className='flex items-center mb-10'>
          <img className='h-10 w-10 rounded-full mr-3' src={userData.image} alt='사용자이미지' />
          <div className='text-base font-bold mr-3'>작성자: {userData.name}</div>
          {/* <span>{getDate(product.createdAt)}</span> */}
        </div>
      </div>
      <hr
        style={{
          color: 'gray',
          backgroundColor: 'gray',
          height: 5,
          marginBottom: '30px',
        }}
      />
      <p className='text-3xl font-bold mb-10'>{product.title}</p>
      <p className='mb-10 font-light text-2xl'>
        학과: {department[Number(product.department)].name}
      </p>
      <p className='mb-10 font-light text-2xl'>가격: {product.price}원</p>
      <div className='text-xl'>{product.description}</div>
      <div className='mt-3'></div>
    </div>
  );
};

export default ProductInfo;
