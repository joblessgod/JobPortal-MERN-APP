import React,{useState,useEffect} from 'react';
import Pagination from "../../global/Pagination";
import Title from "../../global/Title";
import { useSelector,useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Link,useNavigate } from "react-router-dom";
import { InfinitySpin } from 'react-loader-spinner';
import { deleteCategory, fetchCategories } from '../../redux/category/categorySlice';
import UpdateCategory from './UpdateCategory';


const ShowCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const { currentUser } = useSelector((state) => state.user);
 const {categories}  = useSelector((state) => state.categoryLists);
 const error = useSelector((state) => state.jobsLists.error);
 const loading = useSelector((state) => state.jobsLists.loading);
 const [categoryDeleteError,setCategorydeleteError] = useState(null);
 const [showUpdateCategory,setShowUpdateCategory] = useState(false);
 const [selectedCategoryId, setSelectedCategoryId] = useState(null);
 const [currentPage,setCurrentPage] = useState(1);
 const [postsPerPage,setpostsPerPage] = useState(8);
 //const[jobDeleteError,setjobDeleteError] = useState(null);
 //pagination logic
 const lastPostIndex = currentPage * postsPerPage;
 const firstPostIndex = lastPostIndex - postsPerPage;
 const currentPosts = categories.slice(firstPostIndex, lastPostIndex);
//delete categories
const handleCategoryDelete = async (categoryId) => {
    try {
      
      const response = await fetch(`/api/auth/deletecategory/${categoryId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log('Delete response:', data);
      if(data.success === false){
        setCategorydeleteError(data.message)
        return;
      }
      dispatch(deleteCategory(categoryId));
    } catch (error) {
      // Handle any other errors that may occur during the fetch
      setCategorydeleteError(error.message)
    }
  };
//dispatch for getting categories
useEffect(() => {
  dispatch(fetchCategories());
}, [dispatch]);
//for update
const showUpdateClick=(categoryId)=>{
  setSelectedCategoryId(categoryId);
  setShowUpdateCategory(true);
}
const hideUpdateClick=()=>{
  setShowUpdateCategory(false);
}
console.log(categories);
  return (
    <div className="container mx-auto px-3 ">
    <Title title = {`Listed Categories By ${currentUser.organizationname}`} />
  {categoryDeleteError && <p className='text-[red] font-poppins'>{categoryDeleteError}</p>}
    {loading && (
      <div className="flex justify-center">
        <InfinitySpin width={200} height={200} color="black" />
      </div>
    )}
    {!loading && (
      <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 font-poppins my-3">
   
      {currentPosts.map((category, index) => (
        <div
          key={index}
          className="border border-[whitesmoke] rounded-[1rem] p-3 shadow-xl hover:shadow-2xl"
        >
         
          <p className="text-center text-[1.125rem] font-semibold mt-2">
            {category.categoryname}
          </p>
         
          <p className="text-center text-[#718096] mt-1">
          {category.jobCount} Jobs Avaiable!
          </p>
         
          
          <div className="flex flex-row justify-center mt-2 gap-2">
        
          
            <BsPencil size={20} color="#04BCF6" onClick={()=>{showUpdateClick(category._id)}} className='cursor-pointer' />
        
          <AiOutlineDelete
          onClick={() => handleCategoryDelete(category._id)}
            size={20}
            color="red"
            className="cursor-pointer"
          />
        </div>
         
        </div>
      ))}
    </div>
   

    <div className="flex justify-center items-center gap-2 p-3">
    {categories && (
      <Pagination
        totalPosts={categories.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    )}
  </div>
  </div>
    )}
    
    {error && <p className='text-[red] font-poppins'>{error.message}</p>}

  {!loading && categories.length === 0 && <p className='text-[green] font-poppins my-4 text-[1.5rem]'>No Categories Found!</p>}
  {showUpdateCategory && <UpdateCategory onClose = {hideUpdateClick} categoryId={selectedCategoryId}/>}
  </div>
);
};

export default ShowCategory;