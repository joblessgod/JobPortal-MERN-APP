import React, { useState } from "react";
import Button from "../../global/Button";
import JobSeekesDesc from "./JobSeekesDesc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {useNavigate} from 'react-router-dom'
import Login from '../login/Login';
import { InfinitySpin } from "react-loader-spinner";
const userType = "employer"

const Employer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  organizationname: "",
  email: "",
  phone: "",
  password: "",
  usertype: userType,
  });
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [frontendError,setFrontEndError] = useState({
    email: "",
    phone: "",
    password: "",
  });
 
  const[showLogin,setShowLogin] = useState(false);
  const hideLoginHandler=()=>{
    setShowLogin(false);
    navigate('/');
   }
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fieldsToValidate = ["organizationname", "email", "phone", "password"];
    const newErrors = {};
    fieldsToValidate.forEach((field) => {
      if (formData[field].trim() === "") {
        newErrors[field] = `${field} cannot be blank.`;
      } else {
        newErrors[field] = ""; // Clear any previous errors for this field
      }
    });

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number should be a 10-digit number.";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password should be at least 8 characters long.";
    }
    setFrontEndError(newErrors);

    // Check if any errors exist
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (hasErrors) {
      return; // Don't proceed with form submission if there are errors
    }
    
    try{
      setLoading(true);
      const res = await fetch('/api/auth/esignUp',{
        method:"POST",
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify(formData),
        }
      );
      const data = await res.json();
      
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      setShowLogin(true)
      
    }catch(error){
    setLoading(false);
    setError(error.message);
    
    
    }
   
   
   
      };
    
    

  return (
    <div className="flex flex-row justify-between gap-1 p-8">
      <div className="flex flex-col justify-start items-start p-4 gap-2 w-[100%] md:w-[49%] ">
        <h2 className="font-poppins text-[#000] text-start text-[1rem] md:text-[1.5rem]  font-[500]">
          Create your Employer Account
        </h2>
        <p className="font-poppins text-[0.8rem] md:text-[1rem] text-start text-[#AEB0B4] ">
          Fill the basic information and start recruiting now!
        </p>
        <form method="post" className="w-[100%]" onSubmit={handleSubmit}>
          <div className="flex flex-col  ">
          
            <div className="mb-4">
              <label
                htmlFor="organizationName"
                className="flex justify-start font-poppins text-[#000]  mb-1"
              >
                Organization Name:
              </label>
              <input
                type="text"
                id="organizationname"
                onChange={handleChange}
                className="w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] font-poppins text-[#AEB0B4] text-[0.8rem] "
                placeholder="Organization Name"
              />
              {frontendError.organizationname && <p className="text-left font-poppins text-[red] mt-2">{frontendError.organizationname}</p>}
            </div>

            <div className="mb-4">
              <label
                htmlFor="organizationEmail"
                className="flex justify-start font-poppins text-[#000]  mb-1"
              >
                Organization Email:
              </label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                className="w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] font-poppins text-[#AEB0B4] text-[0.8rem] "
                placeholder="Organization Email"
              />
              {frontendError.email && <p className="text-left font-poppins text-[red] mt-2">{frontendError.email}</p>}
            </div>
            <div className="mb-4">
              <label
                htmlFor="organizationPhone"
                className="flex justify-start font-poppins text-[#000]  mb-1"
              >
                Organization Phone:
              </label>
              <input
                type="number"
                id="phone"
                onChange={handleChange}
                className="w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] font-poppins text-[#AEB0B4] text-[0.8rem] "
                placeholder="Organization Phone"
              />
              {frontendError.phone && <p className="text-left font-poppins text-[red] mt-2">{frontendError.phone}</p>}
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="flex justify-start font-poppins text-[#000]  mb-1"
              >
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] font-poppins text-[#AEB0B4] text-[0.8rem] "
                placeholder="Password"
              />
              {frontendError.password && <p className="text-left font-poppins text-[red] mt-2">{frontendError.password}</p>}

              <div
                className="absolute top-9 right-2 cursor-pointer "
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </div>
            </div>
          </div>
          <p className="text-poppins text-[1rem] text-start text-[#AEB0B4] mb-2">
            By clicking on 'Register' below you are agreeing to the terms and
            privacy of JobPortal!
          </p>

          <div className="flex flex-row justify-center items-center">
          {loading ? (<InfinitySpin className = "items-center"
            width={100}
            height = {100}
            color="black"/>):( <Button msg="Register" border="rounded-button" />)}
           
          </div>
         {error && <p className="text-[red]  font-poppins text-[0.8rem] mt-4">{error}</p>}
        
        </form>
        { showLogin && <Login onClose={hideLoginHandler} />}

        
       
      </div>

      <div className="border-[0.1rem] hidden border-[#D6D6D6] md:block" />
      <div className="bg-[#46528c] hidden md:w-[49%] md:block md:p-10 lg:w-[49%] lg:block lg:p-10 xl:w-[49%] xl:block xl:p-10 2xl:w-[49%] 2xl:block 2xl:p-10">
        <JobSeekesDesc
          title="#1 Job Site of Nepal"
          desc="Google Analytics, Social Medias, Jobseeker and Employer have always put us on top!"
        />
        <JobSeekesDesc
          title="Most Trusted Job Portal in Nepal"
          desc="Over 400 million+ page views since the inception year 2009 over 6.5 million+ monthly visitors and it's growing everyday."
        />
        <JobSeekesDesc
          title="Your Confidentiality is Assured"
          desc="confident that searching and applying for your next career opportunity is 100% confidential and secure."
        />
        <JobSeekesDesc
          title="8,00,000+ Aspiring Jobseekers Registered"
          desc="We connect you with wide range of applicants looking for opportunities from entry to top level positions in all industries throughout Nepal and abroad."
        />
        <JobSeekesDesc
          title="40,000+ Satisfied Clients"
          desc="We love to create a community of happy clients. Our 80+ full-time employees are successful in helping over 40,000+ brands hire the best through merojob."
        />
      </div>
    </div>
  );
};

export default Employer;
