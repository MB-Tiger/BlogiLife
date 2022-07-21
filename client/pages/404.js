import React from "react";
import { useRouter } from "next/router";
import useTitle from "../hooks/useTitle";
import { MdArrowBack } from "react-icons/md";

const Error = () => {
  useTitle("Not found");
  const router = useRouter();

  return (
    <div className="text-center p-4 pt-12">
      <h2 className="text-4xl font-bold mb-4">
        404: The page you are looking for is not here
      </h2>
      <p className="text-lg mb-12">
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation
      </p>
      <img
        className="w-[600px] mx-auto"
        src="/images/page_not_found_su7k.svg"
        alt="page_not_found"
      />
      <button
        className="flex items-center justify-center mx-auto mt-8 bg-blue-600 hover:bg-blue-800 text-white transition-all duration-300 px-4 py-2 rounded-lg"
        onClick={() => router.push("/")}
      >
        <MdArrowBack className="text-lg mr-1" />
        Go back to home
      </button>
    </div>
  );
};

export default Error;
