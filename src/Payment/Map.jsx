import React from 'react';

function Map() {
  return (
    <div>
        <h1 className='text-2xl font-bold mt-4'>Thông tin đưa đón & địa điểm</h1>
    <div className="w-full bg-white mt-4 flex justify-center">
      <div className="w-[100%] bg-white p-4 rounded-md">
        <div className="w-full h-80 relative">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4602949547116!2d106.66478987465536!3d10.77601468937274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752edb765b5c25%3A0x9a3519bdad5a85a3!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ2_huqFpIG5n4buvIC0gVGluIGjhu41jIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCAoSFVGTElUKQ!5e0!3m2!1svi!2s!4v1720807350069!5m2!1svi!2s"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Map;
