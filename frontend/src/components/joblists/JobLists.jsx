import React from 'react';
import {BsEye} from "react-icons/bs";
import {BsPencil} from "react-icons/bs";
import {AiOutlineDelete} from "react-icons/ai";
import Button from '../../global/Button';
const Table = ({ data }) => {
  
  return (
    <div className="overflow-x-auto bg-[#FFF]  p-3 ">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-solid border-[#D6D0D0] rounded-[0.625rem] ">
        <thead className="bg-gray-200 ">
          <tr className='font-poppins text-[1.25rem] font-[600]'>
          <th className="text-center py-2 px-2">ID</th>
            <th className="text-center py-2 px-2">Title</th>
            <th className="text-center py-2 px-2">Job Type</th>
            <th className="text-center py-2 px-2">Posted Date</th>
            <th className="text-center py-2 px-2">Application Deadline</th>
            <th className="text-center py-2 px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className='font-poppins text-[#000] text-[1rem] '>
            <td className="py-2 px-2">{item.id}</td>
              <td className="py-2 px-2">{item.title}</td>
              <td className="py-2 px-2">{item.jobType}</td>
              <td className="py-2 px-2">{item.postedDate}</td>
              <td className="py-2 px-2">{item.applicationDeadline}</td>
              <td className="py-2 px-2 flex flex-row justify-center gap-3">
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                <BsEye size={20} color='#338573'/>
                </button>
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                <BsPencil size={20} color='#04BCF6'/>
                </button>
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                <AiOutlineDelete size={20} color='red'/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     {/* 
    <div className='flex flex-row justify-center gap-2 m-4'>
     <Button msg = "Prev"/>
     <Button msg = "Next"/>
     </div>
    */} 
    </div>
  );
};

export default Table;
