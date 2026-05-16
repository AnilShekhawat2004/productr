import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";

const PrivateRoute = ({ children }) => {
  const { token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      dispatch(logout());
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.log("Invalid Token", error);
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;