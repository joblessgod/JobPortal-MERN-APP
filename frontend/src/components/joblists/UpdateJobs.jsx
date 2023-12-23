import React, { useState, useEffect } from "react";
import Button from "../../global/Button";
import Title from "../../global/Title";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { updateJob } from "../../redux/joblist/joblistSlice";
import Select from "react-select";
import Loader from "../../global/Loader";
const UpdateJobs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const publiccategories = useSelector(
    (state) => state.publiccategories.publiccategories
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [jobPostError, setJobPostError] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
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
  }, [params.id]);

  const handleChange = (e, meta) => {
    if (e && e.target) {
      const { id, value } = e.target;
      setFormData({
        ...formData,
        [id]: value,
      });
    } else if (meta && meta.name) {
      setFormData({
        ...formData,
        [meta.name]: e.value,
      });
      setSelectedOption(e);
    }
  };
  //getting stucked

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setJobPostError(null);
  
    if (new Date(formData.applicationdeadline) < new Date()) {
      setLoading(false);  // Move this line here to stop loading on validation error
      return setJobPostError(
        "Application Deadline should not be before the current date!"
      );
    }
  
    try {
      const res = await fetch(`/api/auth/jobupdate/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
          jobdescription: formData.jobdescription,
        }),
      });
      const data = await res.json();
  
      if (data.success === false) {
        setJobPostError(data.message);
        setLoading(false);  // Move this line here to stop loading on fetch error
      } else {
        dispatch(updateJob(data));
        navigate("/jobs");
      }
    } catch (error) {
      setLoading(false);  // Move this line here to stop loading on fetch error
      setJobPostError(error.message);
    }
  };

  const dateObject = new Date(formData.applicationdeadline);
  let formattedDate;

  if (dateObject instanceof Date && !isNaN(dateObject)) {
    formattedDate = dateObject.toISOString().split("T")[0];
  } else {
    console.log("Date object is not valid");
    // You can provide a default value for formattedDate or take other appropriate action.
  }
  useEffect(() => {
    const selectedCategory = publiccategories.find(
      (category) => category._id === formData.jobcategory
    );
    setSelectedOption(
      selectedCategory
        ? {
            label: selectedCategory.categoryname,
            value: selectedCategory.categoryname,
          }
        : null
    );
  }, [publiccategories,formData ]);
  console.log(selectedOption)
  console.log(formData)
  return (
    <div>
      <Title title="Update a Job" />
      <div className="w-[full] my-3 md:p-4 lg:p-4 xl:p-4 2xl:p-4 m-auto">
        <div className="mx-auto bg-white p-6 rounded shadow-lg border border-[#D6D6D6] rounded-[0.625rem]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col  md:grid md:grid-cols-2 md:gap-6 lg:grid lg:grid-cols-2 lg:gap-6 xl:grid xl:grid-cols-2 xl:gap-6 2xl:grid 2xl:grid-cols-2 2xl:gap-6">
              <div className="mb-0 ">
                <label
                  htmlFor="companyName"
                  className="flex justify-start font-poppins text-[#000]  md:text-[1rem]  font=[500]  mb-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyname"
                  name="companyName"
                  className="w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  placeholder="Name"
                  onChange={(e) => handleChange(e)}
                  value={formData.companyname}
                  required
                />
              </div>
              <div className="mb-0 ">
                <label
                  htmlFor="companyWebsite"
                  className="flex justify-start font-poppins text-[#000] md:text-[1rem] font=[500]  mb-1"
                >
                  Company Website
                </label>
                <input
                  type="url"
                  id="companywebsite"
                  name="companyWebsite"
                  className="w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  placeholder="Website Link"
                  onChange={(e) => handleChange(e)}
                  value={formData.companywebsite}
                  required
                />
              </div>

              <div className="mb-0 ">
                <label
                  htmlFor="jobTitle"
                  className="flex justify-start font-poppins text-[#000] md:text-[1rem]  font=[500]  mb-1"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobtitle"
                  name="jobTitle"
                  className="w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  placeholder="Title"
                  onChange={(e) => handleChange(e)}
                  value={formData.jobtitle}
                  required
                />
              </div>

              <div className="mb-0 ">
                <label
                  htmlFor="jobCategory"
                  className="flex justify-start font-poppins text-[#000] md:text-[1rem] font=[500]  mb-1"
                >
                  Job Category
                </label>
                <Select
                value={selectedOption}
                onChange={(e) => handleChange(e, { name: "jobcategory" })}
                options={publiccategories.map((category) => ({
                  label: category.categoryname,
                  value: category._id,
                }))}
                isSearchable
              />
              </div>
              <div className="mb-0 ">
                <label
                  htmlFor="jobType"
                  className="flex justify-start font-poppins text-[#000] md:text-[1rem] font=[500]  mb-1"
                >
                  Job Type
                </label>
                <select
                  id="jobtype"
                  name="jobCategory"
                  className="w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  onChange={(e) => handleChange(e)}
                  value={formData.jobtype}
                  required
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="mb-0">
                <label
                  htmlFor="jobLocation"
                  className="flex justify-start font-poppins text-[#000] md:text-[1rem] font=[500]  mb-1"
                >
                  Job Location
                </label>
                <input
                  type="text"
                  id="joblocation"
                  name="jobLocation"
                  className="w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4] "
                  placeholder="Location"
                  onChange={(e) => handleChange(e)}
                  value={formData.joblocation}
                  required
                />
              </div>
              <div className="mb-0 ">
                <label
                  htmlFor="salaryRange"
                  className="flex justify-start font-poppins text-[#000] md:text-[1rem] font=[500]  mb-1"
                >
                  Salary Range
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salaryRange"
                  className="w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4] "
                  placeholder="Salary Range"
                  onChange={(e) => handleChange(e)}
                  value={formData.salary}
                  required
                />
              </div>

              <div className="mb-0 ">
                <label
                  htmlFor="experience"
                  className="flex justify-start font-poppins text-[#000] md:text-[1rem] font=[500]  mb-1"
                >
                  Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  className="w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  placeholder="Experience"
                  onChange={(e) => handleChange(e)}
                  value={formData.experience}
                  required
                />
              </div>
              <div className="mb-0 ">
                <label
                  htmlFor="qualification"
                  className="flex justify-start font-poppins text-[#000] md:text-[1rem]  font=[500]  mb-1"
                >
                  Qualification
                </label>
                <input
                  type="text"
                  id="jobqualification"
                  name="qualification"
                  className="w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  placeholder="Qualification"
                  onChange={(e) => handleChange(e)}
                  value={formData.jobqualification}
                  required
                />
              </div>

              <div className="mb-0 ">
                <label
                  htmlFor="applicationDeadline"
                  className="flex justify-start font-poppins text-[#000] md:text-[1rem] font=[500]  mb-1"
                >
                  Application Deadline
                </label>
                <input
                  type="date"
                  id="applicationdeadline"
                  name="applicationDeadline"
                  className="w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  placeholder="Job Application Deadline"
                  onChange={(e) => handleChange(e)}
                  value={formattedDate}
                  required
                />
              </div>

              <div className="mb-0 ">
                <label
                  htmlFor="jobApplicationLink"
                  className="flex justify-start font-poppins text-[#000] md:text-[1rem] font=[500]  mb-1"
                >
                  Job Application Link
                </label>
                <input
                  type="url"
                  id="jobapplicationlink"
                  name="jobApplicationLink"
                  className="w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                  placeholder="Job Application URL"
                  onChange={(e) => handleChange(e)}
                  value={formData.jobapplicationlink}
                  required
                />
              </div>

              <div className="col-span-2 mb-4 ">
                <label
                  htmlFor="jobDescription"
                  className="flex justify-start font-poppins text-[#000] md:text-[1rem] font=[500]  mb-1"
                >
                  Job Description
                </label>
                <ReactQuill
                  theme="snow"
                  value={formData.jobdescription}
                  onChange={(newDesc) =>
                    setFormData({ ...formData, jobdescription: newDesc })
                  }
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

              <p className="text-[red] font-poppins mt-2">{jobPostError  ? jobPostError : ""}</p>
              <div className="text-right p-3">
                {loading ? (
                  <Loader width={100} height={100} />
                ) : (
                  <Button msg="Update Job" border="rounded-button" />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateJobs;
