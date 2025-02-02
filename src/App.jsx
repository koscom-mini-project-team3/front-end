import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DepositPage from './pages/DepositPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/deposit" element={<DepositPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
