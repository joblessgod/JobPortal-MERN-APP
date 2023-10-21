import React from 'react'
import Button from '../../global/Button';
import download from '../../assets/images/download.png'
import {MdOutlineLocationOn} from 'react-icons/md';
import {FcClock} from 'react-icons/fc'
import {SiCashapp} from 'react-icons/si'

const AllJobs = (props) => {
  return (
   
    <div className='flex  flex-row justify-between items-center divv  p-4 sm-max:flex-col   '>
    <div className='flex flex-row justify-start smm-max:flex-col  '>
    <img src={download}  alt = "company image"  className= 'h-[5.685rem] w-[5.685rem]   border-radiuss m-auto'/>
    <div className='flex flex-col p-[1rem] gap-2 smm-max:gap:3 '>
    <p className='font-poppins text-[#5F5858] text-[1rem] font-[400] landing-[5rem] minn:text-[1rem] '>{props.companyname}</p>
    
    <h3 className='text-[#000] font-poppins font-[600] lg:text-[1.5625rem] lg:landing-[5rem] text-[1rem] landing-[3rem] minn:text-[0.8rem]' >{props.position} ({props.exp} Year Exp.)</h3>
    
    <div className='flex flex-row justify-center smmm-max:gap-1   gap-6 smmm-maxx:flex-col smmm-maxx:items-center smmm-maxx:gap-2  smm-max:gap-1 col:flex-col col:items-center '>
  <div className='flex items-center  gap-1   '>
    <MdOutlineLocationOn size={15} />
    <span className='text-[#000] font-poppins font-[400] landing-[5rem] text-[0.9375rem] '>{props.location}</span>
  </div>
  <div className='flex items-center gap-1 '>
    <FcClock size={15} />
    <span className='text-[#000] font-poppins font-[400] landing-[5rem] text-[0.9375rem]'>{props.site}</span>
  </div>
  <div className='flex items-center gap-1 '>
    <SiCashapp size={15} />
    <span className='text-[#000] font-poppins font-[400] landing-[5rem] text-[0.9375rem]'>NRS.{props.salary}</span>
  </div>
</div>

    </div>
    </div>
    <div className=' w-[fit-content]  '>
  <Button msg="View Details" border = "rounded-button" />
   
  </div>
  
  </div>
   
   
    
  )
}

export default AllJobs