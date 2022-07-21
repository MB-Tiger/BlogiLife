import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useTitle from "../../hooks/useTitle";

export async function getServerSideProps({ req, res }) {
  const cookies = new Cookies(req.headers.cookie);
  const response = await fetch("http://localhost:4000/user/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${cookies.get("ut")}`,
    },
    body: JSON.stringify({}),
  });

  const data = await response.json();

  return {
    props: {
      userEdit: data,
    },
  };
}

const UserEdit = ({ userEdit }) => {
  useTitle("User edit");
  const [file, setFile] = useState(null);
  const cookies = new Cookies();

  console.log(userEdit);

  useEffect(() => {
    submitAvatar();
  }, [file]);

  const editUser = async () => {
    console.log("salam salam");
    fetch("http://localhost:4000/user/edit", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        name: userEdit.name,
        bio: userEdit.bio,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.msg === "bad input")
          return toast.error("please fill inputs whith correct value", {
            theme: "colored",
          });

        if (json.msg === "ok")
          return toast.success("Changes were successfully recorded", {
            theme: "colored",
          });
      });
  };
  // console.log(editUserMsg)

  const submitAvatar = async () => {
    try {
      if (!file) return;

      console.log(file);

      const formData = new FormData();
      formData.append("avatar", file);

      fetch("http://localhost:4000/user/update-avatar", {
        method: "POST",
        headers: {
          auth: `ut ${cookies.get("ut")}`,
        },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => console.log(data));
    } catch (error) {
      console.log(error);
      return toast.error("Sorry, something went wrong", { theme: "colored" });
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full min-h-[600px] border rounded-lg shadow-sm p-5">
        <h2 className="text-xl font-bold text-blue-800 mt-3 text-center">
          Edit User
        </h2>
        <div className="flex flex-wrap justify-evenly mt-10">
          <label className="lg:w-[60%] w-full items-center mb-5 mx-[10px]">
            <img
              className="md:w-[200px] md:h-[200px] w-36 h-36 mx-auto rounded-full mb-4"
              src={
                userEdit.avatar
                  ? `http://localhost:4000/${userEdit.avatar}`
                  : "/images/man.png"
              }
              alt="User Profile"
            />
            <input
              onChange={(e) => setFile(e.target.files[0])}
              id="file"
              type="file"
            />
            <div className="text-center">
              <label htmlFor="file" className="cursor-pointer text-blue-600">
                Change profile photo
              </label>
              {/* <button onClick={() => submitAvatar()}>sumbit</button> */}
            </div>
          </label>
          <label className="lg:w-[60%] w-full items-center mb-5 mx-[10px]">
            <span className="mr-2 mb-2 inline-block">Name</span>
            <input
              value={userEdit.name}
              onChange={(e) =>
                setUserEdit({ ...userEdit, name: e.target.value })
              }
              className="bg-gray-100 rounded w-full h-8 p-2"
              type="text"
            />
          </label>
          <label className="lg:w-[60%] w-full items-center mb-5 mx-[10px]">
            <span className="mr-2 mb-2 inline-block">Bio</span>
            <textarea
              value={userEdit.bio}
              onChange={(e) =>
                setUserEdit({ ...userEdit, bio: e.target.value })
              }
              className="bg-gray-100 rounded w-full p-2 resize-none"
              maxLength={200}
              name=""
              id=""
              cols="30"
              rows="4"
            ></textarea>
          </label>
        </div>
        <div className="text-center">
          <button
            onClick={() => editUser()}
            className="px-3 py-2 text-white bg-blue-500 rounded mt-5 mx-5 hover:bg-blue-700 transition-all"
          >
            Sumbit changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserEdit;
