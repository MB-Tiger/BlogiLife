import DashboardLayout from "../../components/layout/DashboardLayout";
import Link from "next/link";
import Cookies from "universal-cookie";
import { BiEditAlt } from "react-icons/bi";

export async function getServerSideProps({ req, res }) {
  const cookies = new Cookies(req.headers.cookie);
  const response = await fetch("http://localhost:4000/blog/my-blogs", {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${cookies.get("ut")}`,
    },
  });

  const data = await response.json();

  return {
    props: {
      userBlogs: data,
    },
  };
}

const Blog = ({ userBlogs }) => {
  return (
    <DashboardLayout>
      <div className="w-full min-h-[600px] border rounded-lg shadow-sm p-5">
        <div className="flex items-center space-x-2 mb-5">
          <div className="w-4 h-1 rounded-full bg-yellow-600"></div>
          <div className="font-semibold text-lg">Your blogs</div>
        </div>
        {/* <div className="flex items-center justify-between mb-2">
          <Link href={"/dashboard/submitblog"}>
            <button className="text-white bg-blue-500 rounded px-2 py-1 hover:bg-blue-700 transition-all ml-1">
              Create blog
            </button>
          </Link>
        </div> */}
        <div className="w-full h-[68vh] overflow-y-auto rounded border text-center">
          <div className="w-full rounded-t p-2 bg-gray-200 font-medium sticky top-0 grid md:grid-cols-6 grid-cols-3 items-center">
            <div className="col-span-1">Number</div>
            <div className="col-span-1">Title</div>
          </div>
          <div>
            {userBlogs.map((userBlog, i) => {
              return (
                <Link href={`/blog/${userBlog._id}`} key={userBlog._id}>
                  <div className="rounded p-2 grid md:grid-cols-6 grid-cols-3 bg-[#2E3A3F] m-2 text-white md:text-base text-sm hover:shadow-lg cursor-pointer transition-all items-center">
                    <div className="col-span-1">{i + 1}</div>
                    <div className="col-span-1">
                      {userBlog.title ? userBlog.title : "Empty"}
                    </div>
                    <div className="md:col-span-1 md:inline-block hidden"></div>
                    <div className="md:col-span-1 md:inline-block hidden"></div>
                    <div className="md:col-span-1 md:inline-block hidden"></div>
                    <Link href={`/dashboard/editblog/${userBlog._id}`}>
                      <div className="flex items-center md:space-x-1 col-span-1 mx-auto">
                        <button className="text-lg">
                          <BiEditAlt />
                        </button>
                        <div className="md:inline-block hidden text-center">
                          Edit
                        </div>
                      </div>
                    </Link>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Blog;
