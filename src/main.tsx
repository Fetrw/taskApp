import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLInputElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
