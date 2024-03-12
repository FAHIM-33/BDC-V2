import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PulseLoading from "../Components/PulseLoading";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()


    if (loading) { return <PulseLoading></PulseLoading> }
    if (!user?.email) {
        return <Navigate state={{ from: location.pathname }} replace to='/login'></Navigate>
    }
    return children;
};

export default PrivateRoute;