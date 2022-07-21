import { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import validate from "../components/validate";
import Link from "next/link";
import useTitle from "../hooks/useTitle";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Signup = () => {
  useTitle("Sign up");
  const [userData, setUserData] = useState({
    userName: "",
    name: "",
    password: "",
    imgUrl: "",
    isAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);
  const cookies = new Cookies();
  const router = useRouter();
  // console.log(userData)

  useEffect(() => {
    if (cookies.get("ut")) return router.push("/dashboard/blog");
  });
  useEffect(() => {
    setErrors(validate(userData));
    // console.log(errors);
  }, [userData, touched]);

  const submitUser = async () => {
    if (Object.keys(errors).length) {
      setTouched({
        name: true,
        userName: true,
        password: true,
        isAccepted: true,
      });
      return toast.error("Not valid, please check your form", {
        theme: "colored",
      });
    }

    fetch("http://localhost:4000/user/signup", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData.userName,
        name: userData.name,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json.token);

        if (json.msg == "bad input")
          return toast.error("Not valid, please check your form", {
            theme: "colored",
          });

        if (json.msg == "this username already exists in the database")
          return toast.error("Username alredy exist", { theme: "colored" });

        if (json.token) {
          cookies.set("ut", json.token);
          // console.log(cookies)
          router.push("/dashboard/dashboardblog");
        }
        console.log(json);
      });
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-slate-100 px-4 py-10 bg-custom">
        <div className="max-w-sm min-h-[400px] bg-white rounded shadow mx-auto p-8 space-y-5">
          <h2 className="text-xl font-semibold text-blue-900">Sign Up</h2>
          <label className="block">
            <div className="mb-1">User name</div>
            <input
              className="w-full h-8 bg-gray-100 rounded-sm p-2"
              onChange={(e) =>
                setUserData({ ...userData, userName: e.target.value })
              }
              onFocus={() => setTouched({ ...touched, userName: true })}
              onKeyUp={(e) => (e.key === "Enter" ? submitUser() : null)}
              type="text"
            />
            {errors.userName && touched.userName == true ? (
              <span className="text-red-900 text-xs">{errors.userName}</span>
            ) : null}
          </label>
          <label className="block">
            <div className="mb-1">Name</div>
            <input
              className="w-full h-8 bg-gray-100 rounded-sm p-2"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              onFocus={() => setTouched({ ...touched, name: true })}
              onKeyUp={(e) => (e.key === "Enter" ? submitUser() : null)}
              type="text"
            />
            {errors.name && touched.name == true ? (
              <span className="text-red-900 text-xs">{errors.name}</span>
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
              onKeyUp={(e) => (e.key === "Enter" ? submitUser() : null)}
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
              onChange={(e) =>
                setUserData({ ...userData, isAccepted: e.target.checked })
              }
              onFocus={() => setTouched({ ...touched, isAccepted: true })}
              onKeyUp={(e) => (e.key === "Enter" ? submitUser() : null)}
              type="checkbox"
            />
            <span className="mb-1">I accept the terms of privacy policy</span>
            {errors.isAccepted && touched.isAccepted == true ? (
              <div className="text-red-900 text-xs">{errors.isAccepted}</div>
            ) : null}
          </label>
          <button
            type="submit"
            className="w-full bg-red-500 transition-all hover:bg-red-600 mx-auto rounded text-white py-1"
            onClick={() => submitUser()}
            onKeyUp={(e) => (e.key === "Enter" ? submitUser() : null)}
          >
            Sign Up
          </button>
          <div className="flex justify-between items-baseline mt-3">
            <span className="text-sm">Already have an Account?</span>
            <Link href={"/login"}>
              <button className="py-1 px-2 rounded transition-all hover:bg-[#0082FD] hover:text-white duration-200 sm:text-base text-sm sm:font-normal font-medium">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;
