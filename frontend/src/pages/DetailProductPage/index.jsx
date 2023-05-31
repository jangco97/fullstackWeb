import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import ProductComment from './Sections/ProductComment';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/thunkFunctions';
import { useSelector } from 'react-redux';
const DetailProductPage = () => {
  const userData = useSelector(state => state.user?.userData);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState(null);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addToCart({ productId: product._id }));
  };
  useEffect(() => {
    async function fetchComment() {
      try {
        const response = await axiosInstance.get(`/comments/${productId}`);
        setComment(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchComment();
  }, [productId]);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axiosInstance.get(`/products/${productId}?type=single`);
        setProduct(response.data[0]);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [productId]);

  if (!product) return null;
  return (
    <section>
      <div className='mt-40'>
        <div>
          <ProductInfo userData={userData} product={product} />
        </div>
        <div className='w-96 mx-auto mt-20 mb-20'>
          <ProductImage product={product} />
        </div>
        <div className='flex justify-center mb-20'>
          <button
            className='w-80 px-4 py-2 bg-black text-white hover:bg-blue-700 rounded-md'
            onClick={handleClick}>
            장바구니
          </button>
        </div>
      </div>
      <div>
        <ProductComment userData={userData} comments={comment} product={product} />
      </div>
    </section>
  );
};

export default DetailProductPage;
