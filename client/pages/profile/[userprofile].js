import MainLayout from "../../components/layout/MainLayout";
import Link from "next/link";
import useTitle from "../../hooks/useTitle";

export async function getStaticPaths() {
  const response = await fetch("http://localhost:4000/user/");
  const data = await response.json();

  return {
    fallback: "blocking",
    paths: data.map((user) => ({
      params: { userprofile: user._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const uniqueId = context.params.userprofile;

  const userResponse = await fetch(
    `http://localhost:4000/user/singleUser/${uniqueId}`
  );
  const userData = await userResponse.json();

  const userBlogsResponse = await fetch("http://localhost:4000/blog/by-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: `${uniqueId}`,
    }),
  });
  const userBlogsData = await userBlogsResponse.json();

  return {
    props: {
      user: userData,
      userBlogs: userBlogsData,
    },
    revalidate: 10,
  };
}

const UserProfile = (props) => {
  const { user, userBlogs } = props;
  useTitle("Profile");
  const date = new Date(user.createdAt);

  console.log(user);
  console.log(userBlogs);

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-slate-50 py-10">
        <div className="container">
          <section className="w-full shadow border bg-white rounded min-h-[500px] px-3 py-5">
            {Object.keys(user).length ? (
              <>
                <div className="flex flex-wrap justify-center items-center">
                  <img
                    className="w-[175px] h-[175px] rounded-full mb-6"
                    src={
                      user.avatar
                        ? `http://localhost:4000/${user.avatar}`
                        : "/images/man.png"
                    }
                    alt="User Profile"
                  />
                  <div className="ml-10">
                    <p className="text-3xl">{user.username}</p>
                    <div className="flex space-x-6 my-5">
                      <div>
                        <span className="font-semibold">
                          {date.getMonth() + 1}/{date.getDate()}/
                          {date.getFullYear()}
                        </span>{" "}
                        created
                      </div>
                      <div>
                        <span className="font-semibold">
                          {user.blogs?.length}
                        </span>{" "}
                        blogs
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="max-w-[500px]">
                        {user.bio ? (
                          <div className="w-full">{user.bio}</div>
                        ) : (
                          <div className="w-full">
                            This is the initial value for the bio of user. You
                            can easily chang your bio, just need to go your
                            dashboard an edit your profile.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 py-4 my-4">
                  <div className="w-[300px] h-[2px] rounded-full bg-gray-300"></div>
                  <div className="whitespace-nowrap">User blogs</div>
                  <div className="w-[300px] h-[2px] rounded-full bg-gray-300"></div>
                </div>
                <div className="flex flex-wrap justify-evenly">
                  {userBlogs.map((userBlog) => {
                    return (
                      <Link href={`/blog/${userBlog._id}`} key={userBlog._id}>
                        <div className="flex flex-wrap justify-evenly">
                          <div className="w-[250px] bg-white rounded shadow p-2 cursor-pointer transition-all hover:shadow-lg mx-3 mb-5">
                            <img
                              className="w-full rounded min-h-[156px] max-h-[156px]"
                              src={
                                userBlog.imgurl
                                  ? userBlog.imgurl
                                  : "/images/blogging.jpg"
                              }
                              onError={(e) =>
                                (e.target.src = "/images/blogging.jpg")
                              }
                              alt="blogging"
                            />
                            <div className="my-2">
                              <p className="md:text-lg font-semibold">
                                {userBlog.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center font-medium text-lg">
                No user to show
              </div>
            )}
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfile;
