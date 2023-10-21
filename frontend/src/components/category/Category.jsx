import React from 'react';
import download from '../../assets/images/download.png';

const Category = (props) => {
  return (
    
    <div className='bg-[#fff] p-4 hover:bg-[#8686d5] hover:text-[#fff] border-radius  '>
    <div className='flex flex-col justify-center  p-4'>
    <img src={download} alt="download" className='h-[5rem] w-[5rem] custom-category   m-auto '/>
    <button> <h2 className='text-[#000] font-poppins font-headersubtxt font-normal '>{props.category}</h2></button>
   
    </div>
    <button>
   <p className='text-[#000]font-poppins font-headersubtxt font-normal '>{props.job} Jobs Avaiable</p></button>
      <style jsx>{`
        .custom-category {
         border-radius:50%;
        }
        .border-radius{
          border-radius:1.25rem;
        }
      `}</style>
    </div>
  );
};

export default Category;
