import React, { useState } from 'react';
import CardContainer from './Card';
import { PieChart } from './PieChart';
import JobLists from '../joblists/JobLists';

const Dashboard = () => {
  const [totalJobs, setTotalJobs] = useState(0);
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const [inactiveJobsCount, setInactiveJobsCount] = useState(0);

  // Function to update totalJobs
  const updateTotalJobs = (total) => {
    setTotalJobs(total);
  };

  // Function to update active and inactive job counts
  const updateActiveInactiveCounts = (activeCount, inactiveCount) => {
    setActiveJobsCount(activeCount);
    setInactiveJobsCount(inactiveCount);
  };

  return (
    <div className='w-full'>
      <h1 className='text-center text-[#2b6cb0]  font-poppins font-bold text-[1rem] leading-6 p-3'>
        AntiBug Pvt.Ltd
      </h1>
      <div className='w-[90%]  m-auto p-2'>
        <CardContainer totalJobs={totalJobs} updateTotalJobs={updateTotalJobs} inactiveJobsCount={inactiveJobsCount} />
        <div className='flex flex-col md:flex md:flex-row justify-center items-center border'>
          <div className='h-full md:w-[30%]  shadow-lg p-2'> <PieChart activeJobsCount={activeJobsCount} inactiveJobsCount={inactiveJobsCount} /></div>
          <div className='sm:block hidden'><JobLists updateTotalJobs={updateTotalJobs} updateActiveInactiveCounts={updateActiveInactiveCounts} /></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
