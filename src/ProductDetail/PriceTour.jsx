import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchTourById } from "../API/apiService"; // Nhập hàm từ tourService
import { useParams } from "react-router-dom"; // Nhập useParams

function TourInfo() {
  const { id } = useParams(); // Lấy id từ URL
  const [loading, setLoading] = useState(true);
  const [tourInfo, setTourInfo] = useState(null);

  useEffect(() => {
    const fetchTourInfo = async () => {
      setLoading(true);
      try {
        const data = await fetchTourById(id); // Sử dụng hàm từ service
        setTourInfo(data);
      } catch (error) {
        console.error("Error fetching tour info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourInfo();
  }, [id]); // Thêm id vào dependencies để gọi lại khi thay đổi

  // Kiểm tra nếu tourInfo không có dữ liệu
  if (!tourInfo) {
    return <div>No tour information available.</div>;
  }

  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto pb-6">
        <h1 className="text-xl font-bold mb-4">
          {loading ? <Skeleton width={200} /> : "Thông tin chung"}
        </h1>
        <div className="space-y-4">
          <div className="flex max-w-screen-md justify-between">
            <span className="font-semibold">
              {loading ? <Skeleton width={100} /> : "Giá vé"}
            </span>
            <span>
              {loading ? <Skeleton width={200} /> : tourInfo.price.toLocaleString()} VND
            </span>
          </div>
          <div className="flex max-w-screen-md justify-between">
            <span className="font-semibold">
              {loading ? <Skeleton width={100} /> : "Ngày khả dụng"}
            </span>
            <span>
              {loading ? (
                <Skeleton width={200} />
              ) : (
                new Date(tourInfo.createdAt).toLocaleDateString("vi-VN")
              )}

            </span>
          </div>
          <div className="flex max-w-screen-md justify-between">
            <span className="font-semibold">
              {loading ? <Skeleton width={100} /> : "Thời gian"}
            </span>
            <span>
              {loading ? <Skeleton width={200} /> : tourInfo.duration} Days
            </span>
          </div>
          <div className="flex max-w-screen-md justify-between">
            <span className="font-semibold">
              {loading ? <Skeleton width={100} /> : "Điểm đón khách"}
            </span>
            <span>
              {loading ? <Skeleton width={200} /> : tourInfo.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourInfo;
