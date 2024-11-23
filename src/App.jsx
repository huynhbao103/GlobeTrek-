// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Body from './main/Body.jsx';
import ProductBody from './product/Body.jsx';
import BodyProDetail from './ProductDetail/Bodydetail.jsx';
import BodyPay from './Payment/bodyPay.jsx';
import BookingForm from './Payment/BookingForm.jsx';
import { DateProvider } from './Context/DateContext.jsx';

import Payment from './Payment/Payment.jsx';

import Settings from './YourAccount/Settings.jsx';
import SetPlace from './YourAccount/SetPlace.jsx';
import Transaction from './YourAccount/Transaction.jsx';
import SavedPassengers from './YourAccount/savedPassengers.jsx';
import Refunds from './YourAccount/Refunds.jsx';
import Savelist from './header1/Savelist.jsx';
import LoadingLogin from './LoadingLogin';
// import ForgotPassword from './header1/Password/ForgotPassword.jsx';
import ForgotPassword from './header1/Password/forgotPassword.jsx';
// import ResetPassword from './header1/Password/ResetPassword.jsx';


function App() {

  return (
    <DateProvider>
      <Router>
        <Routes>

          <Route path="/" element={<Body />} />
          <Route path="/product-body" element={<ProductBody />} />
          <Route path="/ProDetail/:id" element={<BodyProDetail />} />
          <Route path="/bodyPay/:id" element={<BodyPay />} />
          <Route path="/BookingForm/:id" element={<BookingForm />} />
          <Route path="/Payment/:id" element={<Payment />} />
          <Route path="/LoadingLogin" element={<LoadingLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}

          <Route path="/settings" element={<Settings />} />
          <Route path="/setplace" element={<SetPlace />} />
          <Route path="/SavedPassengers" element={<SavedPassengers />} />
          <Route path="/Refunds" element={<Refunds />} />
          <Route path="/Transaction" element={<Transaction />} />
          <Route path="/Savelist" element={<Savelist />} />
        </Routes>
      </Router>
    </DateProvider>
  );
}

export default App;