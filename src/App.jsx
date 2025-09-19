import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Koleksi from './pages/Koleksi';
import MasterBuku from './pages/MasterBuku';
import KebutuhanBuku from './pages/KebutuhanBuku';
import StockBuku from './pages/StockBuku';
import TambahBuku from './pages/TambahBuku';

function App() {
  return (
    <Router basename="/Library-Management-System-RPL">
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/Dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/Koleksi" element={<Layout><Koleksi /></Layout>} />
        <Route path="/MasterBuku" element={<Layout><MasterBuku /></Layout>} />
        <Route path="/KebutuhanBuku" element={<Layout><KebutuhanBuku /></Layout>} />
        <Route path="/StockBuku" element={<Layout><StockBuku /></Layout>} />
        <Route path="/TambahBuku" element={<Layout><TambahBuku /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;