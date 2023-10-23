// DeleteUserLogic.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
} from "../../redux/user/userSlice";

const DeleteProfile = () => {
  const dispatch = useDispatch();
  const { currentUser,error } = useSelector((state) => state.user);

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/auth/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return handleDelete;
};

export default DeleteProfile;
