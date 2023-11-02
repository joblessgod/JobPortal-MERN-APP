import React, { useEffect, useState } from "react";
import AllJobs from "./AllJobs";
import Button from "../../global/Button";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcNext, FcPrevious } from "react-icons/fc";
const ListedJobs = (props) => {
 
  const { currentUser } = useSelector((state) => state.user);
  const { isHomePage } = props;
  const [listedJob, setListedJob] = useState([]);
  const [jobShowError, setJobShowError] = useState(false);

   const navigate = useNavigate();
  useEffect(() => {
    const fetchListedJob = async () => {
      try {
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
          setJobShowError(data.message);
        } else {
          setListedJob(data.reverse());
        }
      } catch (error) {
        setJobShowError(error);
      }
    };
    fetchListedJob();
  }, [currentUser && currentUser._id]);
  
 

 //view more
 const handleViewMore=()=>{
  navigate('/listedjob');
 }
 
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
    console.log("Job deleted successfully. Updated list:", updatedListedJob);
    setListedJob(updatedListedJob);
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error deleting job: ", error);
  }
};


  return (
    <div className="p-6 bg-[#FFF] minn:p-2 smmm-maxx:p-2 smmm-max:p-2">
      {listedJob && listedJob.length > 0 && (
        <h2 className="text-[#000] font-poppins font-[600] text-[1.8rem] py-8">
          {currentUser && currentUser.usertype === "employer"
            ? currentUser.organizationname
            : "All Listed Jobs"}
          's jobs
        </h2>
      )}

      {listedJob.slice(0, 10).map((job) => (
        <div className="flex flex-col gap-[2rem] px-2" key={job._id}>
          <AllJobs
          id = {job._id}
            companyname={job.companyname}
            position={job.jobtitle}
            exp={job.experience}
            location={job.joblocation}
            site={job.jobtype}
            salary={job.salary}
            handleJobDelete={handleJobDelete}
            
          />
        </div>
      ))}

      <style jsx>{`
        .border-radiuss {
          border-radius: 50%;
        }
        .divv {
          border: 1px solid #efeff0;
          border-radius: 0.625rem;
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
        }
      `}</style>
      {isHomePage ? (
        <div className="inline-block p-[1.5rem]">
          <Button
            onClick={handleViewMore}
            msg="View More"
            border="rounded-button"
            icon={HiOutlineArrowCircleRight}
          />
        </div>
      ) :  <div className="flex justify-center mt-5 gap-3">
      <FcPrevious size={25} color="green" className="cursor-pointer" />
      <FcNext color = "green" size={25} className="cursor-pointer" />
    </div>}
      
    </div>
  );
};

export default ListedJobs;
