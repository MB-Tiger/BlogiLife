import MainLayout from "../components/layout/MainLayout";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import validate from "../components/validate";
import useTitle from "../hooks/useTitle";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
  useTitle("Login");
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);
  const router = useRouter();
  const cookies = new Cookies();
  const checkBoxRef = useRef();

  useEffect(() => {
    if (cookies.get("ut")) router.push("/dashboard/blog");
    checkBoxRef.current.checked = true;
  }, []);
  useEffect(() => {
    setErrors(validate(userData));
    // console.log(errors);
  }, [userData, touched]);

  const login = async () => {
    if (Object.keys(errors).length) {
      setTouched({
        userName: true,
        password: true,
      });
    }
    if (errors.userName && errors.password)
      return toast.error("Not valid, please check your form", {
        theme: "colored",
      });

    fetch("http://localhost:4000/user/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData.userName,
        password: userData.password,
      }),
    })
      .then((data) => data.json())
      .then((json) => {
        console.log(json);
        // console.log(cookies);
        if (json.msg == "bad request: no such user exists")
          return toast.error("No such user exists", { theme: "colored" });

        if (json.msg == "password doesnt match")
          return toast.error("password doesnt match", { theme: "colored" });

        if (!json.token) return toast.error("Not valid", { theme: "colored" });

        if (json.msg == "bad input")
          return toast.error("Not valid", { theme: "colored" });

        cookies.set("ut", json.token);
        console.log(json);
        return router.push("/dashboard/blog");
      });
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-slate-100 px-4 py-10 bg-custom">
        <div className="max-w-sm min-h-[400px] bg-white rounded shadow mx-auto p-8 space-y-5">
          <h2 className="text-xl font-semibold text-blue-900">Login</h2>
          <label className="block">
            <div className="mb-1">User name</div>
            <input
              className="w-full h-8 bg-gray-100 rounded-sm p-2"
              onChange={(e) =>
                setUserData({ ...userData, userName: e.target.value })
              }
              onFocus={() => setTouched({ ...touched, userName: true })}
              onKeyUp={(e) => (e.key === "Enter" ? login() : null)}
              type="text"
            />
            {errors.userName && touched.userName == true ? (
              <span className="text-red-900 text-xs">{errors.userName}</span>
            ) : null}
          </label>
          <label className="block relative">
            <div className="mb-1">Password</div>
            <input
              className="w-full h-8 bg-gray-100 rounded-sm p-2 pr-8"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              onFocus={() => setTouched({ ...touched, password: true })}
              onKeyUp={(e) => (e.key === "Enter" ? login() : null)}
              type={passwordShown ? "text" : "password"}
            />
            <span className="absolute right-2 bottom-[6px] cursor-pointer">
              {passwordShown ? (
                <IoEyeOffOutline
                  className="text-xl text-black"
                  onClick={() => setPasswordShown(false)}
                />
              ) : (
                <IoEyeOutline
                  className="text-xl text-black"
                  onClick={() => setPasswordShown(true)}
                />
              )}
            </span>
            {errors.password && touched.password == true ? (
              <span className="text-red-900 text-xs">{errors.password}</span>
            ) : null}
          </label>
          <label className="block mb-10 space-x-1">
            <input
              className="align-middle cursor-pointer"
              type="checkbox"
              ref={checkBoxRef}
            />
            <span className="mb-1">Remember me</span>
          </label>

          <button
            type="submit"
            className="w-full bg-red-500 transition-all hover:bg-red-600 mx-auto rounded text-white py-1"
            onClick={() => login()}
            onKeyUp={(e) => (e.key === "Enter" ? login() : null)}
          >
            Login
          </button>

          <div className="flex justify-between items-baseline mt-3">
            <span className="text-sm">Do not have an Account?</span>
            <Link href={"signup"}>
              <button className="py-1 px-2 rounded transition-all hover:bg-[#0082FD] hover:text-white duration-200 sm:text-base text-sm sm:font-normal font-medium">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
