import Rating from "react-rating";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const RatingCard = (props) => {
  const { blog, modalHandlear } = props;
  return (
    <>
      <div>
        <span className="text-xl font-medium">{blog.averageScore}</span> / 5
      </div>
      <Rating
        emptySymbol={<AiOutlineStar className="text-4xl text-yellow-400" />}
        fullSymbol={<AiFillStar className="text-4xl text-yellow-400" />}
        placeholderRating={blog.averageScore}
        placeholderSymbol={<AiFillStar className="text-4xl text-yellow-400" />}
        fractions={10}
        readonly
      />
      <div className="text-sm">Leave a comment about this article</div>
      <button
        onClick={() => modalHandlear()}
        className="border border-red-500 bg-white p-1 text-red-500 rounded-md w-full"
      >
        Sumbit comment
      </button>
      {/* <button className="py-[2px] px-1 bg-blue-500 text-white rounded">Rate</button> */}
    </>
  );
};

export default RatingCard;
