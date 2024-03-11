import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
    const { admin, volunteer, isRoleLoading } = useRole()
    const location = useLocation()

    if (isRoleLoading) { return <p className="text-center text-7xl text-red-600  pt-48">Admin Loading...</p> }
    if (admin || volunteer) {
        return children;
    }
    return <Navigate state={{ from: location.pathname }} replace to='/login'></Navigate>
};

export default AdminRoute;