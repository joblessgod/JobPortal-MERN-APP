import React from 'react'
import { useSelector } from 'react-redux';
import SeekerProfile from './SeekerProfile';
import EmployerProfile from './EmployerProfile';
import Home from '../home/Home';
const Profile = () => {
  const {currentUser} = useSelector((state)=>(state.user)); 
  return (
    <div>
 {currentUser && currentUser.usertype === "seeker" ?( <SeekerProfile />):currentUser && currentUser.usertype === "employer" ? (<EmployerProfile />):<Home/> }
 </div>
  )
}

export default Profile;
