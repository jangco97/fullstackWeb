import React from 'react';

const SearchInput = ({ searchTerm, changeSearch }) => {
  return (
    <input
      className='p-2 border border-blue-300 rounded-md'
      type='text'
      placeholder='상품을 검색하세요.'
      onChange={changeSearch}
      value={searchTerm}
    />
  );
};

export default SearchInput;
