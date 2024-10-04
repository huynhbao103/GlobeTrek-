import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import imgtopbody from "../assets/imgtopbody.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontawesome"; // Ensure this file configures FontAwesome correctly

function Topbody() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time if needed
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <div className="w-[68%] max-w-[1280px] pt-[180px]">
          {loading ? (
            <Skeleton
              color="#202020"
              duration={2}
              height={50}
              width={100}
              className="mb-7"
            />
          ) : (
            <h1 className="font-bold sm:text-5xl text-3xl mb-7">Tour</h1>
          )}
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="sm:w-[68%] mx-2 flex flex-col items-center">
            {loading ? (
              <Skeleton
                color="#202020"
                height={390}
                width={1280}
                duration={2}
                highlightColor="#CCCC"
                className="z-[-1]"
              />
            ) : (
              <img
                className="w-full block h-96 object-cover"
                src={imgtopbody}
                alt="Tour"
              />
            )}
            <div className="sm:w-[80%] flex items-center justify-center mt-[-50px]">
              <div className="flex flex-col md:flex-row sm:w-[80%] w-96 bg-white rounded-md shadow-lg p-4 items-center">
                <div className="relative flex items-center sm:justify-between justify-center w-full mb-2 md:mb-0 md:mr-2">
                  <FontAwesomeIcon
                    icon="magnifying-glass"
                    className="absolute left-4 text-gray-500"
                  />
                  {loading ? (
                    <Skeleton
                      className="w-full rounded-sm"
                      color="#202020"
                      height={48}
           
                    />
                  ) : (
                    <>
                      <input
                        type="text"
                        className="flex-grow rounded-sm pl-10 pr-4 text-sm py-3 ml-2 border border-[#4CA771] focus:outline-none focus:ring-2 focus:ring-[#4CA771] focus:border-[#4CA771]"
                        placeholder="Bạn có ý tưởng gì cho chuyến đi tiếp theo không?"
                        disabled={loading}
                      />
                      <button
                        className="md:w-[19%] w-[100%] ml-2 font-bold bg-[#4CA771] text-sm text-white py-3 p-2 rounded-md hover:bg-[#0c3701c0]"
                        disabled={loading}
                      >
                        Tìm kiếm
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbody;
