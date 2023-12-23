

import { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const JobListContext = createContext();

export const jobProvider = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [jobData, setJobData] = useState([]);
   
  
    useEffect(() => {
      const fetchData = async () => {
        try {
         
  
          if (currentUser) {
            // Define the API URL based on the user type
            const apiUrl =
              currentUser.usertype === 'employer'
                ? `/api/auth/view/${currentUser._id}`
                : '/api/auth/view';
  
            // Fetch data from the API
            const response = await fetch(apiUrl);
            const result = await response.json();
           
  
            // Set the fetched data in state
            setJobData(result);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          
        } finally {
         console.log("ok");
        }
      };
  
      // Fetch data when the component mounts or when currentUser changes
      fetchData();
    }, [currentUser]); 
    console.log(jobData)
  return (
    <JobListContext.Provider value={jobData}>
      {children}
    </JobListContext.Provider>
  );
};

export const useJobListContext = () => {
  return useContext(JobListContext);
};
