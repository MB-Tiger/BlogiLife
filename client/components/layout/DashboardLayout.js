import { useState, useEffect } from "react";
import useTitle from "../../hooks/useTitle";
import Link from "next/link";
import { BiEditAlt, BiHome } from "react-icons/bi";
import { MdExitToApp } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

const DashboardLayout = ({ children }) => {
  useTitle("Dashboard");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const cookies = new Cookies();

  const handleUserError = () => {
    console.log("im being run");
    cookies.remove("ut");
    router.push("/login");
  };

  useEffect(() => {
    if (cookies.get("ut") === undefined) return router.push("/login");
    fetch("http://localhost:4000/user/me", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({}),
    })
      .then((data) => data.json())
      .then((response) => {
        // console.log(response);
        if (response.msg === "not logged in") return handleUserError();

        if (response && response._id) setLoading(false);

        setUser(response);
      })
      .catch((err) => {
        return handleUserError();
      });
  }, []);
  // console.log(user);

  const logout = () => {
    cookies.remove("ut");
    router.push("/");
  };

  return (
    <div className="w-full grid grid-cols-4 p-5">
      <div className="lg:col-span-1 col-span-4 lg:mr-5 mb-5 lg:mb-0 max-h-[600px] lg:sticky top-5 border shadow-sm rounded-lg px-3 py-5 z-50">
        {loading ? (
          <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800"></div>
        ) : (
          <div className="flex justify-between items-center">
            <Link href={`/userinfo/${user._id}`}>
              <div className="flex flex-wrap items-center space-x-4 cursor-pointer">
                <img
                  className="w-[60px] h-[60px] rounded-full"
                  src={
                    user.avatar
                      ? `http://localhost:4000/${user.avatar}`
                      : "/images/man.png"
                  }
                  alt="User Profile"
                />
                <div>
                  <p className="text-lg">{user.username}</p>
                  <p className="text-xs">{user.name}</p>
                </div>
              </div>
            </Link>
            <Link href={"/dashboard/useredit"}>
              <BiEditAlt className="text-xl text-blue-900 cursor-pointer" />
            </Link>
          </div>
        )}
        <hr className="my-5" />
        <ul className="space-y-4">
          <li>
            <Link href={"/"}>
              <div className="flex items-center space-x-2 cursor-pointer text-lg">
                <BiHome className="text-2xl" />
                <p>Home page</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/submitblog"}>
              <div className="flex items-center space-x-2 cursor-pointer text-lg">
                <img
                  className="w-[25px]"
                  src={"/images/laptop.png"}
                  alt="blogging"
                />
                <p>Create blog</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/blog"}>
              <div className="flex items-center space-x-2 cursor-pointer text-lg">
                <GrArticle className="text-2xl" />
                <p>Blogs</p>
              </div>
            </Link>
          </li>
          <li onClick={() => logout()}>
            <div className="flex items-center space-x-2 cursor-pointer text-lg">
              <MdExitToApp className="text-2xl" />
              <p>Log out</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="lg:col-span-3 col-span-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
