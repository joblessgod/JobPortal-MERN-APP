import React, { useState } from 'react';
import CardContainer from './Card';
import { PieChart } from './PieChart';
import { useSelector } from 'react-redux';
import PopularJobs from '../joblists/PopularJobs';
import AddCategory from '../category/AddCategory';
const Dashboard = ({onShowCategoryHandler}) => {
  const [totalJobs, setTotalJobs] = useState(0);
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const [inactiveJobsCount, setInactiveJobsCount] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
 
  /* Function to update totalJobs
  const updateTotalJobs = (total) => {
    setTotalJobs(total);
  };*/



  return (
    <div className='w-full'>
      <h1 className='text-center text-[#2b6cb0]  font-poppins font-bold text-[1rem] leading-6 p-3  bg-[whitesmoke]'>
        {currentUser.organizationname}
      </h1>
      <div className='w-[90%]  m-auto p-2'>
      
        <CardContainer    />
        <div className='flex flex-col md:flex md:flex-row justify-center items-center border'>
          <div className='h-full md:w-[30%]  shadow-lg p-2 items-start'> <PieChart activeJobsCount={activeJobsCount} inactiveJobsCount={inactiveJobsCount} /></div>
          <div className='sm:block hidden w-full h-[full] '><PopularJobs /></div>
        </div>
      </div>
    
    </div>
  );
};

export default Dashboard;
