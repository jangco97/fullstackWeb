import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../../../components/ImageSlider';
import { department } from '../../../utils/filterData';
const CardItem = ({ product }) => {
  return (
    <div className='border-[8px] group relative'>
      <Link to={`/product/${product._id}`}>
        <ImageSlider images={product.images} />

        <div className=' pt-4 first-line:flex flex-col'>
          <p className='p-1 text-xl text-blue-950'>제목:{product.title}</p>
          <p className='p-1 text-xl text-blue-950'>
            학과:{department[Number(product.department)].name}
          </p>
          <p className='pt-1 pl-1 pb-2 text-xl text-blue-950'>가격: {product.price}원</p>
        </div>
      </Link>
    </div>
  );
};

export default CardItem;
