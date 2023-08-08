import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";

const PrivateRoute = ({ children }) => {
  const { state } = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    if (!state.isAuth) {
      toast({
        title: "Unauthorized",
        description: "Please Login First.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, []); // Add state.isAuth and toast as dependencies

  if (!state.isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
