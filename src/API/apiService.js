const BASE_URL = 'http://localhost:8081';

const TOUR_API_URL = `${BASE_URL}/tours/api`;
const AUTH_API_URL = `${BASE_URL}/api/auth`;
const ORDER_API_URL = `${BASE_URL}/orders/api`;
export const FAVORITE_API_URL = `${BASE_URL}/favorite-tours`;

export const fetchTours = async (tourTypeId) => {
  try {
    const response = await fetch(TOUR_API_URL);
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách tour');
    }
    const data = await response.json();
    return tourTypeId ? data.filter(tour => tour.tourType._id === tourTypeId) : data;
  } catch (error) {
    console.error('Error fetching tours:', error);
    throw error;
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

    return await response.json();
  } catch (error) {
    console.error('Error checking user email:', error);
    throw error;
  }
};

export const customerInfo = async (contactInfo, orderData) => {
  try {
    const customerInfoPayload = {
      customerInfo: {
        fullName: contactInfo.contactName,
        phone: contactInfo.contactPhone,
        email: contactInfo.contactEmail,
      },
      ...orderData,
    };

    const response = await fetch(`${ORDER_API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerInfoPayload),
    });

    if (!response.ok) {
      throw new Error('Không thể lưu thông tin liên hệ');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving contact information:', error);
    throw error;
  }
};

export const checkIfFavorite = async (userId, tourId) => {
  try {
    const response = await fetch(`${FAVORITE_API_URL}/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userId, tour: tourId }),
    });

    if (!response.ok) {
      throw new Error("Không thể kiểm tra trạng thái yêu thích");
    }

    const data = await response.json();
    return data.isFavorite;
  } catch (error) {
    console.error('Error checking favorite:', error);
    throw error;
  }
};

export const toggleFavoriteTour = async (userId, tourId, isFavorite) => {
  try {
    const response = await fetch(`${FAVORITE_API_URL}/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userId, tour: tourId, isFavorite }),
    });

    if (!response.ok) {
      throw new Error("Không thể thêm/xóa tour khỏi danh sách yêu thích");
    }

    return await response.json();
  } catch (error) {
    console.error('Error toggling favorite tour:', error);
    throw error;
  }
};

// Hàm để lấy danh sách các tour yêu thích của người dùng
export const fetchFavoriteTours = async (userId) => {
  try {
    const response = await fetch(`${FAVORITE_API_URL}/${userId}`);
    if (!response.ok) {
      throw new Error("Đã xảy ra lỗi khi lấy danh sách tour yêu thích");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching favorite tours:", error);
    throw error;
  }
};

// Hàm để xóa tour khỏi danh sách yêu thích
export const removeFavoriteTour = async (userId, tourId) => {
  try {
    const response = await fetch(`${FAVORITE_API_URL}/${userId}/${tourId}`, { // Sử dụng userId và tourId thực tế
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // Lấy dữ liệu lỗi nếu có
      throw new Error(errorData.message || "Đã xảy ra lỗi khi xóa tour yêu thích");
    }
  } catch (error) {
    console.error("Error removing favorite tour:", error);
    throw error;
  }
};
