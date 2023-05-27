import React from 'react';

const PriceCheckBox = ({ price, checkedPrice, onFilters }) => {
  return (
    <div className='p-3'>
      {price?.map(item => (
        <div key={item._id}>
          <input
            checked={checkedPrice === item.array}
            onChange={e => onFilters(e.target.value)}
            type='radio'
            id={item._id}
            value={item._id}
          />{' '}
          <label htmlFor={item._id}>{item.name}</label>
        </div>
      ))}
    </div>
  );
};

export default PriceCheckBox;
