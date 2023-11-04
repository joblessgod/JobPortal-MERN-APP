import { useState, useEffect } from "react";
import Button from "../../global/Button";
import download from "../../assets/images/download.png";
import { MdOutlineLocationOn } from "react-icons/md";
import { FcClock } from "react-icons/fc";
import { SiCashapp } from "react-icons/si";
import Pagination from "../../global/Pagination";
import Title from "../../global/Title";
import { InfinitySpin } from "react-loader-spinner";
const JobCardList = () => {
  const [jobss, setJobs] = useState([]);
  const [loading,setLoading] = useState(false);
  const [showError,setShowError] = useState(null);
  const [searchTermFromUrls, setSearchTermFromUrl] = useState(null);
  const [currentPage,setCurrentPage] = useState(1);
    const[postsPerPage,setPostsPerPage] = useState(12)
  useEffect(() => {
    
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    setSearchTermFromUrl(searchTermFromUrl);
    const fetchListings = async () => {
        try{
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/auth/getjobs?${searchQuery}`);
            const data = await res.json();
            if(data.success === false){
                setLoading(false);
                setShowError(data.message);
            }
            setJobs(data);
            setLoading(false);
        }catch(error){
            setLoading(false);
            setShowError(error);
        }
     
    };
    fetchListings();
  }, [location.search]);
  const jobs = [
    {
      avatar: "company1.jpg",
      companyName: "MindRiser consortium Pvt.Ltd",
      jobTitle: "Frontend Developer",
      experience: "3 years",
      location: "New York",
      jobType: "Full-time",
      salary: "$80,000",
    },
    {
      avatar: "company2.jpg",
      companyName: "Company B",
      jobTitle: "Backend Developer",
      experience: "5 years",
      location: "San Francisco",
      jobType: "Contract",
      salary: "$90,000",
    },
    {
      avatar: "company3.jpg",
      companyName: "Company C",
      jobTitle: "UI/UX Designer",
      experience: "2 years",
      location: "Los Angeles",
      jobType: "Part-time",
      salary: "$60,000",
    },
    {
      avatar: "company4.jpg",
      companyName: "Company D",
      jobTitle: "Data Scientist",
      experience: "4 years",
      location: "Chicago",
      jobType: "Full-time",
      salary: "$100,000",
    },
  ];
  console.log(searchTermFromUrls);
   //pagination logic
   const lastPostIndex = currentPage * postsPerPage;
   const firstPostIndex = lastPostIndex - postsPerPage;
   const currentPosts = jobss.slice(firstPostIndex,lastPostIndex)
  return (
    <div className="container mx-auto py-2">
    <Title title = {`Search For : ${searchTermFromUrls}`}/>
    {loading && <div className="flex justify-center"><InfinitySpin width={200} height={200} color="black" /></div>}
    {showError && <p className="text-[red]">{showError}</p>}
    {!loading && currentPosts.length === 0 && <p className="text-[red] font-poppins font-semibold my-3">No Result Found!</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-poppins my-3">
        {currentPosts.map((job, index) => (
          <div
            key={index}
            className="border border-[whitesmoke] rounded-[1rem] p-4 shadow-xl hover:shadow-2xl"
          >
            <img
              src={download}
              alt="Company Avatar"
              className="w-16 h-16 mx-auto rounded-[50%]"
            />
            <p className="text-center text-[1.125rem] font-semibold mt-4">
              {job.companyname}
            </p>
            <p className="text-center text-[#718096]">{job.jobtitle}</p>
            <p className="text-center text-[#718096] mt-2">
              {job.experience} years of experience
            </p>
            <div className="flex items-center justify-center gap-1 text-[0.7rem] mt-4 ">
            <MdOutlineLocationOn size={15} />
              <p className="text-[#718096]">{job.joblocation}</p>
              <FcClock size={15} />
              <p className="text-[#718096]">{job.jobtype}</p>
              <SiCashapp size={15} />
              <p className="text-[#718096]">{job.salary}</p>
            </div>
            <div className="mt-4 text-center">
              <Button msg="View Details" border="rounded-button" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
      {jobss && <Pagination totalPosts = {jobss.length} postsPerPage = {postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>}
    </div>
    </div>
  );
};

export default JobCardList;
