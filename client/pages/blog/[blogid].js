import MainLayout from "../../components/layout/MainLayout";
import { useEffect, useState } from "react";
import Link from "next/link";
import useTitle from "../../hooks/useTitle";
import { IoIosArrowDropupCircle } from "react-icons/io";
import Rating from "react-rating";
import CommentModal from "../../components/CommentModal";
import RatingCard from "../../components/RatingCard";
import CommentsCard from "../../components/CommentsCard";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function getStaticPaths() {
  const response = await fetch("http://localhost:4000/blog");
  const data = await response.json();

  return {
    fallback: "blocking",
    paths: data.map((blog) => ({ params: { blogid: blog._id } })),
  };
}

export async function getStaticProps(context) {
  const uniqueId = context.params.blogid;

  const blogResponse = await fetch(
    `http://localhost:4000/blog/single-blog/${uniqueId}`
  );
  const blogData = await blogResponse.json();

  const commentResponse = await fetch(
    `http://localhost:4000/comment/by-blog/${uniqueId}`
  );
  const commentData = await commentResponse.json();

  return {
    props: {
      blog: blogData,
      comments: commentData,
    },
  };
}

const BlogId = ({ blog, comments }) => {
  useTitle("Blog");
  const [hasError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rate, setRate] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [scroll, setScroll] = useState(0);
  const cookies = new Cookies();
  const router = useRouter();

  const userCookie = cookies.get("ut");
  const date = new Date(blog.createdAt);

  console.log(blog);

  useEffect(() => {
    if (blog.msg == "Unexpected token u in JSON at position 0")
      return setError(true);

    if (blog) setIsLoading(false);

    window.addEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (rate > 0) {
      fetch("http://localhost:4000/blog/submit-rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${cookies.get("ut")}`,
        },
        body: JSON.stringify({
          blogId: `${blog._id}`,
          score: rate,
        }),
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }
  }, [rate]);

  const sumbitComment = () => {
    if (commentInput.trim() == "")
      return toast.error("You have to write something!", {
        theme: "colored",
      });

    fetch("http://localhost:4000/comment/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        text: `${commentInput}`,
        blogId: `${blog._id}`,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.msg == "ok")
          return toast.success("Comment were successfully registered", {
            theme: "colored",
          });

        if (json.msg == "bad request: bad inputs")
          return toast.error("Not valid, please check your filled", {
            theme: "colored",
          });
      });
  };

  const modalHandlear = () => {
    setIsModal(!isModal);
    if (userCookie == undefined) router.push("/login");
  };

  const onScroll = () => {
    const Scrolled = document.documentElement.scrollTop;
    const MaxHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const ScrollPercent = (Scrolled / MaxHeight) * 100;
    setScroll(ScrollPercent);
  };

  const ratingHandler = (rating) => {
    setRate(rating);
    return toast.success("Points were successfully registered", {
      theme: "colored",
    });
  };

  if (hasError) {
    return (
      <div className="w-full min-h-screen">
        <div className="text-lg font-medium text-center p-2">
          Error 404: article not found
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="min-h-screen">
        <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800 mx-auto"></div>
      </div>
    );

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-slate-100">
        <CommentModal
          isModal={isModal}
          setIsModal={setIsModal}
          Rating={Rating}
          commentInput={commentInput}
          setCommentInput={setCommentInput}
          sumbitComment={sumbitComment}
          ratingHandler={ratingHandler}
        />
        <div
          className={`h-1 fixed bg-blue-500 z-50`}
          style={{ width: `${scroll}%` }}
        ></div>
        <div
          className="fixed right-4 bottom-4 text-blue-500 md:text-6xl text-5xl cursor-pointer"
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
        >
          <IoIosArrowDropupCircle />
        </div>
        <div className="container py-10">
          <div className="w-full shadow border bg-white rounded min-h-[500px]">
            <div className="w-full bg-[#2E3A3F] min-h-[60px] px-4 py-2 rounded-t">
              <div className="flex items-center justify-between text-white">
                <Link href={`/profile/${blog.creator._id}`}>
                  <div className="flex items-center sm:space-x-3 space-x-2">
                    <img
                      className="md:w-[50px] md:h-[50px] w-10 h-10 rounded-full"
                      src={
                        blog.creator.avatar
                          ? `http://localhost:4000/${blog.creator.avatar}`
                          : "/images/man.png"
                      }
                      alt="User Profile"
                    />
                    <p className="text-white sm:text-base text-sm">
                      {blog.creator.name}
                    </p>
                  </div>
                </Link>
                <div className="text-sm font-light lg:font-medium">
                  {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
                </div>
              </div>
            </div>
            <div className="p-4">
              <img
                className="w-full rounded"
                src={blog.imgurl.length ? blog.imgurl : "/images/blogging.jpg"}
                alt="Article photo"
              />
              <h3 className="mt-5 text-center sm:text-2xl text-xl font-bold">
                {blog.title}
              </h3>
              <div
                className="mt-5"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-4 shadow border bg-white rounded mt-4 p-4">
            <div className="lg:sticky top-[80px] lg:col-span-1 col-span-4 space-y-2 mb-5 lg:mb-0">
              <RatingCard blog={blog} modalHandlear={modalHandlear} />
            </div>
            <div className="w-full lg:col-span-3 lg:pl-10 col-span-4 mt-5 lg:mt-0">
              <CommentsCard comments={comments} blog={blog} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogId;
