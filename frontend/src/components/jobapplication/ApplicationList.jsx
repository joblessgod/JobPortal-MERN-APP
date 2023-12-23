import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsEye } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setJobLists, setError } from "../../redux/joblist/joblistSlice";
import Pagination from "../../global/Pagination";
import { InfinitySpin } from "react-loader-spinner";
import Loader from "../../global/Loader";

const JobLists = () => {
  let serialNumber = 1;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [listedJob, setListedJob] = useState([]);

  
  const [jobShowError, setJobShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
 


  const navigate = useNavigate();
  useEffect(() => {
    const fetchListedJobApplication = async () => {
        const jobid = useParams();
      try {
        setLoading(true);
        
        const res = await fetch(`api/auth/getapplicationofjob/${jobid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (data.success === false) {
          setLoading(false);
          setJobShowError(data.message);
          dispatch(setError(data.message)); // Dispatch error to Redux
        } else {
          setListedJob(data.reverse());
          dispatch(setJobLists(data.reverse())); // Dispatch jobLists to Redux
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setJobShowError(error);
        dispatch(setError(error.message)); // Dispatch error to Redux
      }
    };
    fetchListedJobApplication();
  }, [dispatch]);

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
    const formattedDate = date.toISOString().split("T")[0]; // Extract date part

    return formattedDate;
  };
  //pagination logic
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = listedJobApplications.slice(firstPostIndex, lastPostIndex);
  console.log(currentPosts);
  return (
    <div className="overflow-x-auto bg-[#FFF]  p-3 ">
   
      {listedJobApplications && listedJobApplications.length > 0 && (
       
        <h2 className="text-[#000] font-poppins font-[600] text-[1.8rem] py-8">
          {currentUser && currentUser.usertype === "employer"
            ?`${currentUser.organizationname}'s Job`
            : "All Listed Jobs"}
        </h2>
       
      )}
     
    
      {loading ? (
        <div className="flex justify-center">
          <Loader width={200} height={200} color="black" />
        </div>
      ) : (
        <table
          key={listedJobApplications._id}
          className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-solid border-[#D6D0D0] rounded-[0.625rem] "
        >
          <thead className="bg-gray-200 ">
            <tr className="font-poppins text-[1.25rem] font-[600]">
              <th className="text-center py-2 px-2">ID</th>
              <th className="text-center py-2 px-2">Job Title</th>
              <th className="text-center py-2 px-2">Name</th>
              <th className="text-center py-2 px-2">Email</th>
              <th className="text-center py-2 px-2">Mobile</th>
              <th className="text-center py-2 px-2">Created At</th>
              <th className="text-center py-2 px-2">Action</th>
            </tr>
          </thead>
          {currentPosts.map((jobApplications) => (
            <tbody>
              <tr
                key={jobApplications._id}
                className="font-poppins text-[#000] text-[1rem] "
              >
                <td className="py-2 px-2">{serialNumber++}</td>
                <td className="py-2 px-2">{jobApplications.jobtitle}</td>
                <td className="py-2 px-2">{jobApplications.fullname}</td>
                <td className="py-2 px-2">{jobApplications.email}</td>
                <td className="py-2 px-2">{jobApplications.phone}</td>
                <td className="py-2 px-2">{getFormattedDate(jobApplications.createdAt)}</td>
                <td className="py-2 px-2 flex flex-row justify-center gap-3">
                 <BsEye size={25} color="green" title = "click here to view detail" className="cursor-pointer" />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
      <p className="text-[red] font-poppins">{jobShowError && jobShowError}</p>

      {!loading && listedJob.length === 0 && (
        <p className="text-[green] font-poppins my-4 text-[1.5rem]">
          No Jobs Found!
        </p>
      )}
      <div className="flex justify-center items-center gap-2 p-3">
        {listedJob && (
          <Pagination
            totalPosts={listedJobApplications.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2 mb-1">
    <button
    onClick={() => navigate(-1)}
      className="bg-[#4299e1] hover:bg-[#2b6cb0] text-white font-poppins py-2 px-4 rounded-[0.5rem]"
    >
      <BsArrowLeft className="inline-block mr-2" />
      Go Back
    </button>
  </div>
    </div>
  );
};

export default JobLists;
