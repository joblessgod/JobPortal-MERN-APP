import React,{useState,useEffect} from 'react';
import download from "../../assets/images/download.png";
import Pagination from "../../global/Pagination";
import Title from "../../global/Title";
import { useSelector,useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import {  BsEye, BsPencil } from "react-icons/bs";
import { Link,useNavigate } from "react-router-dom";
import { fetchJobs } from '../../redux/joblist/joblistSlice';
import { deleteJob } from '../../redux/joblist/joblistSlice';
import { InfinitySpin } from 'react-loader-spinner';
import Loader from '../../global/Loader';


const Jobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const { currentUser } = useSelector((state) => state.user);
 const jobs = useSelector((state) => state.jobsLists.jobs);
 const error = useSelector((state) => state.jobsLists.error);
 const loading = useSelector((state) => state.jobsLists.loading);
 const [currentPage,setCurrentPage] = useState(1);
 const [postsPerPage,setpostsPerPage] = useState(8);
 const[jobDeleteError,setjobDeleteError] = useState(null);
 //pagination logic
 const lastPostIndex = currentPage * postsPerPage;
 const firstPostIndex = lastPostIndex - postsPerPage;
 const currentPosts = jobs.slice(firstPostIndex, lastPostIndex);
 //delete jobs
 const handleJobDelete = async (jobId) => {
  try {
    
    const response = await fetch(`/api/auth/listedjob/${jobId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log('Delete response:', data);
    if(data.success === false){
      setjobDeleteError(data.message)
      return;
    }
    dispatch(deleteJob(jobId));
  } catch (error) {
    // Handle any other errors that may occur during the fetch
    setjobDeleteError(error.message)
  }
};
//dispatch for getting job
useEffect(() => {
  dispatch(fetchJobs());
}, [dispatch]);
  return (
    <div className="container mx-auto px-3 ">
    <Title title = {`Listed jobs By ${currentUser.organizationname}`} />
  
    {loading && (
      <div className="flex justify-center">
        <Loader width={200} height={200} />
      </div>
    )}
    {!loading && (
      <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 font-poppins my-3">
   
      {currentPosts.map((job, index) => (
        <div
          key={index}
          className="border border-[whitesmoke] rounded-[1rem] p-3 shadow-xl hover:shadow-2xl"
        >
          <img
            src={download}
            alt="Company Avatar"
            className="w-16 h-16 mx-auto rounded-full"
          />
          <p className="text-center text-[1.125rem] font-semibold mt-2">
            {job.companyname}
          </p>
          <p className="text-center text-[#718096]">{job.jobtitle}</p>
          <p className="text-center text-[#718096] mt-1">
            {job.experience} years of experience
          </p>
          <div className="flex items-center justify-center gap-1 text-[0.7rem] mt-2">
            
          <Link to={`/jobs/jobapplications/${job._id}`} className={`hover:underline ${job.applicationsCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={job.applicationsCount === 0}>
          <p className="text-[#3182ce] font-bold text-[1rem]">{job.applicationsCount} Applications</p>
        </Link>
        
        
          </div>
          
          <div className="flex flex-row justify-center mt-2 gap-2">
          <Link
          className="cursor-pointer"
          to={`/jobdetails/${job._id}`}
        >
          <BsEye size={20} color="#338573" />
          </Link>
          <Link
            className="cursor-pointer"
            to={`/updatejob/${job._id}`}
          >
            <BsPencil size={20} color="#04BCF6" />
          </Link>
          <AiOutlineDelete
          onClick={() => handleJobDelete(job._id)}
            size={20}
            color="red"
            className="cursor-pointer"
          />
        </div>
         
        </div>
      ))}
    </div>
   

    <div className="flex justify-center items-center gap-2 p-3">
    {jobs && (
      <Pagination
        totalPosts={jobs.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    )}
  </div>
  </div>
    )}
    
    {error && <p className='text-[red] font-poppins'>{error.message}</p>}

  {!loading && jobs.length === 0 && <p className='text-[green] font-poppins my-4 text-[1.5rem]'>No Jobs Found!</p>}
  </div>
);
};

export default Jobs