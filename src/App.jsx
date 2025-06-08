import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import Drag from './views/drag'
import X from './views/x';
const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="content">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<X />} />
            </Route>
            <Route path="/" element={<Layout />}>
              <Route path="a" element={<Drag />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;