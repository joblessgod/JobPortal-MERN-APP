import React from 'react'
import Button from '../../global/Button'
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
const hello = "font-poppins font-bold";
const nam = "text-[#1C64F2]";
const NavBar = (props) => {
const {currentUser} = useSelector(state=>state.user);
console.log(currentUser);
  return (
    <header className= ' bg-[#fff]   flex flex-col md:flex-row md:justify-between md:items-center p-4'>
   <Link to = "/">
   <h1 className='text-button text-logo font-bold font-logo text-center'>JobsPortal</h1>
   </Link>
   <div className='flex gap-6 justify-center items-center'>
   {currentUser ? ( <Link to = "/profile"> <img src = {currentUser.avatar} alt = "profile image" className="h-11 w-11 rounded-[999px] cursor-pointer" /></Link>):(
    <div className='flex flex-row gap-3'>
   <button className='font-logoo text-button  font-bold' onClick={props.onShowLogin}>Login</button>
   <button className='font-logoo text-button  font-bold' onClick={props.onShowRegister}>Register</button>
   </div>
   )}
   
   {
    currentUser && currentUser.usertype === "employer" ? (
      <Link to="">
        <Button msg="Post a job" border="rounded-button" onClick={props.click} />
      </Link>
    ) : currentUser && currentUser.usertype === "seeker" ? (
      <p className={hello}>
        Hello,
        <Link to="/profile">
          <span className={nam}>{currentUser.name.split(" ")[0]}</span>
        </Link>
      </p>
    ):(<Button msg="Post a job" border="rounded-button" onClick={props.click} />)
  }
   </div>
   </header>
  )
}

export default NavBar