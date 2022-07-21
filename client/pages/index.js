import MainLayout from "../components/layout/MainLayout";
import Header from "../components/Header";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import useTitle from "../hooks/useTitle";

export async function getStaticProps() {
  const response = await fetch("http://localhost:4000/blog/top-blogs");
  const data = await response.json();

  return {
    props: {
      topBlogs: data,
    },
    revalidate: 60,
  };
}

const Home = ({ topBlogs }) => {
  useTitle("Home");
  console.log(topBlogs);

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gray-50">
        <Header />
        <div>
          <div className="container flex justify-between items-center pt-12">
            <div>
              <div className="sm:text-4xl text-2xl font-medium mb-4">
                Join the BlogMo Challenge
              </div>
              <div className="text-[#949494] text-sm sm:text-base sm:font-medium">
                Get dialy prompts. Write a post each day in january.
              </div>
              <div className="text-[#949494] text-sm sm:text-base sm:font-medium">
                Join our community. And start growing your own
              </div>
              <Link href={"/dashboard/blog"}>
                <button className="bg-[#949494] text-white rounded transition-all hover:bg-[#808080] px-8 py-2 mt-4 md:text-base text-sm">
                  Join Us
                </button>
              </Link>
            </div>
            <img
              className="md:w-[500px] w-[250px] sm:block hidden"
              src={"/images/man-looking-phone.png"}
              alt="join us"
            />
          </div>
        </div>
        <div className="container flex items-center justify-center space-x-2 pt-12 pb-6">
          <div className="w-full h-[2px] rounded-full bg-gray-400"></div>
          <div className="whitespace-nowrap md:font-medium">Top articles</div>
          <div className="w-full h-[2px] rounded-full bg-gray-400"></div>
        </div>
        <main className="container grid grid-cols-2 lg:space-x-4 space-y-6 lg:space-y-0 pb-8">
          {topBlogs.slice(0, 2).map((topBlog) => {
            return (
              <Link href={`/blog/${topBlog._id}`} key={topBlog._id}>
                <div className="w-full col-span-2 lg:col-span-1 bg-white shadow rounded-sm hover:shadow-lg transition-all cursor-pointer">
                  <img
                    className="w-full xl:h-[373px] lg:h-[252px] rounded-t-sm"
                    src={
                      topBlog.imgurl ? topBlog.imgurl : "/images/blogging.jpg"
                    }
                    alt="article photo"
                  />
                  <div className="flex flex-wrap items-center justify-between px-2 py-4">
                    <p className="lg:text-lg font-medium">{topBlog.title}</p>
                    <div className="flex flex-wrap items-center space-x-1">
                      <AiFillStar className="text-yellow-500" />
                      <span>{topBlog.averageScore}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </main>
      </div>
    </MainLayout>
  );
};

export default Home;
