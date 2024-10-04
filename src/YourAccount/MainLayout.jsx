import React, { useState, useRef } from 'react';
import SidebarMenu from './SidebarMenu';
import MainContent from './MainContent';
import Footer from '../footer/Footer';
import Header from '../header1/Header';

const MainLayout = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const sidebarRef = useRef(null);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    if (sidebarRef.current) {
      sidebarRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[rgba(174,249,231,0.2)]">
      <Header />
      <div className="max-w-[1280px] mx-auto">
        <div className="mt-40">
          <div className="flex items-start w-full mx-auto">
            <div ref={sidebarRef} className="items-center max-sm:hidden">
              <SidebarMenu setSelectedSection={handleSectionChange} />
            </div>
            <div className="flex-grow p-4">
              <MainContent selectedSection={selectedSection} />
            </div>
          </div>
        </div>
      </div>
      <div className="max-md:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
  