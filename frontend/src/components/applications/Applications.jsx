import React, { useEffect, useState } from "react";

import {useParams } from "react-router-dom";
import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import Pagination from "../../global/Pagination";
import { FaArrowLeftLong } from "react-icons/fa6";
import Loader from "../../global/Loader";

const Applications = () => {
  const {currentUser} = useSelector((state)=>state.user);
  const jobs = useSelector((state) => state.jobsLists.jobs);
  let serialNumber = 1;
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [applicationError, setApplicationError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobName, setJobName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const { id } = useParams(); // Get the job ID from the URL

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        // Make API call to get applications for the specific job
        const response = await fetch(`/api/auth/getapplicationofjob/${id}`);
        const data = await response.json();
        setApplications(data); // Update state with fetched data
      } catch (error) {
        setApplicationError("Error fetching applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications(); // Call the function when the component mounts
  }, [id]); 

 //formatted date
 const formatCreatedAtDate = (createdAt) => {
  const date = new Date(createdAt);
  return date.toISOString().split("T")[0];
};
  //pagination logic
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = applications.slice(firstPostIndex, lastPostIndex);
 // Get the job name based on the job ID using Redux state
 useEffect(() => {
  const job = jobs.find((job) => job._id === id);
  
  setJobName(job ? job.jobtitle : "Job Not Found");
}, [jobs, id]);
//view pdf
const viewPdf = (pdfUrl) => {
  window.open(pdfUrl, "_blank");
};
  return (
    <div className="overflow-x-auto bg-[#FFF]  p-3 ">
      {applications && applications.length > 0 && (
        <h2 className="text-[#000] font-poppins font-[600] text-[1.8rem] py-8">
         Applications For - {jobName}
        </h2>
      )}
      {loading ? (
        <div className="flex justify-center">
          <Loader width={200} height={200} color="black" />
        </div>
      ) : (
        <table
          
          className="min-w-full bg-[white] shadow-md rounded-lg overflow-hidden border border-solid border-[#D6D0D0] rounded-[0.625rem] "
        >
          <thead className="bg-[#edf2f7] ">
            <tr className="font-poppins text-[1.25rem] font-[600]">
              <th className="text-center py-2 px-2">SN</th>
              <th className="text-center py-2 px-2">Full Name</th>
              <th className="text-center py-2 px-2">Email</th>
              <th className="text-center py-2 px-2">Mobile</th>
              <th className="text-center py-2 px-2">Created At</th>
              <th className="text-center py-2 px-2">Action</th>
            </tr>
          </thead>
          {currentPosts.map((job) => (
            <tbody>
              <tr
                key={job._id}
                className="font-poppins text-[#000] text-[1rem] "
              >
                <td className="py-2 px-2">{serialNumber++}</td>
                <td className="py-2 px-2">{job.fullname}</td>
                <td className="py-2 px-2">{job.email}</td>
                <td className="py-2 px-2">{job.phoneno}</td>
                <td className="py-2 px-2">{formatCreatedAtDate(job.createdAt)}</td>
               
                <td className="py-2 px-2 flex flex-row justify-center gap-3">
                  {currentUser && currentUser.usertype === "employer" && (
                    <div className="flex flex-row gap-2">
                    <button
                    className="bg-[#38A169] hover:bg-[#2F855A]  text-[white] font-poppins py-1 px-4 rounded-[0.8rem] focus:outline-none focus:shadow-outline-blue"
                    onClick={() => viewPdf(job.resume)}
                  > View CV
                  </button>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
      <p className="text-[red] font-poppins">{applicationError && applicationError}</p>

      {!loading && applications.length === 0 && (
        <p className="text-[green] font-poppins my-4 text-[1.5rem]">
          No Applications Found!
        </p>
      )}
      <div className="flex justify-center items-center gap-2 p-3">
        {applications && (
          <Pagination
            totalPosts={applications.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
      <div className="flex justify-start m-2 cursor-pointer">
      <FaArrowLeftLong
        size={25}
        title="click to go Back"
        color="green"
        onClick={() => navigate(-1)}
      />
    </div>
    </div>
  );
};

export default Applications;