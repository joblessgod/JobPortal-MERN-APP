import React from 'react';
import Category from '../category/Category';

const Categories = () => {
  return (
    <div className='bg-[#F6F7FA] p-6'>
      <h1 className='text-[#000] font-poppins text-[1.875rem] mt-0 py-8 font-[600]'>
        Popular Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2">
        <Category category="Marketing & Communication" job="237" />
        <Category category="Design & Development" job="237" />
        <Category category="Human Research & Development" job="237" />
        <Category category="Government Jobs" job="237" />
        <Category category="Business & Consulting" job="237" />
        <Category category="Customer Support Care" job="237" />
      </div>
    </div>
  );
};

export default Categories;
