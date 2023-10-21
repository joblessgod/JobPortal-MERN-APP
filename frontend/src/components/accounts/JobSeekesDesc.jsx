import React from 'react'
import {AiFillCheckCircle} from "react-icons/ai";
const JobSeekesDesc = (props) => {
  return (
    
    <div className='text-[#fff] text-start font-poppins p-4 flex flex-row gap-1 items-start'>
    <div>
    <AiFillCheckCircle size = {25} color = "white"/>
    </div>
    
    <div className='flex flex-col gap-2'>
    <h3 className='text-[1rem] xl:text-[1.2rem]'>{props.title}</h3>
    <p className='text-[0.6rem] xl:text-[0.8rem]'>{props.desc}</p>
    </div>
    </div>
    

  )
}

export default JobSeekesDesc;