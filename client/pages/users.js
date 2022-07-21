import MainLayout from "../components/layout/MainLayout";
import { useState } from "react";
import Link from "next/link";
import useTitle from "../hooks/useTitle";

export async function getStaticProps() {
  const response = await fetch("http://localhost:4000/user/");
  const data = await response.json();

  return {
    props: {
      usersList: data,
    },
    revalidate: 60,
  };
}

const Users = ({ usersList }) => {
  useTitle("Users");
  const [searchUser, setSearchUser] = useState("");
  console.log(usersList);

  return (
    <MainLayout>
      <section className="w-full min-h-screen bg-gray-50 py-8">
        <div className="container text-center">
          <label className="flex whitespace-nowrap items-center md:space-x-2 mb-5">
            <span className="sm:text-lg font-medium md:inline-block hidden">
              Find your writer
            </span>
            <input
              className="w-full h-10 rounded bg-gray-100 border p-2"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              placeholder="Srearch ..."
              type="search"
            />
          </label>
          <div className="w-full min-h-[75vh] rounded border bg-white text-center shadow-sm">
            <div className="grid grid-cols-3 w-full rounded-t p-2 bg-gray-200 font-medium items-center">
              <div className="col-span-1">Number</div>
              <div className="col-span-1">Image</div>
              <div className="col-span-1">Name</div>
            </div>
            {usersList
              .filter((user) =>
                user.name.toLowerCase().includes(searchUser.toLowerCase())
              )
              .map((user, i) => {
                return (
                  <Link href={`/profile/${user._id}`} key={user._id}>
                    <div className="grid grid-cols-3 items-center bg-[#2E3A3F] rounded m-2 p-2 text-white hover:scale-105 cursor-pointer transition-all overflow-x-auto">
                      <div className="col-span-1">{i + 1}</div>
                      <div className="col-span-1">
                        <img
                          className="w-[35px] h-[35px] rounded-full mx-auto"
                          src={
                            user.avatar
                              ? `http://localhost:4000/${user.avatar}`
                              : "/images/man.png"
                          }
                          alt="User image"
                        />
                      </div>
                      <div className="col-span-1"> {user.name} </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Users;
