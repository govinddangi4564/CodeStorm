import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Articles from './pages/Articles';
import Calculator from './pages/Calculator';
import Login from './pages/Login';
import PledgePage from './pages/PledgePage'; // Since pledge needs its own page
import EcoRewards from './pages/EcoRewards';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pledge" element={<PledgePage />} />
              <Route path="/rewards" element={<EcoRewards />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
