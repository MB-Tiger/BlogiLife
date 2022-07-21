import { useRef } from "react";
import Cookies from "universal-cookie";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTitle from "../../../hooks/useTitle";

export async function getStaticPaths() {
  const response = await fetch("http://localhost:4000/blog");
  const data = await response.json();

  return {
    fallback: "blocking",
    paths: data.map((blog) => ({
      params: { blogid: blog._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const uniqueId = context.params.blogid;

  const response = await fetch(
    `http://localhost:4000/blog/single-blog/${uniqueId}`
  );

  const data = await response.json();

  return {
    props: {
      blog: data,
      titleValue: data.title,
      blogImg: data.imgurl,
      uniqueId: uniqueId,
    },
  };
}

const Blogid = ({ blog, titleValue, blogImg, uniqueId }) => {
  useTitle("Edit blog");
  const cookies = new Cookies();
  const editorRef = useRef(null);
  const router = useRouter();

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const editBlog = async () => {
    console.log("salam salam");
    fetch("http://localhost:4000/blog/edit", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        blogId: uniqueId,
        data: {
          title: titleValue,
          content: editorRef.current.getContent(),
          imgurl: blogImg,
        },
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.msg == "bad request: bad inputs")
          return toast.error("You don't fill all of inputs", {
            theme: "colored",
          });

        toast.success("Changes were successfully recorded", {
          theme: "colored",
        });

        router.push("/dashboard/blog");
      });
  };

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen">
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={`${blog.content}`}
          init={{
            height: 600,
            selector: "textarea#local-upload",
            plugins: "image code",
            toolbar:
              "undo redo | image code |" +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat",

            /* without images_upload_url set, Upload tab won't show up*/
            images_upload_url: "postAcceptor.php",
            /* we override default upload handler to simulate successful upload*/
            images_upload_handler: function (blobInfo, success, failure) {
              setTimeout(function () {
                /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                success(
                  "http://moxiecode.cachefly.net/tinymce/v9/images/logo.png"
                );
              }, 2000);
            },
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <div className="w-full flex flex-wrap justify-between items-center mt-5 md:px-10 px-5">
          <div className="mx-auto">
            <label className="inline-block mb-5 md:w-[40%] w-full mx-4">
              <span className="mr-2">Title</span>
              <input
                className="h-8 bg-gray-100 rounded-sm mt-1 p-2 w-full"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                type="text"
              />
            </label>
            <label className="inline-block mb-5 md:w-[40%] w-full mx-4">
              <span className="mr-2">Image url</span>
              <input
                className="h-8 bg-gray-100 rounded-sm mt-1 p-2 w-full"
                value={blogImg}
                onChange={(e) => setBlogImg(e.target.value)}
                type="text"
              />
            </label>
          </div>
          <div className="flex flex-wrap items-center space-x-5 mx-auto">
            <button
              className="bg-blue-500 hover:bg-blue-700 transition-all text-white px-3 py-2 rounded mb-5 hidden md:inline-block"
              onClick={() => log()}
            >
              Log editor content
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 transition-all text-white px-3 py-2 rounded mb-5"
              onClick={() => editBlog()}
            >
              Sumbit edit
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Blogid;
