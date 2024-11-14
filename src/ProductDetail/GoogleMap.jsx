import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import iconmap from "../assets/iconmap.png";
import { useParams } from "react-router-dom"; // Sử dụng useParams để lấy ID từ URL
import { fetchTourById } from "../API/apiService";

function GoogleMap() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState("");
  const [locationInfo, setLocationInfo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tour = await fetchTourById(id);
        setContactInfo(tour.contact);
        setLocationInfo(tour.location);
        console.log(tour);
      } catch (error) {
        console.error("Error fetching tour data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="max-w-screen-xl xl:mx-auto pt-4 border-gray-200 border-t-4">
      <div className="flex flex-col justify-center sm:w-full ">
        <h1 className="font-bold text-lg text-center">
          {loading ? <Skeleton width={200} /> : "Thông tin thêm"}
        </h1>
        <div className="max-w-screen-xl flex-col flex sm:justify-center mt-2 mx-auto xl:mx-36">
          <div className="flex items-center space-x-2">
            {loading ? (
              <Skeleton circle={true} height={24} width={24} />
            ) : (
              <img src={iconmap} className="h-6 w-6" alt="Map Icon" />
            )}
            <p className="font-medium text-sm sm:text-base">
              {loading ? <Skeleton width={300} /> : locationInfo}
            </p>
          </div>

          <div className="w-full sm:flex sm:justify-center py-2 my-4">
            {loading ? (
              <Skeleton height={250} />
            ) : (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.460294954711!2d106.66478987465537!3d10.776014689372746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752edb765b5c25%3A0x9a3519bdad5a85a3!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ2_huqFpIG5n4buvIC0gVGluIGjhu41jIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCAoSFVGTElUKQ!5e0!3m2!1svi!2s!4v1721238684990!5m2!1svi!2s"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoogleMap;
