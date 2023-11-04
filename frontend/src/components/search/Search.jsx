import {useState,useEffect} from "react";
import Button from "../../global/Button";
import download from '../../assets/images/download.png'
const JobCardList = () => {
    const [jobss,setJobs] = useState({})
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const fetchListings = async()=>{
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/auth/getjobs?${searchQuery}`);
            const data = await res.json();
            setJobs(data);
            
        };
        fetchListings();
    },[location.search])
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
console.log(jobss);
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-poppins my-3">
        {jobs.map((job, index) => (
          <div key={index} className="border border-[whitesmoke] rounded-[1rem] p-4 shadow-xl hover:shadow-2xl">
            <img
              src={download}
              alt="Company Avatar"
              className="w-16 h-16 mx-auto rounded-[50%]"
            />
            <p className="text-center text-[1.125rem] font-semibold mt-4">{job.companyName}</p>
            <p className="text-center text-gray-600">{job.jobTitle}</p>
            <p className="text-center text-gray-600 mt-2">{job.experience} years experience</p>
            <div className="flex items-center justify-center mt-4">
              <p className="text-[#718096]">{job.location}</p>
              <p className="mx-2 text-[#718096]">|</p>
              <p className="text-[#718096]">{job.jobType}</p>
              <p className="mx-2 text-[#718096]">|</p>
              <p className="text-[#718096]">{job.salary}</p>
            </div>
            <div className="mt-4 text-center">
             <Button msg = "View Details" border = "rounded-button" />
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCardList;
