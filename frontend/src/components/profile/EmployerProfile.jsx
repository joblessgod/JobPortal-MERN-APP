import React from "react";
import { useSelector } from "react-redux";
import Button from "../../global/Button";

const SeekerProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-4xl m-auto">
      <h1 className="text-[1.5rem] font-poppins font-bold text-[#1C64F2] my-2">{currentUser.organizationname}</h1>
      <img src = {currentUser.avatar} alt = 'profile pic' className="h-24 w-24 rounded-[999px] m-auto"/>
      <div className="sm:grid sm:grid-cols-2 sm:gap-6  p-3 flex flex-col gap-2">
     
      <div className="mb-4">
        <label
          htmlFor="name"
          className="flex justify-start font-poppins text-[#000]    mb-1"
        >
          Organization Name
        </label>
        <input
          type="text"
          id="organizationname"
          name="companyName"
          className={`w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] font-poppins text-[#AEB0B4] text-[0.8rem] `}
          placeholder="Name"
          value={currentUser.organizationname}
        />
      </div>
     

      <div className="mb-4">
      <label
        htmlFor="name"
        className="flex justify-start font-poppins text-[#000]    mb-1"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className={`w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] font-poppins text-[#AEB0B4] text-[0.8rem] `}
        placeholder="Email"
        value = {currentUser.email}
      />
    </div>

    <div className="mb-4">
    <label
      htmlFor="name"
      className="flex justify-start font-poppins text-[#000]    mb-1"
    >
      Mobile No
    </label>
    <input
      type="text"
      id="phone"
      name="companyName"
      className={`w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] font-poppins text-[#AEB0B4] text-[0.8rem] `}
      placeholder="Name"
      value={currentUser.phone}
    />
  </div>

  <div className="mb-4">
  <label
    htmlFor="name"
    className="flex justify-start font-poppins text-[#000]    mb-1"
  >
    Password
  </label>
  <input
    type="password"
    id="password"
    name="password"
    className={`w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] font-poppins text-[#AEB0B4] text-[0.8rem] `}
    placeholder="password"
  />
</div>


</div>
<Button msg = "Update" border = "rounded-button"/>
<div className=" bg-[gray] h-1  my-2"/>
<div className="flex flex-row justify-between items-center p-2 mt-2 mb-2">
<button className='font-poppins text-[#B91C1C]  ' >Delete Account</button>
<button className='font-poppins text-[#22C55E]  ' >Listed Jobs</button>
<button className='font-poppins text-[#B91C1C]  ' >Sign Out</button>
</div>

    </div>
  );
};

export default SeekerProfile;
