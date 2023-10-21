import React from 'react'
import Button from "../../global/Button";
import Title from '../../global/Title';
const JobPost = () => {
  return (
   
<div>
<Title title = "Post a Job"/>
<div className='w-[full] my-3 md:p-4 lg:p-4 xl:p-4 2xl:p-4'>
    <div className="mx-auto bg-white p-6 rounded shadow-lg border border-[#D6D6D6] rounded-[0.625rem]">
        <form action="#" method="post">
            <div className="flex flex-col  md:grid md:grid-cols-2 md:gap-6 lg:grid lg:grid-cols-2 lg:gap-6 xl:grid xl:grid-cols-2 xl:gap-6 2xl:grid 2xl:grid-cols-2 2xl:gap-6">
                
                <div className="mb-4">
                    <label for="companyName" className="flex justify-start font-poppins text-[#000]  md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1">Company Name</label>
                    <input type="text" id="companyName" name="companyName" className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]" placeholder='Name'/>
                </div>
                <div className="mb-4">
                    <label for="companyWebsite" className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1">Company Website</label>
                    <input type="url" id="companyWebsite" name="companyWebsite" className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]" placeholder='Website Link'/>
                </div>
                
                
                <div className="mb-4">
                    <label for="jobTitle" className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem]  lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1">Job Title</label>
                    <input type="text" id="jobTitle" name="jobTitle" className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]" placeholder='Title'/>
                </div>

                
                <div className="mb-4">
                    <label for="jobCategory" className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1">Job Category</label>
                    <select id="jobCategory" name="jobCategory" className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]" >
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        <option value="category3">Category 3</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label for="jobType" className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1">Job Type</label>
                    <select id="jobCategory" name="jobCategory" className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]" >
                    <option value="category1">Full-Time</option>
                    <option value="category2">Part-Time</option>
                    <option value="category3">Remote</option>
                </select>
                </div>

               
                <div className="mb-4">
                    <label for="jobLocation" className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1">Job Location</label>
                    <input type="text" id="jobLocation" name="jobLocation" className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4] " placeholder='Location '/>
                </div>
                <div className="mb-4">
                    <label for="salaryRange" className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1">Salary Range</label>
                    <input type="text" id="salaryRange" name="salaryRange" className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4] " placeholder='Salary Range'/>
                </div>

               
                <div className="mb-4">
                    <label for="experience" className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1">Experience</label>
                    <input type="text" id="experience" name="experience" className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]" placeholder='Experience'/>
                </div>
                <div className="mb-4">
                    <label for="qualification" className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1">Qualification</label>
                    <input type="text" id="qualification" name="qualification" className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]" placeholder='Qualification'/>
                </div>

                
                <div className="mb-4">
                    <label for="applicationDeadline" className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1">Application Deadline</label>
                    <input type="date" id="applicationDeadline" name="applicationDeadline" className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder='Job Application Deadline' />
                </div>

               
                <div className="mb-4">
                    <label for="jobApplicationLink" className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1">Job Application Link</label>
                    <input type="url" id="jobApplicationLink" name="jobApplicationLink" className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]" placeholder='Job Application URL' />
                </div>

               
                <div className="col-span-2 mb-4">
                    <label for="jobDescription" className="flex justify-start font-poppins text-[#000] md:text-[1.5625rem] lg:text-[1.5625rem] xl:text-[1.5625rem] 2xl:text-[1.5625rem] font=[500]  mb-1">Job Description</label>
                    <textarea id="jobDescription" name="jobDescription" className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]" rows="4" placeholder='Job Description'/>
                </div>
            </div>
            
            
            <div className="text-right">
                <Button msg = "Post a Job" border = "rounded-button"/>
            </div>
        </form>
    </div>
    </div>
    

    </div>
  )
}

export default JobPost