import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./global/Footer";
import { Route, Routes } from "react-router-dom";
import JobPost from "./components/jobpost/JobPost";
import JobLists from "./components/joblists/JobLists";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import JobSeekers from "./components/accounts/JobSeekers";
import Employer from "./components/accounts/Employer";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import ListedJobs from "./components/listedjobs/ListedJobs";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import JobDetails from "./components/jobdetails/JobDetails";
import JobCardList from "./components/search/Search";
import JobApplication from "./components/jobapplication/JobApplication";
import AppliedJobs from "./appliedjobs/AppliedJobs";
import Dashboard from "./components/dashboard/Dashboard";
import Jobs from "./components/joblists/Jobs";
import UpdateJobs from "./components/joblists/UpdateJobs";
import Applications from "./components/applications/Applications";
import ShowCategory from "./components/category/ShowCategory";
import Jobfrocategory from "./components/joblists/Jobfrocategory";
import Eprivateroute from "./components/privateroute/Eprivateroute";
import SprivateRoute from "./components/privateroute/SprivateRoute";

function App(props) {
  const [showLogin, setShowLogin] = useState(false);
  const showLoginHandler = () => {
    setShowLogin(true);
  };
  const hideLoginHandler = () => {
    setShowLogin(false);
  };
  const [showRegister, setShowRegister] = useState(false);
  const showRegisterHandler = () => {
    setShowRegister(true);
  };
  const hideRegisterHandler = () => {
    setShowRegister(false);
  };

  {
    /*for Register Button */
  }

  return (
    <div>
      <NavBar
        onShowLogin={showLoginHandler}
        onShowRegister={showRegisterHandler}
      />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="seekerregister" element={<JobSeekers />} />
        <Route path="employer" element={<Employer />} />
        <Route path="listedjob" element={<ListedJobs />} />
        <Route path="jobdetails/:id" element={<JobDetails />} />
        <Route path="/search" element={<JobCardList />} />
        <Route path="showjobfromcategory/:id" element={<Jobfrocategory />} />
        <Route element={<PrivateRoute />}>
        <Route path="profile" element={<Profile />} />
        </Route>
        <Route element={<SprivateRoute />}>
        {/* routes only for jobseeker */}
          
          {/*  <Route path="joblists" element={<JobLists />} /> */}
          <Route path="jobapply/:id" element={<JobApplication />} />
          <Route path="appliedjobs" element={<AppliedJobs />} />
          </Route>
          <Route element={<Eprivateroute />}>
          {/* routes only for employer */}
         
          <Route path="jobs/jobapplications/:id" element={<Applications />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="updatejob/:id" element={<UpdateJobs />} />
          <Route path="jobpost" element={<JobPost />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="viewcategory" element={<ShowCategory />} />
          </Route>
        
      </Routes>

      {showLogin && <Login onClose={hideLoginHandler} />}
      {showRegister && <Register onClose={hideRegisterHandler} />}

      {/*
    <JobPost />
   <JobLists data={tableData} />
   <Employer />
    <JobSeekers />
     */}

      <Footer />
    </div>
  );
}

export default App;
