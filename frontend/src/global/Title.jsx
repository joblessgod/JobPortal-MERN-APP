import React from 'react'

const Title = (props) => {
  return (
    <div className='bg-[#F4F5F7] p-2'>
<h2 className='text-black font-poppins text-[1.875rem] font-[500] leading-[5rem]'>{props.title}</h2>
</div>
  )
}

export default Title