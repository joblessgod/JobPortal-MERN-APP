import React from 'react'
import { signOutFailure,signOutSuccess,signouStart } from '../../redux/user/userSlice'
import { useDispatch } from "react-redux";
const SignOut = () => {
    const dispatch = useDispatch();
 
 const handleSignOut= async ()=>{
   try{
    dispatch(signouStart());
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
 return handleSignOut;
}

export default SignOut