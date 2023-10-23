import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../global/Button";
import DeleteProfile from "./DeleteProfile";
import SignOut from "./SignOut";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase.js";
import {
  updateUserSuccess,
  updateUserFailure,
  updateUserStart,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../../redux/user/userSlice.js";

const EmployerProfile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  console.log(formData);
  console.log(filePerc);
  console.log(fileUploadError);

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/auth/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  /* const handleDelete= async ()=>{
try{
dispatch(deleteUserStart());
const res = await fetch(`/api/auth/delete/${currentUser._id}`,{
  method:"DELETE"
})
const data = res.json();
if(data.success === false){
  dispatch(deleteUserFailure(data.message))
  return;
}
dispatch(deleteUserSuccess());
}catch(error){
  dispatch(deleteUserFailure(error.message))
}
  }*/
  //for delete user
  const handleDelete = DeleteProfile();

  const handleClickToDelete = async () => {
    await handleDelete();
  };
  //for handle signout
  const handleSignOut = SignOut();
  const handleClickToSignOut = async()=>{
    await handleSignOut();
  }
  return (
    <div className="max-w-4xl m-auto">
      <h1 className="text-[1.5rem] font-poppins font-bold text-[#1C64F2] my-2">
        {currentUser.organizationname}
      </h1>
      <form onSubmit={handleUpdateSubmit}>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <img
          onClick={() => {
            fileRef.current.click();
          }}
          src={formData.avatar || currentUser.avatar}
          alt="profile pic"
          className="h-24 w-24 rounded-[999px] m-auto cursor-pointer"
        />
        <p className="text-sm m-2 font-poppins">
          {fileUploadError ? (
            <span className="text-[#FF0000]">
              Error (Image Must be Less Than 2 Mega Byte)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-[gray]">{`Uploading ${filePerc} %`}</span>
          ) : filePerc === 100 ? (
            <span className="text-[green]">Image Successfully Uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <div className="sm:grid sm:grid-cols-2 sm:gap-6  p-3 flex flex-col gap-2">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="flex justify-start font-poppins text-[#000]    mb-1"
            >
              Organization Full Name
            </label>
            <input
              type="text"
              id="organizationname"
              name="companyName"
              className={`w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] font-poppins text-[#AEB0B4] text-[0.8rem] `}
              placeholder="Full Name Of Name"
              defaultValue={currentUser.organizationname}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
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
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="flex justify-start font-poppins text-[#000]    mb-1"
            >
              Mobile No
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className={`w-full p-2 border border-[#D6D6D6] rounded-[0.625rem] font-poppins text-[#AEB0B4] text-[0.8rem] `}
              placeholder="Phone"
              defaultValue={currentUser.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
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
              onChange={handleChange}
            />
          </div>
        </div>
        <Button msg="Update" border="rounded-button" />
        <p className="text-[red] font-poppins">{error ? error : ""}</p>
        {updateSuccess && (
          <p className="text-[green] font-poppins my-3 text-start">
            Profile Updated Successfully!
          </p>
        )}
        <div className=" bg-[gray] h-1  my-2" />
        <div className="flex flex-row justify-between items-center mt-2 mb-2">
          <span
            onClick={handleClickToDelete}
            className="font-poppins text-[#B91C1C] cursor-pointer  "
          >
            Delete Account
          </span>
          <span className="font-poppins text-[#22C55E]  ">Applied Jobs</span>
          <button onClick={handleClickToSignOut} className="font-poppins text-[#B91C1C] cursor-pointer ">Sign Out</button>
        </div>
      </form>
    </div>
  );
};

export default EmployerProfile;
