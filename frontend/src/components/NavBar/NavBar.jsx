import React from 'react'
import Button from '../../global/Button'
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutFailure,signOutSuccess,signOutStart } from '../../redux/user/userSlice'
import { useDispatch } from "react-redux";
import {FiLogOut} from 'react-icons/fi'
const hello = "font-poppins font-bold";
const nam = "text-[#1C64F2]";
const NavBar = (props) => {
const dispatch = useDispatch();
const {currentUser} = useSelector(state=>state.user);
const handleLogOut= async()=>{
 
    try{
      dispatch(signOutStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutFailure(data.message));
  
        return;
      }
      dispatch(signOutSuccess());
    }catch(error){
      dispatch(signOutFailure(error.message));
  
    }
  
   
}
  return (
    <header className= ' bg-[#fff]   flex flex-col md:flex-row md:justify-between md:items-center p-4'>
   <Link to = "/">
   <h1 className='text-button text-logo font-bold font-logo text-center'>JobsPortal</h1>
   </Link>
   <div className='flex gap-6 justify-center items-center'>
   {currentUser ? ( <Link to = "/profile"> <img src = {currentUser.avatar} alt = "profile image" className="h-11 w-11 rounded-[999px] cursor-pointer" /></Link>):(
    <div className='flex flex-row gap-3'>
   <button className='font-logoo text-button  font-bold' onClick={props.onShowLogin}>Login</button>
   <div className='border border-[gray]'/>
   <button className='font-logoo text-button  font-bold' onClick={props.onShowRegister}>Register</button>
   </div>
   )}
   
   {
    
   currentUser && currentUser.usertype === "employer" ? (
      <Link to="/jobpost">
        <Button msg="Post a job" border="rounded-button" onClick={props.click} />
      
      </Link>
    ) : currentUser && currentUser.usertype === "seeker" ? (
      <p className={hello}>
        Hello,
        <Link to="/profile">
          <span className={nam}>{currentUser.name.split(" ")[0]}</span>
        </Link>
      </p>
    ):""
  }
  {currentUser &&   <FiLogOut size={25} className='cursor-pointer' color='gray'  onClick={handleLogOut}/>}
   </div>
   </header>
  )
}

export default NavBar