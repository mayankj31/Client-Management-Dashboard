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
      <Link to="/new-job-sheet">
        <button>New Job Sheet</button>
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
                  <button>View</button>
                </Link>
                <Link to={`/edit-job-sheet/${jobSheet.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(jobSheet.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;