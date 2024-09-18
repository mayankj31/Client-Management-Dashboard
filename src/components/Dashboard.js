// File: src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [jobSheets, setJobSheets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobSheets();
  }, []);

  const fetchJobSheets = async () => {
    const response = await fetch('http://localhost:3001/api/job-sheets');
    const data = await response.json();
    setJobSheets(data);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job sheet?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/job-sheets/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Remove the deleted job sheet from the state
          setJobSheets(jobSheets.filter(sheet => sheet.id !== id));
        } else {
          console.error('Failed to delete job sheet');
        }
      } catch (error) {
        console.error('Error deleting job sheet:', error);
      }
    }
  };

  const filteredJobSheets = jobSheets.filter(jobSheet =>
    jobSheet.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Client Name or ID"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="search" onClick={handleSearch}>Search</button>
      <Link to="/new-job-sheet">
        <button className='newjob'>New Job Sheet</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Contact Info</th>
            <th>Received Date</th>
            <th>Inventory Received</th>
            <th>Reported Issues</th>
            <th>Client Notes</th>
            <th>Assigned Technician</th>
            <th>Estimated Amount</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobSheets.map((jobSheet, index) => (
            <tr key={jobSheet.id}>
              <td>{index + 1}</td>
              <td>{jobSheet.id}</td>
              <td>{jobSheet.clientName}</td>
              <td>{jobSheet.contactInfo}</td>
              <td>{new Date(jobSheet.receivedDate).toLocaleDateString()}</td>
              <td>{jobSheet.inventoryReceived}</td>
              <td>{jobSheet.reportedIssues}</td>
              <td>{jobSheet.clientNotes}</td>
              <td>{jobSheet.assignedTechnician}</td>
              <td>{jobSheet.estimatedAmount}</td>
              <td>{new Date(jobSheet.deadline).toLocaleDateString()}</td>
              <td>{jobSheet.status}</td>
              <td>
              <Link to={`/view-job-sheet/${jobSheet.id}`}>
                <button className="view-button">View</button>
              </Link>
              <Link to={`/edit-job-sheet/${jobSheet.id}`}>
                <button className="edit-button">Edit</button>
              </Link>
              <button className="delete-button" onClick={() => handleDelete(jobSheet.id)}>Delete</button>              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="footer">
        © 2024 Hardik Traders
      </footer>
    </div>
  );
}

export default Dashboard;