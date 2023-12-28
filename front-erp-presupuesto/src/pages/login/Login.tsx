import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserEmptyState, createUser } from "../../redux/state/User";
import { useDispatch } from "react-redux";
import axios from "../../config/axios"
import { decodeToken } from "../../utils/decodeToken.utils";
import { tokenKey } from "../../utils/decodeToken.utils";
import Cookies from "js-cookie";
export const Login = () => {
  const [user, setUser] = useState({username: "",password:""});
  const [logged,setLogged] = useState(1);
  const navigate = useNavigate(); // Obtiene la función de navegación
  const dispatch = useDispatch();
  const handleClick = async (e: any) => {
    e.preventDefault();
    if (user.username) {
      try {
        const res = await axios.post("/auth/login", user);
        Cookies.set(tokenKey,res.data.token)
        const saveUser = decodeToken(tokenKey)
        dispatch(createUser(saveUser));
        navigate("/system");  
      } catch (error) {
        console.log(error);
        setLogged(0);
      }
    }
  };
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex justify-center min-h-screen items-center bg-gradient-to-r from-blue-500 to-green-500 ">
      <div className="flex justify-center px-10 py-40 bg-slate-800  rounded-md items-center">
        <form className="flex gap-5 flex-col">
          <div className="flex p-3 justify-star items-center bg-white rounded-md">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                fill="blue"
              />
              <path
                d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                fill="blue"
              />
            </svg>
            <input
              onChange={handleChange}
              placeholder="Username"
              name="username"
              className="text-left rounded-md px-5 py-2 focus:outline-none"
            ></input>
          </div>
          <div className="flex p-3 justify-star items-center bg-white rounded-md">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 8C4.34315 8 3 9.34315 3 11V13C3 14.6569 4.34315 16 6 16C7.65685 16 9 14.6569 9 13H15V15H17V13H18V15H20V11H9C9 9.34315 7.65685 8 6 8ZM7 13V11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14C6.55228 14 7 13.5523 7 13Z"
                fill="blue"
              />
            </svg>
            <input
              onChange={handleChange}
              placeholder="Password"
              name="password"
              type="password"
              className="text-left rounded-md px-5 py-2 focus:outline-none"
            ></input>
          </div>
          {!logged && <div>Accedo Denegado</div>}
          <button
            onClick={handleClick}
            className="bg-blue-200 rounded-md p-5 hover:bg-slate-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
