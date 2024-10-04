// import React, { useState, useEffect } from 'react';
// import SortandGrid from './SortandGrid';
// import ToursList from './TourList';
// import '../index.css';
// import Header from '../header1/Header';
// import Footer from '../footer/Footer';
// import tour from '../assets/tour.png';

// const App = () => {
//   const [tours, setTours] = useState([
//     { image: tour, location: 'Khaosan, Phra Nakhon', title: 'Phuket & Phi Phi Island Thailand Tour - 4 Days 3 Nights', price: 11690000, rating: 10.0 },
//     { image: tour, location: 'Singapore, Singapore', title: 'Singapore and Malaysia Full Package Tour', price: 9690000, rating: 9.7 },
//     { image: tour, location: 'Khaosan, Phra Nakhon', title: 'Thailand Full Package Tour (Bangkok & Pattaya) - 5D4N', price: 7490000, rating: 9.7 },
//     { image: tour, location: 'Khaosan, Phra Nakhon', title: 'Phuket & Phi Phi Island Thailand Tour - 4 Days 3 Nights', price: 11690000, rating: 10.0 },
//     { image: tour, location: 'Singapore, Singapore', title: 'Singapore and Malaysia Full Package Tour', price: 9690000, rating: 9.7 },
//     { image: tour, location: 'Khaosan, Phra Nakhon', title: 'Thailand Full Package Tour (Bangkok & Pattaya) - 5D4N', price: 7490000, rating: 9.7 },
//     { image: tour, location: 'Khaosan, Phra Nakhon', title: 'Phuket & Phi Phi Island Thailand Tour - 4 Days 3 Nights', price: 11690000, rating: 10.0 },
//     { image: tour, location: 'Singapore, Singapore', title: 'Singapore and Malaysia Full Package Tour', price: 9690000, rating: 9.7 },
//     { image: tour, location: 'Khaosan, Phra Nakhon', title: 'Thailand Full Package Tour (Bangkok & Pattaya) - 5D4N', price: 7490000, rating: 9.7 },
//   ]);

//   const [sortOption, setSortOption] = useState('popular');
//   const [view, setView] = useState('grid');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate data loading
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000); // Adjust time if needed
//   }, []);

//   const handleSortChange = (option) => {
//     setSortOption(option);
//     let sortedTours;
//     if (option === 'priceLowHigh') {
//       sortedTours = [...tours].sort((a, b) => a.price - b.price);
//     } else if (option === 'priceHighLow') {
//       sortedTours = [...tours].sort((a, b) => b.price - a.price);
//     } else {
//       sortedTours = [...tours];
//     }
//     setTours(sortedTours);
//   };

//   return (
//     <>
//       <div className="bg-[rgba(174,249,231,0.2)] mt-40">
//         <Header />
//         <div className="max-w-[1280px] w-[100%] mx-auto justify-center items-center">
//           <div className="justify-center items-center">
//             <SortandGrid onSortChange={handleSortChange} view={view} setView={setView} loading={loading} />
//             <ToursList tours={tours} view={view} loading={loading} />
//           </div>
//         </div>
//         <div className="max-sm:hidden">
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import SortandGrid from './SortandGrid';
import ToursList from './TourList';
import '../index.css';
import Header from '../header1/Header';
import Footer from '../footer/Footer';

const App = () => {
  const [tours, setTours] = useState([]);
  const [sortOption, setSortOption] = useState('popular');
  const [view, setView] = useState('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    const fetchTours = async () => {
      try {
        const response = await fetch('http://localhost:8081/tourdetails'); // URL API
        const data = await response.json();
        const mappedData = data.map((tour) => ({
          image: tour.images[0], // Assuming first image is displayed
          location: tour.destination.location, // Lấy địa chỉ từ trường destination
          title: tour.description, // Gán phần mô tả vào tiêu đề
          price: tour.norPrice,
          rating: tour.rating || 9.7, // Mặc định rating nếu không có
        }));
        setTours(mappedData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tour data:', error);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedTours;
    if (option === 'priceLowHigh') {
      sortedTours = [...tours].sort((a, b) => a.price - b.price);
    } else if (option === 'priceHighLow') {
      sortedTours = [...tours].sort((a, b) => b.price - a.price);
    } else {
      sortedTours = [...tours];
    }
    setTours(sortedTours);
  };

  return (
    <div className="bg-[rgba(174,249,231,0.2)] mt-40">
      <Header />
      <div className="max-w-[1280px] w-[100%] mx-auto justify-center items-center">
        <div className="justify-center items-center">
          <SortandGrid onSortChange={handleSortChange} view={view} setView={setView} loading={loading} />
          <ToursList tours={tours} view={view} loading={loading} />
        </div>
      </div>
      <div className="max-sm:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default App;
