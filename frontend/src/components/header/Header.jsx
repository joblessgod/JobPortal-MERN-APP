import React,{useEffect, useState} from 'react';
import glass from '../../assets/images/okk.jpg';
import Button from '../../global/Button';
import { useNavigate } from 'react-router-dom';
import JobPost from '../jobpost/JobPost';
import { Link } from 'react-router-dom';


const Header = () => {
  
 const [searchTerm,setSearchTerm] = useState("")
 const navigate = useNavigate();
const handleSubmit=(e)=>{
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search
    );
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
};
useEffect(()=>{
  const urlParams = new  URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get('searchTerm');
  if(searchTermFromUrl){
    setSearchTerm(searchTermFromUrl)
  }
},[location.search]);
  return (
    <div className='bg-[#F6F7FA] flex flex-col md:flex-row border-0'>
      <div className='md:w-1/2 p-8'>
        <h1 className='text-[#000] font-bold font-poppins text-[1rem]  text-left sm:text-[2rem] md:text-headertxt  lg:text-headertxt lg:leading-1'>
          Find A <span className='text-button'>Job</span> That <span className='text-button'>Matches</span> Your Passion
        </h1>
        <p className='text-left text-[#616161] font-poppins font-headersubtxt font-400 mt-4'>
          Hand-Picked opportunities to work from home, remotely, freelance, full-time, part-time, contract, and internships.
        </p>
        <form onSubmit={handleSubmit} className='mt-4 md:mt-16 flex'>
          <input
            type='text'
            name='search'
            value={searchTerm}
            id='search'
            placeholder='Search by job title...'
            className='focus:outline-none text-center font-700 font-[1.125rem] w-full md:w-auto md:max-w-[350px] placeholder-[#AEB0B4]'
          onChange={(e)=>setSearchTerm(e.target.value)}
           
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
