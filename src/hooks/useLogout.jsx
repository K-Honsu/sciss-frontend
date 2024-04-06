import { useTempAuthStore } from "../store/store";
import { useNavigate } from "react-router-dom";


export const useLogout = () => {
  const navigate = useNavigate()
  const resetTempAuth = useTempAuthStore((state) => state.resetTempAuth);
  const logout = async () => {
    console.log(resetTempAuth())
    console.log("hello");
    resetTempAuth();
    navigate("/login")
  };
  return { logout };
};
