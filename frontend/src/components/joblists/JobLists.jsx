import React, { useEffect, useState } from "react";
import {BsEye} from "react-icons/bs";
import {BsPencil} from "react-icons/bs";
import {AiOutlineDelete} from "react-icons/ai";
import { Link } from "react-router-dom";


import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcNext, FcPrevious } from "react-icons/fc";
import Pagination from "../../global/Pagination";
import { InfinitySpin } from "react-loader-spinner";
const JobLists = (props) => {
  let serialNumber = 1;
 
    const { currentUser } = useSelector((state) => state.user);
   
    const [listedJob, setListedJob] = useState([]);
    const [jobShowError, setJobShowError] = useState(false);
    const [loading,setLoading] =useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const[postsPerPage,setPostsPerPage] = useState(10)
  
  
    const navigate = useNavigate();
    useEffect(() => {
      
      const fetchListedJob = async () => {
        try {
          setLoading(true);
          const apiUrl =
            currentUser.usertype === "employer"
              ? `/api/auth/view/${currentUser._id}`
              : "/api/auth/view";
          const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json(); // Need to await the JSON data
  
          if (data.success === false) {
            setLoading(false);
            setJobShowError(data.message);
          } else {
            setListedJob(data.reverse());
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          setJobShowError(error);
        }
      };
      fetchListedJob();
    }, [currentUser && currentUser._id]);
  
    //view more
    const handleViewMore = () => {
      navigate("/listedjob");
    };
  
    //delete a job
    const handleJobDelete = async (id) => {
      try {
        // Send a request to delete the job with the given id
        const res = await fetch(`/api/auth/listedjob/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await res.json();
  
        if (data.success === false) {
          console.log(data.message);
        }
        const updatedListedJob = listedJob.filter((job) => job._id !== id);
  
     
        setListedJob(updatedListedJob);
      } catch (error) {
        // Handle any errors that occur during the deletion process
        console.error("Error deleting job: ", error);
      }
    };
    //for getting formatted date 
    const getFormattedDate = (applicationDeadline) => {
      const date = new Date(applicationDeadline);
      const formattedDate = date.toISOString().split('T')[0]; // Extract date part
    
      return formattedDate;
    };
  //pagination logic
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = listedJob.slice(firstPostIndex,lastPostIndex)
  console.log(currentPosts);
  return (
    <div className="overflow-x-auto bg-[#FFF]  p-3 ">
  {listedJob && listedJob.length > 0 && (
      <h2 className="text-[#000] font-poppins font-[600] text-[1.8rem] py-8">
      {currentUser && currentUser.usertype === "employer"
        ? currentUser.organizationname 
        : "All Listed Jobs"}
     
    </h2>
  )}
  {loading ? (<div className="flex justify-center"><InfinitySpin width={200} height={200} color="black" /></div>) : (
    
      <table key = {listedJob._id} className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-solid border-[#D6D0D0] rounded-[0.625rem] ">
        <thead className="bg-gray-200 ">
          <tr className='font-poppins text-[1.25rem] font-[600]'>
          <th className="text-center py-2 px-2">ID</th>
            <th className="text-center py-2 px-2">Title</th>
            <th className="text-center py-2 px-2">Job Type</th>
            <th className="text-center py-2 px-2">Posted Date</th>
            <th className="text-center py-2 px-2">Application Deadline</th>
            <th className="text-center py-2 px-2">Action</th>
          </tr>
        </thead>
        {currentPosts.map((job) => (
        <tbody >
       
        
            <tr key={job._id} className='font-poppins text-[#000] text-[1rem] '>
            <td className="py-2 px-2">{serialNumber++}</td>
              <td className="py-2 px-2">{job.jobtitle}</td>
              <td className="py-2 px-2">{job.jobtype}</td>
              <td className="py-2 px-2">{getFormattedDate(job.createdAt)}</td>
              <td className="py-2 px-2">{getFormattedDate(job.applicationdeadline)}</td>
              <td className="py-2 px-2 flex flex-row justify-center gap-3">
              {currentUser && currentUser.usertype === "employer" ? 
              ( <div className="flex flex-row gap-2">
                <BsEye size={20} color='#338573'/>
                <Link className='cursor-pointer' to = {`/updatejob/${job._id}`}><BsPencil size={20} color='#04BCF6'/></Link>
                <AiOutlineDelete onClick={()=>handleJobDelete(job._id)} size={20} color='red' className="cursor-pointer"/>
                </div>):( <BsEye size={20} color='#338573'/>)}
              </td>
            </tr>
          
        </tbody>
        ))}
      </table>
      )}
        <p className="text-[red] font-poppins">{jobShowError && jobShowError}</p>
       
       {!loading && listedJob.length === 0 && <p className="text-[green] font-poppins my-4 text-[1.5rem]">No Jobs Found!</p> }
      <div className="flex justify-center items-center gap-2 p-3">
      
     {listedJob && <Pagination totalPosts = {listedJob.length} postsPerPage = {postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>}
      </div>
    </div>
  );
};

export default JobLists;
