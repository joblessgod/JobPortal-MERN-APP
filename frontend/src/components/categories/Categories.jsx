import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Category from '../category/Category';
import {fetchPublicCategories} from '../../redux/publiccategory/publiccatSlice'
import Pagination from '../../global/Pagination';

const Categories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const dispatch = useDispatch();
  const publiccategories = useSelector(
    (state) => state.publiccategories.publiccategories
  );

  useEffect(() => {
    // Dispatch the fetchCategories async thunk when the component mounts
    dispatch(fetchPublicCategories());
  }, [dispatch]);

//pagination
const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;
const currentPosts = publiccategories.slice(firstPostIndex, lastPostIndex);

  return (
    <div className='bg-[#F6F7FA] p-6'>
      <h1 className='text-[#000] font-poppins text-[1.875rem] mt-0 py-8 font-[600]'>
        Popular Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2">
        {currentPosts.map((category) => (
          <Category key={category.id} category={category.categoryname} job={category.jobCount} id = {category._id} />
        ))}
      </div>
      <div className="flex justify-center p-2">
      { <Pagination totalPosts = {publiccategories.length} postsPerPage = {postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>}
      </div>
    </div>
  );
};

export default Categories;
