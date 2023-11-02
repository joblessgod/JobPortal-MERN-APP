import React, { useState, useEffect } from "react";
import Button from "../../global/Button";
import Title from "../../global/Title";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";

const UpdateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [jobdescription, setJobDescription] = useState("");
  const [jobPostError, setJobPostError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      const jobId = params.id;
      const res = await fetch(`/api/auth/viewbyid/${jobId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);
 

  const handleChange = (e) => {
    setFormData({
      ...formData,
     
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setJobPostError(null);
    if (new Date(formData.applicationdeadline) < new Date()) {
      return setJobPostError(
        "Application Deadline should not be before the current date!"
      );
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/auth/jobupdate/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = res.json();
      if (data.success === false) {
        setJobPostError(data.message);
        setLoading(false);
      }
      navigate("/listedjob");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setJobPostError(error);
    }
  };

  const dateObject = new Date(formData.applicationdeadline);
  let formattedDate; // Declare it here

  if (dateObject instanceof Date && !isNaN(dateObject)) {
    formattedDate = dateObject.toISOString().split("T")[0];
    // You can use formattedDate here
  } else {
    console.log("Date object is not valid");
   
    // You can provide a default value for formattedDate or take other appropriate action.
  }

console.log(formData);

  return (
    <div>
      <Title title="Update a Job" />
      <div className="w-[full] my-3 md:p-4 lg:p-4 xl:p-4 2xl:p-4 m-auto">
        <div className="mx-auto bg-white p-6 rounded shadow-lg border border-[#D6D6D6] rounded-[0.625rem]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col  md:grid md:grid-cols-2 md:gap-6 lg:grid lg:grid-cols-2 lg:gap-6 xl:grid xl:grid-cols-2 xl:gap-6 2xl:grid 2xl:grid-cols-2 2xl:gap-6">
              <div className="mb-1 ">
                <label
                  htmlFor="companyName"
                  className="flex justify-start font-poppins text-[#000]  md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyname"
                  name="companyName"
                  className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  placeholder="Name"
                  onChange={handleChange}
                  value={formData.companyname}
                  required
                />
              </div>
              <div className="mb-1 ">
                <label
                  htmlFor="companyWebsite"
                  className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1"
                >
                  Company Website
                </label>
                <input
                  type="url"
                  id="companywebsite"
                  name="companyWebsite"
                  className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  placeholder="Website Link"
                  onChange={handleChange}
                  value={formData.companywebsite}
                  required
                />
              </div>

              <div className="mb-1 ">
                <label
                  htmlFor="jobTitle"
                  className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem]  lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobtitle"
                  name="jobTitle"
                  className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  placeholder="Title"
                  onChange={handleChange}
                  value={formData.jobtitle}
                  required
                />
              </div>

              <div className="mb-1 ">
                <label
                  htmlFor="jobCategory"
                  className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1"
                >
                  Job Category
                </label>
                <select
                  id="jobcategory"
                  name="jobCategory"
                  className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  onChange={handleChange}
                  value={formData.jobcategory}
                  required
                >
                  <option value="IT">IT</option>
                  <option value="Account">Account</option>
                  <option value="Plumbing">Plumbing</option>
                </select>
              </div>
              <div className="mb-1 ">
                <label
                  htmlFor="jobType"
                  className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1"
                >
                  Job Type
                </label>
                <select
                  id="jobtype"
                  name="jobCategory"
                  className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  onChange={handleChange}
                  value={formData.jobtype}
                  required
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="mb-1 ">
                <label
                  htmlFor="jobLocation"
                  className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1"
                >
                  Job Location
                </label>
                <input
                  type="text"
                  id="joblocation"
                  name="jobLocation"
                  className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4] "
                  placeholder="Location"
                  onChange={handleChange}
                  value={formData.joblocation}
                  required
                />
              </div>
              <div className="mb-1 ">
                <label
                  htmlFor="salaryRange"
                  className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1"
                >
                  Salary Range
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salaryRange"
                  className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4] "
                  placeholder="Salary Range"
                  onChange={handleChange}
                  value={formData.salary}
                  required
                />
              </div>

              <div className="mb-1 ">
                <label
                  htmlFor="experience"
                  className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1"
                >
                  Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  placeholder="Experience"
                  onChange={handleChange}
                  value={formData.experience}
                  required
                />
              </div>
              <div className="mb-1 ">
                <label
                  htmlFor="qualification"
                  className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1"
                >
                  Qualification
                </label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  placeholder="Qualification"
                  onChange={handleChange}
                  value={formData.jobqualification}
                  required
                />
              </div>

              <div className="mb-1 ">
                <label
                  htmlFor="applicationDeadline"
                  className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1"
                >
                  Application Deadline
                </label>
                <input
                  type="date"
                  id="applicationdeadline"
                  name="applicationDeadline"
                  className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  placeholder="Job Application Deadline"
                  onChange={handleChange}
                  value={formattedDate}
                  required
                />
              </div>

              <div className="mb-1 ">
                <label
                  htmlFor="jobApplicationLink"
                  className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1"
                >
                  Job Application Link
                </label>
                <input
                  type="url"
                  id="jobapplicationlink"
                  name="jobApplicationLink"
                  className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  placeholder="Job Application URL"
                  onChange={handleChange}
                  value={formData.jobapplicationlink}
                  required
                />
              </div>

              <div className="col-span-2 mb-4 ">
                <label
                  htmlFor="jobDescription"
                  className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1"
                >
                  Job Description
                </label>
                <ReactQuill
                  theme="snow"
                  value={formData.jobdescription}
                 
                  onChange={(newDesc) => setFormData({ ...formData, jobdescription: newDesc })}
                  className="h-[7rem]"
                />
                {/* 
            <textarea
             
                id="jobdescription"
                name="jobDescription"
                className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                rows="4"
                placeholder="Job Description"
                onChange={handleChange}
                required
              />
            
            */}
              </div>

              <p className="text-[red]">{jobPostError ? jobPostError : ""}</p>
              <div className="text-right p-3">
                {loading ? (
                  <InfinitySpin width={100} height={100} color="black" />
                ) : (
                  <Button msg="Post a Job" border="rounded-button" />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateListing;
