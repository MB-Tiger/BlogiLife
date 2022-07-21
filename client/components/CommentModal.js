import { AiOutlineStar, AiFillStar, AiOutlineClose } from "react-icons/ai";

const CommentModal = (props) => {
  const {
    setIsModal,
    isModal,
    Rating,
    commentInput,
    setCommentInput,
    sumbitComment,
    ratingHandler,
  } = props;

  return (
    <>
      {isModal == true ? (
        <div
          onClick={() => setIsModal(!isModal)}
          className="fixed w-full h-screen bg-black bg-opacity-50 z-[49] left-1/2 -translate-x-1/2 cursor-not-allowed"
        ></div>
      ) : null}
      {isModal == true ? (
        <div className="fixed md:w-[450px] sm:w-[350px] w-[300px] min-h-[550px] rounded-lg bg-white left-1/2 -translate-x-1/2 md:mt-8 mt-4 z-50 p-2 overflow-y-auto">
          <AiOutlineClose
            onClick={() => setIsModal(!isModal)}
            className="text-xl absolute right-2 cursor-pointer"
          />
          <div className="text-center">
            <div className="font-medium text-lg mb-1">Rate the blog</div>
            <Rating
              emptySymbol={
                <AiOutlineStar className="text-4xl text-yellow-400" />
              }
              fullSymbol={<AiFillStar className="text-4xl text-yellow-400" />}
              onClick={(rating) => ratingHandler(rating)}
            />
            <label className="w-full block mt-4">
              <div className="font-medium text-lg mb-2">Your point of view</div>
              <textarea
                className="w-full border-2 rounded p-2"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </label>
            <button
              className="bg-red-500 text-white rounded transition-all hover:bg-red-700 p-2 mt-5"
              onClick={() => sumbitComment()}
            >
              Sumbit comment
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CommentModal;
