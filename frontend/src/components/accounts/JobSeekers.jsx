import React from 'react'
import JobSeekesDesc from './JobSeekesDesc'
import SeekerForm from './SeekerForm'

const JobSeekers = () => {
  return (
    <div className='flex flex-row gap-4 p-9 '>
    
    <div className='bg-[#46528c] hidden md:w-[49%] md:block md:p-10 lg:w-[49%] lg:block lg:p-10 xl:w-[49%] xl:block xl:p-10 2xl:w-[49%] 2xl:block 2xl:p-10' >
    <h1 className='text-[#fff] font-poppins text-[1.5rem] font-[600]'>Register for a better opportunity!</h1>
    <JobSeekesDesc title = "#1 Job Site of Nepal" desc = "Google Analytics, Social Medias, Jobseeker and Employer have always put us on top!"/>
    <JobSeekesDesc title = "Most Trusted Job Portal in Nepal" desc = "Over 400 million+ page views since the inception year 2009 over 6.5 million+ monthly visitors and it's growing everyday."/>
    <JobSeekesDesc title = "It's FREE and It will Always Be" desc = "At merojob we don't put a price on opportunity, what you see is what you get! An average of 25,000 job opportunities to choose from. No registration fees. No hidden costs"/>
    <JobSeekesDesc title = "Your Confidentiality is Assured" desc = "We understand your professional goals are yours and yours only. So you can be confident that searching and applying for your next career opportunity is 100% confidential and secure."/>
    <JobSeekesDesc title = "We Provide Career Opportunities" desc = "We are proud to have partnered with more than 40,000+ businesses and launched over 2,00,000+ careers and counting."/>
    </div>
    <div className='  md:w-[45%] lg:w-[45%] xl:w-[45%] 2xl:w-[45%]'>
    <SeekerForm />
    </div>
    </div>
  )
}

export default JobSeekers