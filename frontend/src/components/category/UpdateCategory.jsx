import React, { useEffect, useState } from 'react';
import Modal from '../modal/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../redux/category/categorySlice';

const UpdateCategory = (props) => {
  const  categoryId  = props.categoryId;
 const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
 const[loading,setLoading] = useState(false);
 const[categoryUpdateError,setCategoryUpdateError] = useState(null);


useEffect(() => {
  const fetchCategory = async () => {
    
    const res = await fetch(`/api/auth/getcategorybyid/${categoryId}`);
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }
    setCategoryName(data);
  };

  fetchCategory();
}, [categoryId]);
const handleInputChange = (e) => {
  setCategoryName(e.target.value);
};
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setCategoryUpdateError(null);
  try {
    const res = await fetch(`/api/auth/updatecategory/${categoryId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryname: categoryName,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      // Check for success based on the response structure from the backend
      dispatch(updateCategory(data));
      navigate("/viewcategory");
      if (props.onClose) {
        props.onClose();
      }
    } else {
      // Handle error based on the response structure from the backend
      setCategoryUpdateError(data.message || "Failed to update category.");
    }
  } catch (error) {
    setCategoryUpdateError(error.message || "An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
};
console.log(categoryName)
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
         Update Category:
        </label>
        <div className="flex flex-col sm:flex-row">
          <input
            type="text"
            className="w-full sm:w-2/3 border p-2 rounded-md mb-2 sm:mb-0 sm:mr-2"
            placeholder="Loading..."
            value={categoryName.categoryname}
            onChange={handleInputChange}
            id = "categoryname"
          />
         
          <button
            className="w-full sm:w-1/3 px-4 py-2 bg-[#3498db] text-[white] rounded-[0.375rem]"  disabled={loading}
          >
          {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
        </form>
        {categoryUpdateError && (
          <p className="text-[red] font-poppins">{categoryUpdateError }</p>
        )}
      </div>
    </Modal>
  );
};

export default UpdateCategory;
