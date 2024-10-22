// apiService.js
const API_URL = 'http://localhost:8081/tours/api';

const AUTH_API_URL = 'http://localhost:8081/api/auth'
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
    const response = await fetch(`${TOUR_API_URL}/${id}`);
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
    const response = await fetch(`${TOUR_API_URL}/tour-types`); 
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách loại tour');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tour types:', error);
    throw error; 
  }
};

// Hàm tìm kiếm tour theo tiêu đề
export const searchTours = async (query) => {
  try {
    const response = await fetch(`${TOUR_API_URL}/search?query=${query}`);
    if (!response.ok) {
      throw new Error('Không thể tìm kiếm tour');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching tours:', error);
    throw error;
  }
};



export const checkUserEmail = async (email) => {
  try {
    const response = await fetch(`${AUTH_API_URL}/check-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.trim() }),
    });

    if (!response.ok) {
      throw new Error('Không thể kiểm tra email người dùng');
    }

    return await response.json();  // { exists: true/false }
  } catch (error) {
    console.error('Error checking user email:', error);
    throw error;  // Re-throw error for handling in the calling function
  }
};
