import React, { useState } from 'react';
import Modal from '../modal/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddCategory = (props) => {
  const {currentUser} = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
 const[categoryPostError,setCategoryPostError] = useState('');
 const[loading,setLoading] = useState(false);
 const handleInputChange = (e) => {
  setCategoryName(e.target.value);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCategoryPostError(null);
    if (!navigator.onLine) {
      return setCategoryPostError("You are offline. Please check your internet connection and try again.");
    }
    setLoading(false);
    try {
      setLoading(true);
      const res = await fetch("/api/auth/addcategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryname: categoryName, // assuming 'categoryname' is the correct property
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setCategoryPostError(data.message);
        setLoading(false);
        return;
      }
      navigate("/viewcategory");
      if (props.onClose) {
        props.onClose();
      } 
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setCategoryPostError(error.message || 'An error occurred.');
      return;
    }
  };
  console.log(categoryPostError);
  console.log(categoryName);
  
 
  return (
    <Modal>
      <div className="max-w-md mx-auto mt-0 p-3 bg-[#f5f5f5] rounded-[0.375rem]">
     
      <div className="flex items-center fixed top-5 right-3">
      <button onClick={props.onClose} >
        <AiOutlineClose size={25} color="black" title='click here to close' />
      </button>
    </div>
    <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-[#4a5568] mb-2">
         Enter Category Name:
        </label>
        <div className="flex flex-col sm:flex-row">
          <input
            type="text"
            className="w-full sm:w-2/3 border p-2 rounded-md mb-2 sm:mb-0 sm:mr-2"
            placeholder="Enter category name"
            value={categoryName}
            onChange={handleInputChange}
            id = "categoryname"
          />
         
          <button
            className="w-full sm:w-1/3 px-4 py-2 bg-[#3498db] text-[white] rounded-[0.375rem]"  disabled={loading}
          >
          {loading ? 'Adding...' : 'Add Category'}
          </button>
        </div>
        </form>
        {categoryPostError && (
          <p className="text-[red] font-poppins">{categoryPostError}</p>
        )}
      </div>
    </Modal>
  );
};

export default AddCategory;
