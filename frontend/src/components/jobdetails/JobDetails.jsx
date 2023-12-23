import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../global/Title";
import Button from "../../global/Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
const eachdivstyle = "flex flex-row gap-2 font-poppins p-0";
const insidedivstyle = "font-bold mb-1";
const JobDetails = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;
  console.log(jobId);
  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`/api/auth/viewbyid/${jobId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setDetails(data);
    };

    fetchListing();
  }, []);
  console.log(details);

  //date
  const dateObject = new Date(details.applicationdeadline);
  let formattedDate; // Declare it here

  if (dateObject instanceof Date && !isNaN(dateObject)) {
    formattedDate = dateObject.toISOString().split("T")[0];
    // You can use formattedDate here
  } else {
    console.log("Date object is not valid");

    // You can provide a default value for formattedDate or take other appropriate action.
  }
  const andateObject = new Date(details.createdAt);
  let postformattedDate; // Declare it here

  if (dateObject instanceof Date && !isNaN(dateObject)) {
    postformattedDate = dateObject.toISOString().split("T")[0];
    // You can use formattedDate here
  } else {
    console.log("Date object is not valid");

    // You can provide a default value for formattedDate or take other appropriate action.
  }
  const jobdescription = details.jobdescription;
  console.log(jobdescription);
  return (
    <div className=" m-auto">
      <div className="w-[100%] ">
        <Title title={`${details.jobtitle}-${details.companyname}`} />
      </div>

      {currentUser && currentUser.usertype === "employer" ? (
        <div className="p-3" />
      ) : (
        <div className="flex justify-center gap-4 p-4">
          <button className="border border-solid border-[#CBD5E0] rounded-button p-2 font-[600]">
            View Company
          </button>
          <Link to={`/jobapply/${details._id}`}>
            <Button msg="Apply This job" border="rounded-button" />
          </Link>
        </div>
      )}
      <div className=" px-10 py-2">
        <div className="max-w-[fit-content] sm:mx-[15rem]">
          <div class={eachdivstyle}>
            <div class={insidedivstyle}>Minimum Qualification:</div>
            <div class="mb-2">{details.jobqualification}</div>
          </div>
          <div class={eachdivstyle}>
            <div class={insidedivstyle}>Job Type:</div>
            <div class="mb-2">{details.jobtype}</div>
          </div>
          <div class={eachdivstyle}>
            <div class={insidedivstyle}>Experience :</div>
            <div class="mb-2">{details.experience} years</div>
          </div>{" "}
          <div class={eachdivstyle}>
            <div class={insidedivstyle}>Location:</div>
            <div class="mb-2">{details.joblocation}</div>
          </div>{" "}
          <div class={eachdivstyle}>
            <div class={insidedivstyle}>Application Deadline:</div>
            <div class="mb-2">{formattedDate}</div>
          </div>
          <div class={eachdivstyle}>
            <div class={insidedivstyle}>Salary :</div>
            <div>{details.salary}</div>
          </div>
          <div class={eachdivstyle}>
            <div class={insidedivstyle}>Posted At :</div>
            <div>{postformattedDate}</div>
          </div>
          
        </div>
        <h1 className="text-[1.5rem] text-left font-poppins font-[700] mt-4 sm:mx-[15rem]">
          Job Description:
        </h1>
        <div
        className=" sm:mx-[15rem] text-start"
        dangerouslySetInnerHTML={{ __html: jobdescription }}
      />
      

        <div className="flex justify-start m-2 cursor-pointer">
          <FaArrowLeftLong
            size={25}
            title="click to go Back"
            color="green"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
