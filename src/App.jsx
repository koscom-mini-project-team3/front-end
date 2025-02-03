import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DepositListPage from './pages/DepositListPage';
import DepositDetailPage from './pages/DepositDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/deposit" element={<DepositListPage />} />
        <Route path="/deposit/:id" element={<DepositDetailPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
