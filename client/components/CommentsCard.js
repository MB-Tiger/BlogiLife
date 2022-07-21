const CommentsCard = (props) => {
  const { comments, blog } = props;
  return (
    <>
      {comments.length ? (
        comments.map((comment) => {
          const d = new Date(comment.createdAt);
          // console.log("**********");
          // console.log(d.getDate());
          // console.log(d);
          return (
            <div className="w-full mb-5" key={comment._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={
                      comment.user.avatar
                        ? `http://localhost:4000/${comment.user.avatar}`
                        : "/images/man.png"
                    }
                    alt="user profile"
                    className="w-[40px] h-[40px] rounded-full"
                  />
                  <p>{comment.user.name}</p>
                </div>
                <div className="text-xs">
                  {d.getMonth() + 1}/{d.getDate()}/{d.getFullYear()}
                </div>
              </div>
              <hr className="mt-1 mb-3" />
              <p>{comment.text}</p>
            </div>
          );
        })
      ) : (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-1 rounded-full bg-yellow-600"></div>
          <div className="font-semibold text-lg">No comments yet!</div>
        </div>
      )}
    </>
  );
};

export default CommentsCard;
