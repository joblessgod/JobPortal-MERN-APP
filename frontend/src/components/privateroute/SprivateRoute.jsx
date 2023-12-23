import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

const SprivateRoute = () => {
const {currentUser} = useSelector((state)=>state.user)
return currentUser && currentUser.usertype==='seeker' ? <Outlet /> : <Navigate to = '/'/>
}

export default SprivateRoute;