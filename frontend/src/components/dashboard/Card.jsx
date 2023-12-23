import React, { useEffect, useState } from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import { TbCategoryFilled } from "react-icons/tb";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FcExpired } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useDispatch, useSelector,shallowEqual } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
//import { fetchJobsRequest, fetchJobsSuccess, fetchJobsFailure } from '../../redux/joblist/joblistSlice';
import { fetchJobs } from '../../redux/joblist/joblistSlice';
import { fetchCategories } from "../../redux/category/categorySlice";
import AddCategory from "../category/AddCategory";
 // Adjust the import path

const Card = ({ title, content, icons, to, create }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
      <div className="bg-[#4299e1] border rounded-[0.5rem] overflow-hidden shadow-lg hover:shadow-lg transition-transform duration-300 transform hover:scale-105 p-3">
        <div className="p-4 text-[whitesmoke] flex flex-row justify-around font-poppins ">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {icons}
        </div>
        <div className="flex flex-row justify-center gap-4 items-center">
          <Link
            to={to}
            className="text-[black] font-poppins font-semibold cursor-pointer"
          >
            {content}
          </Link>
          {create && (
            <div>
              {create.onClickAddCategory ? (
                // If there's an onClickAddCategory function, use it as onClick
                <button
                  onClick={create.onClickAddCategory}
                  className="cursor-pointer"
                >
                  <AiOutlinePlus size={25} title={create.title} />
                </button>
              ) : (
                // Otherwise, use Link with the specified "to" prop
                <Link to={create.to}>
                  <AiOutlinePlus size={25} title={create.title} />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CardContainer = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const jobs = useSelector((state) => state.jobsLists.jobs);
  const {categories}  = useSelector((state) => state.categoryLists);
  const loading = useSelector((state) => state.jobsLists.loading);
  const error = useSelector((state) => state.jobsLists.error);
  const [isAddCategoryModalVisible, setAddCategoryModalVisibility] = useState(false);
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);
  //getting categories
  

  useEffect(() => {
    // Dispatch the fetchCategories async thunk when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);
console.log(categories)
  /* useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch the fetchJobsRequest action here
        dispatch(fetchJobsRequest());
  
        const apiUrl =
          currentUser.usertype === "employer"
            ? `/api/auth/view/${currentUser._id}`
            : "/api/auth/view";
  
        // Perform the asynchronous API call
        const response = await fetch(apiUrl);
        const data = await response.json();
 
        // Check if the response is successful and dispatch the appropriate action
        if (response.ok) {
          dispatch(fetchJobsSuccess(data));
        } else {
          dispatch(fetchJobsFailure("Failed to fetch jobs"));
        }
      } catch (error) {
       
        dispatch(fetchJobsFailure(error.message));
      }
    };
  
    fetchData();
  }, [currentUser, dispatch]); */
  

   const today = new Date();
  const expiredJobs = jobs.filter(
    (job) => new Date(job.applicationdeadline) < today
  );
  const activeJobs = jobs.filter(
    (job) => new Date(job.applicationdeadline) > today
  ); 
  const handleAddCategory = () => {
    // Show the AddCategory modal
    setAddCategoryModalVisibility(true);
  };

  const handleCloseAddCategory = () => {
    // Close the AddCategory modal
    setAddCategoryModalVisibility(false);
  };
  return (
    <div className="flex flex-wrap mx-4">
      <Card
        title="LISTED JOBS"
        content={
          loading
            ? 'Loading...'
            : jobs.length === 0
            ? '0 jobs available'
            : `${jobs.length} jobs available`
        }
        icons={<BsPersonWorkspace />}
        to="/jobs"
        create={{
          to: "/jobpost",
          title: "click here to Create a New job",
        }}
      />

      <Card
        title="CATEGORIES"
        icons={<TbCategoryFilled />}
        content={
          loading
            ? 'Loading...'
            : categories.length === 0
            ? '0 categories available'
            : `${categories.length} categories available`
        }
        to="/viewcategory"
        create={{
          onClickAddCategory: handleAddCategory,
          title: "click here to Add a New Category",
        }}
      />
      <Card
        title="ACTIVE JOBS"
        icons={<SlEnvolopeLetter />}
        content={
          loading
            ? 'Loading...'
            : activeJobs.length === 0
            ? '0 jobs available'
            : `${activeJobs.length} jobs available`
        }
      />
      <Card
        title="INACTIVE JOBS"
        icons={<FcExpired />}
        content={
          loading
            ? 'Loading...'
            : expiredJobs.length === 0
            ? '0 jobs available'
            : `${expiredJobs.length} jobs available`
        }
      />
      {isAddCategoryModalVisible && (
        <AddCategory onClose={handleCloseAddCategory} />
      )}
    </div>
  );
};

export default CardContainer;
