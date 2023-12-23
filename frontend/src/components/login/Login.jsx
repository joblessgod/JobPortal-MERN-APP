import React, { useState } from "react";
import Modal from "../modal/Modal";
import Button from "../../global/Button";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { useSelector,useDispatch } from 'react-redux';
import { signInFailure,signInStart,signInSuccess } from "../../redux/user/userSlice";
import Loader from "../../global/Loader";


const Login = (props) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
 
  const navigate  = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
   dispatch(signInStart());
    const res = await fetch('/api/auth/logIn',{
      method:"POST",
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(formData),
      }
    );
    const data = await res.json();
     
    if(data.success === false){
     dispatch(signInFailure(data.message));
      return;
    }
   dispatch(signInSuccess(data));
    navigate('/');
    if (props.onClose) {
      props.onClose();
    } 
  }catch(error){
    dispatch(signInFailure(error.message));
  }

    };
  return (
    <Modal>
      <h1 className="text-[#000] font-poppins font-[600]  text-[1.5rem] text-center">
        Login to your account
      </h1>
     
      <div className="flex items-center fixed top-5 right-3">
        <button onClick={props.onClose}>
          <AiOutlineClose size={25} color="black" />
        </button>
      </div>

      <div className="bg-white p-6 mt-2 rounded shadow-lg border border-[#D6D6D6] rounded-[0.625rem]">
        <h4 className=" font-poppins text-[#5f6061] mb-2 text-center">
          Enter your credentials below
        </h4>
        <form className="w-[100%]" onSubmit={handleSubmit}>
          <div className="flex flex-col ">
            <div className="mb-4">
              <label
                htmlFor="usertype"
                className="flex justify-start font-poppins text-[#000]   font=[500]  mb-1"
              >
                Who Are You?
              </label>
              <select
                id="usertype"
                name="usertype"
                className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                onChange={handleChange}
              >
                <option value="">Choose Who You Are</option>
                <option value="employer">Employer</option>
                <option value="seeker">JobSeeker</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="flex justify-start font-poppins text-[#000]   font=[500]  mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                placeholder="Your Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="flex justify-start font-poppins text-[#000] font=[500]  mb-1"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full p-4 border border-[#D6D6D6] rounded-[0.625rem] bg-[#fff] font-poppins text-[#AEB0B4]"
                placeholder="Your Password"
                onChange={handleChange}
                required
              />
              <div
                className="absolute top-11 right-3 cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <AiFillEye size={25} />
                ) : (
                  <AiFillEyeInvisible size={25} />
                )}
              </div>
            </div>
          </div>
          {error && <p className="text-[red]  font-poppins text-[1rem] mb-4">{error}</p>}
         
         {loading ? (<Loader 
          width={100}
          height = {100}
         
          
        />):( <Button msg="LogIn" border="rounded-button"/>)}
        
        </form>
      </div>

      <div className="flex justify-center items-center p-4">
        <button className="font-logoo text-button  font-bold">
          Forgot Password?
        </button>
      </div>
    </Modal>
  );
};

export default Login;
