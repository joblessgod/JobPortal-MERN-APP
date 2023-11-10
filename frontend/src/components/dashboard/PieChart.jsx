import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = () => {
  const { jobLists } = useSelector((state) => state.joblists);
  // Calculate the number of active and inactive jobs
  const today = new Date();
  const activeJobs = jobLists.filter(
    (job) => new Date(job.applicationdeadline) >= today
  );
  const inactiveJobs = jobLists.filter(
    (job) => new Date(job.applicationdeadline) < today
  );

  const data = {
    labels: ['Active Jobs', 'Inactive Jobs'],
    datasets: [
      {
        label: 'No of Jobs',
        data: [activeJobs.length, inactiveJobs.length],
        backgroundColor: ['rgba(0, 255, 0, 0.5)', 'rgba(128, 128, 128, 1)'],
        borderColor: ['rgba(255, 0, 0, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};
