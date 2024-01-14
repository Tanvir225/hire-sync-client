import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};


export default useAuth;
