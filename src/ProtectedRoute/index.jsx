import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserAuth } from "../app/Auth";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  // const currentUserData = useSelector((state) => state.userById);
  // const userData = currentUserData.user;

  console.log("user from protected", user);

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
