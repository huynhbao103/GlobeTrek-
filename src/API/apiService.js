// apiService.js
const API_URL = 'http://localhost:8081/tours/api';

export const fetchTours = async (tourTypeId) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách tour');
    }
    const data = await response.json();
    return tourTypeId ? data.filter(tour => tour.tourType._id === tourTypeId) : data;
  } catch (error) {
    console.error('Error fetching tours:', error);
    throw error; // Ném lỗi để có thể xử lý bên ngoài
  }
};

export const fetchTourById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Không thể lấy thông tin tour');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tour by ID:', error);
    throw error; 
  }
};

// Hàm lấy danh sách loại tour (nếu cần)
export const fetchTourTypes = async () => {
  try {
    const response = await fetch(`${API_URL}/tour-types`); 
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách loại tour');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tour types:', error);
    throw error; 
  }
};
