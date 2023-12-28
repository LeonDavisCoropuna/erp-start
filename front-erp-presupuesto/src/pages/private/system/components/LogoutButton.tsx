import { tokenKey } from "@/utils/decodeToken.utils";
import Cookies from "js-cookie";
import { FaBackward } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    const token = Cookies.get(tokenKey);
    if (token) {
      Cookies.remove(tokenKey);
    }
    navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex items-center gap-x-3">
      <div onClick={goBack} className="text-white">
        <FaBackward size={30}/>
      </div>
      <button
        onClick={logout}
        className="w-full bg-slate-100 border-white  text-blackrounded-md flex items-center h-full"
      >
        <RiLogoutBoxRLine size={30} />
      </button>
    </div>
  );
};
