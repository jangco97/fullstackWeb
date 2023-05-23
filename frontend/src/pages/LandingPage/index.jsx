import React, { useEffect, useState } from 'react';
import PriceCheckBox from './Sections/PriceCheckBox';
import SearchInput from './Sections/SearchInput';
import CardItem from './Sections/CardItem';
import axiosInstance from '../../utils/axios';
import DepartmentCheckBox from './Sections/DepartmentCheckBox';
import { department, price } from '../../utils/filterData';
const LandingPage = () => {
  const limit = 4;
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    department: [],
    price: [],
  });

  useEffect(() => {
    fetchProducts({ skip, limit });
  }, []);

  const fetchProducts = async ({
    skip,
    limit,
    loadMore = false,
    filters = {},
    searchTerm = '',
  }) => {
    const params = {
      skip,
      limit,
      filters,
      searchTerm,
    };
    try {
      const response = await axiosInstance.get('/products', { params });
      if (loadMore) {
        setProducts([...products, ...response.data.products]);
      } else {
        setProducts(response.data.products);
      }
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters,
      searchTerm,
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  const handleFilters = (newFilteredData, category) => {
    const newFilters = { ...filters };
    newFilters[category] = newFilteredData;
    if (category === 'price') {
      const priceValues = handlePrice(newFilteredData);
      newFilters[category] = priceValues;
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };
  const handlePrice = value => {
    let array = [];

    for (let key in price) {
      if (price[key]._id === parseInt(value, 10)) {
        array = price[key].array;
      }
    }
    return array;
  };

  const showFilteredResults = filters => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm,
    };
    fetchProducts(body);
    setSkip(0);
  };
  const handleSearchTerm = event => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm: event.target.value,
    };
    setSkip(0);
    setSearchTerm(event.target.value);
    fetchProducts(body);
  };
  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>중고 상품 페이지</h2>
      </div>
      {/* filter */}
      <div className='flex gap-3'>
        <div className='w-1/2'>
          <DepartmentCheckBox
            department={department}
            checkedDepartment={filters.department}
            onFilters={filters => handleFilters(filters, 'department')}
          />
        </div>
        <div className='w-1/2'>
          <PriceCheckBox
            price={price}
            checkedPrice={filters.price}
            onFilters={filters => handleFilters(filters, 'price')}
          />
        </div>
      </div>
      {/* search */}
      <div className='flex justify-center mb-3'>
        <SearchInput searchTerm={searchTerm} changeSearch={handleSearchTerm} />
      </div>
      {/* card */}
      <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {products.map(product => (
          <CardItem product={product} key={product._id} />
        ))}
      </div>
      {/* load more */}
      {hasMore && (
        <div className='flex justify-center'>
          <button
            onClick={handleLoadMore}
            className='px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-blue-400'>
            더 보기
          </button>
        </div>
      )}
    </section>
  );
};

export default LandingPage;
