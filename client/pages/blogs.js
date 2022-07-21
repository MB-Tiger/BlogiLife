import MainLayout from "../components/layout/MainLayout";
import BlogCard from "../components/BlogCard";
import useTitle from "../hooks/useTitle";

export async function getStaticProps() {
  const response = await fetch("http://localhost:4000/blog");
  const data = await response.json();

  return {
    props: {
      blogs: data,
    },
    revalidate: 60,
  };
}

const Blogs = ({ blogs }) => {
  useTitle("Blogs");
  console.log(blogs);

  return (
    <MainLayout>
      <section className="w-full min-h-screen bg-gray-50 py-10">
        <div className="container">
          <div className="grid xl:grid-cols-2 grid-cols-3">
            {blogs.length ? (
              blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
            ) : (
              <h3 className="text-center font-medium text-lg">
                No article to show
              </h3>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Blogs;
