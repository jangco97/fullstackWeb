import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../../../components/ImageSlider';
const CardItem = ({ product }) => {
  return (
    <div className='border-[8px] border-blue-300 group relative'>
      <Link to={`/product/${product._id}`}>
        <ImageSlider images={product.images} />

        <div className=' pt-4 first-line:flex flex-col'>
          <p className='p-1 text-xm text-blue-950'>제목:{product.title}</p>
          <p className='p-1 text-xs text-blue-950'>학과:{product.department}</p>
          <p className='pt-1 pl-1 pb-2 text-xs text-blue-950'>가격: {product.price}원</p>
        </div>
      </Link>
    </div>
  );
};

export default CardItem;
