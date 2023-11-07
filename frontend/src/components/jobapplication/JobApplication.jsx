import React, { useState,useEffect } from 'react';
import Title from '../../global/Title';
import Button from '../../global/Button';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
import { app } from '../../firebase';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { InfinitySpin } from 'react-loader-spinner';
const JobApplication = () => {
    const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    coverletter: '',
    resume: null,
  });
  const [loading,setLoading] = useState(false);
const[files,setFiles] = useState(undefined);
const [errors,setErrors] = useState({});
  const [applyErrors, setApplyErrors] = useState(null);
 const [fileUploadError,setfileUploadError] = useState(false)
 const[filePerc,setFilePerc] = useState(0);
const {id} = useParams();

  const validateForm = () => {
    let errors = {};

    if (!formData.fullname) {
      errors.fullname = 'Full Name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.phoneno) {
      errors.phoneno = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phoneno)) {
      errors.phoneno = 'Phone Number must be 10 digits';
    }

    if (!formData.coverletter) {
      errors.coverletter = 'Cover Letter is required';
    }

    if (!formData.resume ) {
      errors.resume = 'Resume is required.';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

 


  useEffect(() => {
    if (files) {
      handleFileUpload(files);
    }
  }, [files]);

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
        setfileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, resume: downloadURL })
        );
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        setLoading(true);
        const res = await fetch(`/api/auth/apply/${id}`,{
          method:"POST",
            headers:{
              'content-type':'application/json'
            },
            body:JSON.stringify({...formData,
            userRef:currentUser._id,
            jobid : id
            
            }),
          }
        );
        const data = await res.json();
        
        if(data.success === false){
          setLoading(false);
          setApplyErrors(data.message);
          return;
        }
        setLoading(false);
        setApplyErrors(null);
        
        
      }catch(error){
      setLoading(false);
      setApplyErrors(error.message);
      
      
      }
   
  };
 console.log(applyErrors);
  return (
   <div>
     <Title title = "Job Application Form"/>
     <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-[white] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-[#4a5568] text-sm font-bold mb-2 text-start" htmlFor="fullname">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            className={`appearance-none border rounded-[0.7rem] w-full py-2 px-3 text-[#4a5568] leading-tight focus:outline-none ${errors.fullname ? 'border-[#ea4a5a]' : ''}`}
          />
          {errors.fullname && <p className="text-[#ea4a5a] text-start text-xs font-poppins">{errors.fullname}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-[#4a5568] text-sm font-bold mb-2 text-start" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`appearance-none border rounded-[0.7rem] w-full py-2 px-3 text-[#4a5568] leading-tight focus:outline-none ${errors.email ? 'border-[#ea4a5a]' : ''}`}
          />
          {errors.email && <p className="text-[#ea4a5a] text-start text-xs font-poppins">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-[#4a5568] text-sm font-bold mb-2 text-start" htmlFor="phoneno">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`appearance-none border rounded-[0.7rem] w-full py-2 px-3 text-[#4a5568] leading-tight focus:outline-none ${errors.phoneno ? 'border-[#ea4a5a]' : ''}`}
          />
          {errors.phoneno && <p className="text-[#ea4a5a] text-start text-xs font-poppins">{errors.phoneno}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-[#4a5568] text-sm font-bold mb-2 text-start" htmlFor="coverletter">
            Cover Letter
          </label>
          <textarea
            id="coverletter"
            name="coverletter"
            value={formData.coverletter}
            onChange={(e) => setFormData({ ...formData, coverletter: e.target.value })}
            className={`appearance-none border rounded-[0.7rem] w-full py-2 px-3 text-[#4a5568] leading-tight focus:outline-none ${errors.coverletter ? 'border-[#ea4a5a]' : ''}`}
          />
          {errors.coverletter && <p className=" text-start text-[#ea4a5a] text-xs font-poppins">{errors.coverletter}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-[#4a5568] text-sm font-bold mb-2 text-start" htmlFor="resume">
            Resume (PDF only)
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf"
             onChange={(e) => {
                setFiles(e.target.files[0]);
              }}
            className={`appearance-none border rounded-[0.7rem] w-full py-2 px-3 text-[#4a5568] leading-tight focus:outline-none ${errors.resume ? 'border-[#ea4a5a]' : ''}`}
          />
          {errors.resume && <p className="text-start text-[#ea4a5a] text-xs font-poppins">{errors.resume}</p>}
          <p className="text-sm text-start m-2 font-poppins">
          {fileUploadError ? (
            <span className="text-[#FF0000]">
              Error (File Must be Less Than 2 Mega Byte)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-[gray]">{`Uploading ${filePerc} %`}</span>
          ) : filePerc === 100 ? (
            <span className="text-[green]">File Successfully Uploaded!</span>
          ) : (
            ""
          )}
        </p>
        </div>
        {applyErrors && <p className="text-[red]  font-poppins text-[0.8rem] mt-4">{applyErrors}</p>}
        <div className="flex items-center justify-between">
        {loading ? (
            <InfinitySpin width={100} height={100} color="black" />
          ) : (
            <Button msg="Apply Job" border="rounded-button" />
          )}
        </div>
      </form>
    </div>
    </div>
  );
};

export default JobApplication