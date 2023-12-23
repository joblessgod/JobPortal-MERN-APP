

import { useSelector, shallowEqual } from "react-redux";

import Loader from "../../global/Loader";

const JobLists = () => {
  let serialNumber = 1;
  const { jobs, loading, error } = useSelector(
    (state) => state.jobsLists,
    shallowEqual
  );
 
  const currentDate = new Date();

  // Sorting and filtering jobs based on applicationsCount and applicationdeadline
  const filteredAndSortedJobs = jobs
    .filter((job) => new Date(job.applicationdeadline) > currentDate)
    .sort((a, b) => b.applicationsCount - a.applicationsCount);
  console.log(filteredAndSortedJobs);

  // Taking top 5 jobs
  const top5Jobs = filteredAndSortedJobs.slice(0, 5);
  console.log(top5Jobs);

  const getFormattedDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="overflow-x-auto bg-[#FFF]  p-3  ">
      <h2 className="text-[#000] font-poppins font-[600] text-[1.5rem] ">
        Popular Jobs
      </h2>
 <hr/>
      {loading ? (
        <div className="flex justify-center">
          <Loader width={200} height={200}  />
          </div>
       
      ) : (
        <table className="min-w-full  bg-[white] shadow-md rounded-lg overflow-hidden border border-solid border-[#D6D0D0] rounded-[0.625rem] ">
          <thead className="bg-[#edf2f7] ">
            <tr className="font-poppins text-[1.25rem] font-[600]">
              <th className="text-center py-2 px-2">SN</th>
              <th className="text-center py-2 px-2">Title</th>
              <th className="text-center py-2 px-2">Job Type</th>
              <th className="text-center py-2 px-2">Posted Date</th>
              <th className="text-center py-2 px-2">Applications</th>
              <th className="text-center py-2 px-2">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {top5Jobs.map((job) => (
              <tr key={job._id} className="font-poppins text-[#000] text-[1rem] ">
                <td className="py-2 px-2">{serialNumber++}</td>
                <td className="py-2 px-2">{job.jobtitle}</td>
                <td className="py-2 px-2">{job.jobtype}</td>
                <td className="py-2 px-2">{getFormattedDate(job.createdAt)}</td> 
                <td className="py-2 px-2">{job.applicationsCount} Applications</td>
                <td className="py-2 px-2">
                  {getFormattedDate(job.applicationdeadline)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="text-[red] font-poppins">{error && error.message}</p>

      {!loading && top5Jobs.length === 0 && (
        <p className="text-[green] font-poppins my-4 text-[1.5rem]">
          No Jobs Found!
        </p>
      )}
    </div>
  );
};

export default JobLists;
