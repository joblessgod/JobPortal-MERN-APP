import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <div className='bg-[#338573] p-2 md:p-3 lg:p-3'>
    <p className='text-[#fff] font-poppins font-[400] leading-0 sm:text-[1rem] md:text-[1.25rem]lg:text-[1.25rem] smmm-max:text-[0.8rem]'>&copy; {currentYear} Jobs Portal. Powered By AntiBug.</p>
    </div>
  )
}

export default Footer