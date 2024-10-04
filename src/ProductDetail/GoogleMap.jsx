import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import iconmap from "../assets/iconmap.png";

function GoogleMap() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full pt-4 border-gray-200 border-t-4">
      <div className="w-[90%] sm:w-[80%] mx-auto">
        <h1 className="font-bold text-lg">
          {loading ? <Skeleton width={200} /> : "Thông tin thêm"}
        </h1>
        <div className="w-full justify-center items-center mt-2">
          <div className="flex items-center space-x-2">
            {loading ? (
              <Skeleton circle={true} height={24} width={24} />
            ) : (
              <img src={iconmap} className="h-6 w-6" alt="Map Icon" />
            )}
            <p className="font-medium text-sm sm:text-base">
              {loading ? <Skeleton width={300} /> : "143 Trần Hưng Đạo, KP 7, TT Dương Đông, H.Phú Quốc, tỉnh Kiên Giang, Việt Nam"}
            </p>
          </div>

          <div className="w-[100%] py-2 my-4">
            {loading ? (
              <Skeleton height={250} />
            ) : (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.460294954711!2d106.66478987465537!3d10.776014689372746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752edb765b5c25%3A0x9a3519bdad5a85a3!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ2_huqFpIG5n4buvIC0gVGluIGjhu41jIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCAoSFVGTElUKQ!5e0!3m2!1svi!2s!4v1721238684990!5m2!1svi!2s"
                width="60%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {loading ? (
            <Skeleton circle={true} height={24} width={24} />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <p className="font-medium text-sm sm:text-base">
            {loading ? <Skeleton width={200} /> : "liên hệ đối tác: +0947***814"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GoogleMap;
