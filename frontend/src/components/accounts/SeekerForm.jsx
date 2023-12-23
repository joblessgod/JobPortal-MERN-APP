import React, { useState,useEffect } from "react";
import Button from "../../global/Button";
import {AiFillEye} from 'react-icons/ai';
import {AiFillEyeInvisible} from 'react-icons/ai';
import Login from "../login/Login";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import Select from "react-select";
import { fetchPublicCategories } from "../../redux/publiccategory/publiccatSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../global/Loader";
const userType = "seeker";

  const SeekerForm=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const publiccategories = useSelector(
      (state) => state.publiccategories.publiccategories
    );
    const [showPassword,setShowPassword] = useState(false);
    const[selectedOption,setSelectedOption] = useState('');
    const [formData,setFormData] = useState({
      name: "",
      pjobcategory:"",
      email: "",
      phone: "",
      password: "",
      usertype: userType,
    });
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [showLogin,setShowLogin] = useState(false);
    //onchange of select job categoey
const handlecatChange = (selectedOption) => {
  setSelectedOption(selectedOption.value);
};
    const hideLoginHandler=()=>{
      setShowLogin(false);
      navigate('/');
     }
    const handleChange=(e)=>{
  setFormData({
    ...formData,
    pjobcategory:selectedOption,
    [e.target.id] : e.target.value
  })
  console.log(formData);
    }
    const handleShowClick=()=>{
      setShowPassword(!showPassword);
    }
   
const handleSubmit=async(e)=>{
  e.preventDefault();
  setLoading(true);
  try{
    setLoading(true);
    const res = await fetch('/api/auth/signUp',{
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
    setShowLogin(true);
    
  }catch(error){
  setLoading(false);
  setError(error.message);
  
  
  }
 

};

  // Dispatch the fetch action
  useEffect(() => {
    dispatch(fetchPublicCategories());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-start items-start p-4 gap-3">
      <h2 className="font-poppins text-[#000] text-start text-[1rem] md:text-[1.5rem]  font-[500]">
        Create your free Jobseeker Account
      </h2>
      <p className="font-poppins text-[0.8rem] md:text-[1rem] text-start text-[#AEB0B4] ">
        Register with basic information, Complete your profile and start
        applying For the job For free!
      </p>
      <form  className="w-[100%]" onSubmit={handleSubmit}>
        <div className="flex flex-col  ">
        
          <div className="mb-4">
            <label
              htmlFor="name"
              className="flex justify-start font-poppins text-[#000]    mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="companyName"
              className={`w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] font-poppins text-[#AEB0B4] text-[0.8rem] `}
              onChange={handleChange}
              placeholder="Name"
            />
           
          </div>
          <div className="mb-1">
          <label
            htmlFor="jobCategory"
            className="flex justify-start font-poppins text-[#000]    mb-1"
          >
           Preferred Job Category
          </label>
          <Select
            value={selectedOption.label}
            onChange={handlecatChange}
            options={publiccategories.map((category) => ({
              label: category.categoryname,
              value: category.categoryname,
            }))}
            isSearchable
            placeholder="--Select Preferred Job Category--"
          />
           
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="flex justify-start font-poppins text-[#000]   mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] font-poppins text-[#AEB0B4] text-[0.8rem] `}
              onChange={handleChange}
              placeholder="Email Adress"
            />
           
          </div>
          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="flex justify-start font-poppins text-[#000]  mb-1"
            >
              Mobile No.
            </label>
            <input
              type="tel"
              id="phone"
              name="mobile"
              className={`w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] font-poppins text-[#AEB0B4] text-[0.8rem] `}
              onChange={handleChange}
              placeholder="Mobile Number"
            />
            
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="flex justify-start font-poppins text-[#000]   mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className={`w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] font-poppins text-[#AEB0B4] text-[0.8rem] `}
              onChange={handleChange}
              placeholder="Password"
            />
           <div className="absolute top-9 right-2 cursor-pointer" onClick={handleShowClick}>
           {showPassword ? (<AiFillEye size = {20}/>):(<AiFillEyeInvisible size={20}/>)}
           </div>
          </div>

        </div>
        <p className="text-poppins text-[1rem] text-start text-[#AEB0B4] mb-2">
          By clicking on 'Register' below you are agreeing to the terms and
          privacy of JobPortal!
        </p>

        <div className="flex flex-row justify-center items-center">
        {loading ? (<Loader  
          width={100}
          height = {100}
          />):( <Button msg="Register" border="rounded-button" />)}
         
        </div>
        {error && <p className="text-[red]  font-poppins text-[0.8rem] mt-4">{error}</p>}
      </form>
      {showLogin && <Login onClose={hideLoginHandler} />}
    </div>
  );
};

export default SeekerForm;
