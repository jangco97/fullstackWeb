import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../../../components/ImageSlider';
const CardItem = ({ product }) => {
  return (
    <div className='border-[1px] border-blue-300'>
      <ImageSlider images={product.images} />
      <Link to={`/product/${product._id}`}>
        <p className='p-1 text-xs text-blue-950'>제목:{product.title}</p>
        <p className='p-1 text-xs text-blue-950'>학과:{product.department}</p>
        <p className='p-1 text-xs text-blue-950'>가격: {product.price}원</p>
      </Link>
    </div>
  );
};

export default CardItem;
