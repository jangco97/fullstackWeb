import React from 'react';

const DepartmentCheckBox = ({ department, checkedDepartment, onFilters }) => {
  const handleToggle = departmentId => {
    //현재 누른 체크박스가 이미 누른 체크박스인지 체크
    const currentIndex = checkedDepartment.indexOf(departmentId);
    const newChecked = [...checkedDepartment];
    if (currentIndex === -1) {
      newChecked.push(departmentId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    onFilters(newChecked);
  };

  return (
    <div className='p-2 mb-3 bg-blue-300 rounded-md'>
      {department?.map(item => (
        <div key={item._id}>
          <input
            type='checkbox'
            onChange={() => handleToggle(item._id)}
            checked={checkedDepartment.indexOf(item._id) === -1 ? false : true}
          />{' '}
          <label>{item.name}</label>
        </div>
      ))}
    </div>
  );
};

export default DepartmentCheckBox;
