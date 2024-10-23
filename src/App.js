import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import CaptionPage from './components/CaptionPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/caption" element={<CaptionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
