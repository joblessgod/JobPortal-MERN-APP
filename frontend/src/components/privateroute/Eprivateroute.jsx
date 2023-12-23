import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

const Eprivateroute = () => {
const {currentUser} = useSelector((state)=>state.user)
return currentUser && currentUser.usertype === "employer" ? <Outlet /> : <Navigate to = '/'/>
}

export default Eprivateroute;