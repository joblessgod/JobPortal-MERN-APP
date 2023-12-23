import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector,shallowEqual } from 'react-redux';
import { InfinitySpin } from 'react-loader-spinner';
import Loader from '../../global/Loader';
ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = () => {
  const { jobs,loading,error } = useSelector((state) => state.jobsLists, shallowEqual);
  // Calculate the number of active and inactive jobs
   const today = new Date();
  const activeJobs = jobs.filter(
    (job) => new Date(job.applicationdeadline) >= today
  );
  const inactiveJobs = jobs.filter(
    (job) => new Date(job.applicationdeadline) < today
  ); 


  const data = {
    labels: ['Active Jobs', 'Inactive Jobs'],
    datasets: [
      {
        label: 'No of Jobs',
        data: [activeJobs.length, inactiveJobs.length],
        //data: [15,20],
        backgroundColor: ['rgba(0, 255, 0, 0.5)', 'rgba(128, 128, 128, 1)'],
        borderColor: ['rgba(255, 0, 0, 1)'],
        borderWidth: 1,
      },
    ],
  };
  if (loading) {
    return  <div className="flex justify-center"> <Loader width={200} height={200}  /></div>
    
 
  }
  if (jobs.length === 0) {
    return <div className="flex justify-center">
   <p className='text-[green] font-poppins my-4 text-[1.5rem]'>Can't Load Pie Chart!(no jobs)</p>
  </div>;
  }
  return <Pie data={data} />;
  
};
