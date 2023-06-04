import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import DaumPostcode from 'react-daum-postcode';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import FileUpload from '../../components/FileUpload';
const departments = [
  { key: 1, value: '컴퓨터공학과' },
  { key: 2, value: '전자전기공학과' },
  { key: 3, value: '토목환경공학과' },
  { key: 4, value: '고분자시스템공학과' },
  { key: 5, value: '건축학과' },
  { key: 6, value: '기계공학과' },
  { key: 7, value: '화학공학과' },
  { key: 8, value: '소프트웨어학과' },
  { key: 9, value: '정보통계학과' },
  { key: 10, value: '모바일시스템공학과' },
  { key: 11, value: '국어국문학과' },
  { key: 12, value: '사학과' },
  { key: 13, value: '철학과' },
  { key: 14, value: '영미인문학과' },
  { key: 15, value: '법학과' },
  { key: 16, value: '정치외교학과' },
  { key: 17, value: '행정학과' },
  { key: 18, value: '상담학과' },
  { key: 19, value: '미디어커뮤니케이션학과' },
  { key: 20, value: '무역학과' },
  { key: 21, value: '경제학과' },
  { key: 22, value: '경영학과' },
];

const UploadProductPage = ({ edit }) => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    department: 1,
    images: [],
    address: '',
    addressDetail: '',
  });

  const userData = useSelector(state => state.user?.userData);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    // 수정 상태인 경우, 기존 데이터를 불러온 후 상태 업데이트
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axiosInstance.get(`/products/${productId}?type=single`);
          const productData = response.data[0];
          setProduct(prevState => ({
            ...prevState,
            title: productData.title,
            description: productData.description,
            price: productData.price,
            department: productData.department,
            images: productData.images,
            address: productData.address,
            addressDetail: productData.addressDetail,
          }));
        } catch (error) {
          console.error(error);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  const handleChange = event => {
    const { name, value } = event.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const { title, description, price } = product;
    if (!title) {
      alert('상품 제목을 입력하세요');
    }
    if (!description) {
      alert('상품 내용을 입력하세요');
    }
    if (!price || price <= 0) {
      alert('상품 가격을 입력하세요(1원 이상)');
    }
    if (title && description && price) {
      const body = {
        writer: userData.id,
        ...product,
      };
      try {
        if (productId) {
          // 수정 상태인 경우, 수정 요청 보내기
          await axiosInstance.patch(`/products/${productId}`, body);
        } else {
          // 새로운 상품 업로드 요청 보내기
          await axiosInstance.post('/products', body);
        }
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleImages = newImages => {
    setProduct(prevState => ({
      ...prevState,
      images: newImages,
    }));
  };
  const onClickAddressSearch = event => {
    event.preventDefault();
    setIsOpen(prev => !prev);
  };
  const onCompleteAddressSearch = data => {
    setProduct(prevState => ({
      ...prevState,
      address: data.address,
    }));
    console.log(data);
    setIsOpen(prev => !prev);
  };
  return (
    <>
      {isOpen && (
        <Modal
          title='대한민국 주소'
          open={true}
          onOk={onClickAddressSearch}
          onCancel={onClickAddressSearch}>
          <DaumPostcode onComplete={onCompleteAddressSearch} />
        </Modal>
      )}
      <section>
        <div className='text-center m-7'>
          <h1>중고 상품 업로드</h1>
        </div>
        <form className='mt-6' onSubmit={handleSubmit}>
          <FileUpload images={product.images} onImageChange={handleImages} />
          <div className='mt-4'>
            <label>상품 제목</label>
            <input
              className='w-full px-4 py-2 bg-white border rounded-md'
              name='title'
              id='title'
              onChange={handleChange}
              value={product.title}
            />
          </div>
          <div className='mt-4'>
            <label>상품 설명</label>
            <input
              className='w-full px-4 py-2 bg-white border rounded-md'
              name='description'
              id='description'
              onChange={handleChange}
              value={product.description}
            />
          </div>
          <div className='mt-4'>
            <label>상품 가격</label>
            <input
              className='w-full px-4 py-2 bg-white border rounded-md'
              name='price'
              id='price'
              onChange={handleChange}
              value={product.price}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='department'>학과 카테고리</label>
            <select
              className='w-full px-4 mt-2 bg-white border rounded-md'
              name='department'
              id='department'
              onChange={handleChange}
              value={product.department}>
              {departments.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
          <div className='mt-4'>
            <label>주소</label>
            <div className='flex '>
              <button
                className='w-32 h-30 bg-black cursor-pointer text-white'
                onClick={onClickAddressSearch}>
                우편번호 검색
              </button>
            </div>
            <input className='w-full h-34 mt-3 pl-3 border' readOnly value={product?.address} />
            <input
              className='w-full h-34 mt-3 pl-3 border'
              name='addressDetail'
              onChange={handleChange}
              value={product.addressDetail}
            />
          </div>
          <button
            type='submit'
            className='w-full px-4 mt-4 text-white bg-black rounded-md hover:bg-blue-400 py-2'>
            등록하기
          </button>
        </form>
      </section>
    </>
  );
};

export default UploadProductPage;
