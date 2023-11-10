import React from "react";
import { TbCategoryFilled } from "react-icons/tb";
import { SlEnvolopeLetter } from "react-icons/sl";
import { BsPersonWorkspace } from "react-icons/bs";
import { FcExpired } from "react-icons/fc";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Card = ({ title, content, icons, to }) => {
  return (
    <div className="w-full  sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
      <div className="bg-[#4299e1] border rounded-[0.5rem] overflow-hidden shadow-lg hover:shadow-lg transition-transform duration-300 transform hover:scale-105 p-3">
        <div className="p-4 text-[whitesmoke] flex flex-row justify-around font-poppins ">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {icons}
        </div>
        <Link
          to={to}
          className="text-[black] font-poppins font-semibold cursor-pointer"
        >
          {content}
        </Link>
      </div>
    </div>
  );
};

const CardContainer = () => {
  const { jobLists } = useSelector((state) => state.joblists);
  const handleClick = () => {
    alert("clicked");
  };

  // Calculate the number of expired jobs
  const today = new Date();
  const expiredJobs = jobLists.filter(
    (job) => new Date(job.applicationdeadline) < today
  );

  return (
    <div className="flex flex-wrap mx-4">
      <Card
        title="LISTED JOBS"
        content={`${jobLists.length} jobs available`}
        icons={<BsPersonWorkspace />}
        to="/joblists"
      />

      <Card
        image="card2-image.jpg"
        title="CATEGORIES"
        icons={<TbCategoryFilled />}
        content="24 categories available"
      />
      <Card
        image="card3-image.jpg"
        title="APPLICATIONS"
        icons={<SlEnvolopeLetter />}
        content="2000 applications"
      />
      <Card
        icons={<FcExpired />}
        title="EXPIRED JOBS"
        content={`${expiredJobs.length} jobs available`}
      />
    </div>
  );
};

export default CardContainer;
