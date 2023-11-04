import React from 'react';
import glass from '../../assets/images/okk.jpg';
import Button from '../../global/Button';
import JobPost from '../jobpost/JobPost';
import { Link } from 'react-router-dom';


const Header = () => {
  
 
 

  return (
    <div className='bg-[#F6F7FA] flex flex-col md:flex-row border-0'>
      <div className='md:w-1/2 p-8'>
        <h1 className='text-[#000] font-bold font-poppins text-[1rem]  text-left sm:text-[2rem] md:text-headertxt  lg:text-headertxt lg:leading-1'>
          Find A <span className='text-button'>Job</span> That <span className='text-button'>Matches</span> Your Passion
        </h1>
        <p className='text-left text-[#616161] font-poppins font-headersubtxt font-400 mt-4'>
          Hand-Picked opportunities to work from home, remotely, freelance, full-time, part-time, contract, and internships.
        </p>
        <form  className='mt-4 md:mt-16 flex'>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='Search by job title...'
            className='focus:outline-none text-center font-700 font-[1.125rem] w-full md:w-auto md:max-w-[350px] placeholder-[#AEB0B4]'
         
           
            />
          
          <Button msg='Search'  />
          
        </form>
      </div>
      <div className='md:w-1/2'>
        <img src={glass} alt='Glass' className='w-full h-auto md:h-[100%]' />
      </div>
    </div>
  );
};

export default Header;
