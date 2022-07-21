import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "universal-cookie";
import { BiUserCircle } from "react-icons/bi";

const Navbar = () => {
  const [token, setToken] = useState({});
  const cookies = new Cookies();
  const userCookie = cookies.get("ut");
  useEffect(() => {
    setToken(userCookie);
  }, []);

  return (
    <nav className="sticky top-0 p-2 px-5 md:px-10 bg-white shadow z-[1000]">
      <div className="flex justify-between items-center space-x-5">
        <ul className="flex items-center sm:space-x-4 space-x-2">
          <li>
            <Link href={"/"}>
              <img
                className="md:w-12 sm:w-10 w-8 h-auto cursor-pointer"
                src={"/images/MR.Logo2.png"}
                alt="logo"
              />
            </Link>
          </li>
          <li className="hover:border-b-2 focus:border-b-2 border-red-500 p-2">
            <Link href={"/blogs"}>Blogs</Link>
          </li>
          <li className="hover:border-b-2 focus:border-b-2 border-red-500 p-2">
            <Link href={"/users"}>Users</Link>
          </li>
        </ul>
        {!token ? (
          <ul className="flex items-center space-x-5">
            <li className="hover:bg-blue-500 hover:text-white sm:hover:p-2 hover:py-1 hover:px-2 transition-all sm:text-base text-sm rounded">
              <Link href={"/login"}>Login</Link>
            </li>
          </ul>
        ) : (
          <li className="list-none">
            <Link href={"/dashboard/blog"}>
              <BiUserCircle className="sm:text-3xl text-2xl cursor-pointer" />
            </Link>
          </li>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
