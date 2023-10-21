import React from 'react'
import AllJobs from './AllJobs'
import Button from '../../global/Button'
import {HiOutlineArrowCircleRight} from "react-icons/hi"
const ListedJobs = (props) => {
  return (
    <div className='p-6 bg-[#FFF] minn:p-2 smmm-maxx:p-2 smmm-max:p-2'>
    <h2 className='text-[#000] font-poppins font-[600] text-[1.8rem] py-8'>All Popular Listed jobs</h2>
    <div className='flex flex-col gap-[2rem] px-2 '>
    
    <AllJobs companyname = "Match Company Limited" position = "Senior UI/UX Designer" exp="3" location = "Kathmandu Nepal" site = "Full-Time" salary = "100000" />
    <AllJobs companyname = "Match Company Limited" position = "Senior UI/UX Designer" exp="3" location = "Kathmandu Nepal" site = "Full-Time" salary = "100000" />
    <AllJobs companyname = "Match Company Limited" position = "Senior UI/UX Designer" exp="3" location = "Kathmandu Nepal" site = "Full-Time" salary = "100000" />
    <AllJobs companyname = "Match Company Limited" position = "Senior UI/UX Designer" exp="3" location = "Kathmandu Nepal" site = "Full-Time" salary = "100000" />
    <AllJobs companyname = "Match Company Limited" position = "Senior UI/UX Designer" exp="3" location = "Kathmandu Nepal" site = "Full-Time" salary = "100000" />
    <AllJobs companyname = "Match Company Limited" position = "Senior UI/UX Designer" exp="3" location = "Kathmandu Nepal" site = "Full-Time" salary = "100000" />
    </div>
    
    
    
    <style jsx>{`
   
    .border-radiuss{
      border-radius:50%;
    }
    .divv{
        border:1px solid #EFEFF0;
        border-radius:0.625rem;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);

    }
  `}</style>
  <div className=' inline-block p-[1.5rem] '>
  <Button msg="View More" border = "rounded-button" icon = {HiOutlineArrowCircleRight} />
  </div>
  
    </div>
  )
}

export default ListedJobs
