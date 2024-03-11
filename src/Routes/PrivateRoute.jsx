import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()


    if (loading) { return <p className="text-center text-7xl text-red-600  pt-48">Loading...</p> }
    if (!user?.email) {
        return <Navigate state={{ from: location.pathname }} replace to='/login'></Navigate>
    }
    return children;
};

export default PrivateRoute;