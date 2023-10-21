import React from 'react';
import Modal from '../modal/Modal';
import { FcManager } from 'react-icons/fc';
import { FcOrganization } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../../global/Button';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
const Register = (props) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 640 }); // Adjust the screen width as needed

  return (
    <Modal>
      <div className="bg-[#fff] relative overflow-auto p-2">
        <h1 className="font-poppins text-center font-[500] mb-2 text-[1rem] sm:text-[1.5rem] md:text-[1.5rem] xl:text-[1.5rem] 2xl:text-[1.5rem]">
          Register in JobPortal
        </h1>
        <div className="fixed top-5 right-3">
          <button onClick={props.onClose}>
            <AiOutlineClose size={25} />
          </button>
        </div>

        <div className="flex flex-col p-4 gap-2 sm:flex sm:flex-row sm:justify-between sm:p-4 sm:mt-2 md:flex md:flex-row md:justify-between md:p-4 md:mt-2 lg:flex lg:flex-row lg:justify-between lg:p-4 lg:mt-2 xl:flex xl:flex-row xl:justify-between xl:p-4 xl:mt-2 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:p-4 2xl:mt-2 shadow-lg border border-[#D6D6D6] rounded-[0.625rem]">
          <div className="flex flex-col gap-2 justify-between items-center">
            <h3 className="font-poppins">Register as JobSeeker</h3>
            {isSmallScreen ? (
              <FcManager size={100} /> // Icon size for small screens
            ) : (
              <FcManager size={200} /> // Icon size for larger screens
            )}
            <Link to="./seekerregister" onClick={props.onClose}>
            <Button msg="Register" border="rounded-button" onClick = {props.onBtnClick} />
            </Link>
          </div>
          <div className="bg-[#000] border-[0.1rem] border-[#D6D6D6]" />
          <div className="flex flex-col gap-2 justify-between items-center">
            <h3 className="font-poppins">Register as Employeer</h3>
            {isSmallScreen ? (
              <FcOrganization size={100} /> // Icon size for small screens
            ) : (
              <FcOrganization size={200} /> // Icon size for larger screens
            )}
            <Link to = "employer" onClick={props.onClose}>
            <Button msg="Register" border="rounded-button" />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Register;
