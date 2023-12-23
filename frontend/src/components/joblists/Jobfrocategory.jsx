import React, { useState, useEffect } from 'react';
import download from "../../assets/images/download.png";
import Pagination from "../../global/Pagination";
import Title from "../../global/Title";
import { AiOutlineDelete } from "react-icons/ai";
import { BsEye, BsPencil } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import Loader from '../../global/Loader';
import { useSelector } from 'react-redux';

const Jobfrocategory = () => {
  const publiccategories = useSelector(
    (state) => state.publiccategories.publiccategories
  );
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobShowError, setJobShowError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  // Move the useParams hook outside of useEffect
  const { id } = useParams();
// Find the category with the matching ID
const selectedCategory = publiccategories.find(category => category._id === id);
console.log(selectedCategory.categoryname);
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/auth/getjobsfromcategory/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (data.success === false) {
          setJobShowError(data.message);
        } else {
          setJobs(data.reverse());
        }

        setLoading(false);
      } catch (error) {
        setJobShowError(error.message);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Pagination logic
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = jobs.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="container mx-auto px-3 ">
      <Title title={`Listed jobs For ${selectedCategory.categoryname}`} />

      {loading && <div className='flex justify-center'><Loader width={200} height={200} /></div>}

      {!loading && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 font-poppins my-3">
            {currentPosts.map((currentPost) => (
              <div
                key={currentPost._id}
                className="border border-[whitesmoke] rounded-[1rem] p-3 shadow-xl hover:shadow-2xl"
              >
                <img
                  src={download}
                  alt="Company Avatar"
                  className="w-16 h-16 mx-auto rounded-full"
                />
                <p className="text-center text-[1.125rem] font-semibold mt-2">
                  {currentPost.companyname}
                </p>
                <p className="text-center text-[#718096]">
                  {currentPost.jobtitle}
                </p>
                <p className="text-center text-[#718096] mt-1">
                  {currentPost.experience} years of experience
                </p>
                <div className="flex items-center justify-center gap-1 text-[0.7rem] mt-2">
                  <Link
                    to={`/jobs/jobapplications/${currentPost._id}`}
                    className={`hover:underline ${
                      currentPost.applicationsCount === 0
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    disabled={currentPost.applicationsCount === 0}
                  >
                    <p className="text-[#3182ce] font-bold text-[1rem]">
                      {currentPost.applicationsCount} Applications
                    </p>
                  </Link>
                </div>
                <div className="flex flex-row justify-center mt-2 gap-2">
                  <Link
                    className="cursor-pointer"
                    to={`/jobdetails/${currentPost._id}`}
                  >
                    <BsEye size={20} color="#338573" />
                  </Link>
                  <Link
                    className="cursor-pointer"
                    to={`/updatejob/${currentPost._id}`}
                  >
                    <BsPencil size={20} color="#04BCF6" />
                  </Link>
                  <AiOutlineDelete
                    onClick={() => handleJobDelete(currentPost._id)}
                    size={20}
                    color="red"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 p-3">
            {jobs.length > 0 && (
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

      {jobShowError && (
        <p className="text-[red] font-poppins">{jobShowError}</p>
      )}

      {!loading && jobs.length === 0 && (
        <p className="text-[green] font-poppins my-4 text-[1.5rem]">
          No Jobs Found for this category!
        </p>
      )}
    </div>
  );
};

export default Jobfrocategory;
