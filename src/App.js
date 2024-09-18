import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import JobSheetForm from './components/JobSheetForm';
import ViewJobSheet from './components/ViewJobSheet';
import Header from './components/Header'; // New header component

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Moved header to a new component */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new-job-sheet" element={<JobSheetForm />} />
          <Route path="/edit-job-sheet/:id" element={<JobSheetForm />} />
          <Route path="/view-job-sheet/:id" element={<ViewJobSheet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
