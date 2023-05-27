import React, { useEffect, useState } from 'react';
import PriceCheckBox from './Sections/PriceCheckBox';
import SearchInput from './Sections/SearchInput';
import CardItem from './Sections/CardItem';
import axiosInstance from '../../utils/axios';
import DepartmentCheckBox from './Sections/DepartmentCheckBox';
import { department, price } from '../../utils/filterData';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }
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
      {/* filter */}
      <div className='flex gap-[300px] bg-gray-100 justify-center p-7 mb-10'>
        <div>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                학과 카테고리
                <ChevronDownIcon className='-mr-1 h-5 w-5 text-gray-400' aria-hidden='true' />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'>
              <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <DepartmentCheckBox
                    department={department}
                    checkedDepartment={filters.department}
                    onFilters={filters => handleFilters(filters, 'department')}
                  />
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                가격 카테고리
                <ChevronDownIcon className='-mr-1 h-5 w-5 text-gray-400' aria-hidden='true' />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'>
              <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <PriceCheckBox
                    price={price}
                    checkedPrice={filters.price}
                    onFilters={filters => handleFilters(filters, 'price')}
                  />
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
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
