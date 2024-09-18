import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const JobSheetForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    clientName: '',
    contactInfo: '',
    receivedDate: '',
    inventoryReceived: '',
    reportedIssues: '',
    clientNotes: '',
    assignedTechnician: '',
    deadline: '',
    estimatedAmount: '',
    status: 'Pending'
  });

  // Fetch existing job sheet if `id` is present
  useEffect(() => {
    if (id) {
      fetchJobSheet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchJobSheet = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/job-sheets/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data); // Populate form with the existing job sheet data
      } else {
        throw new Error('Failed to fetch job sheet');
      }
    } catch (error) {
      console.error('Error fetching job sheet:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const method = id ? 'PUT' : 'POST'; // Use PUT for update, POST for create
      const url = id ? `http://localhost:3001/api/job-sheets/${id}` : 'http://localhost:3001/api/job-sheets';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Job sheet has been ${id ? 'updated' : 'submitted'} successfully!`);
        navigate('/'); // Redirect to the dashboard
      } else {
        throw new Error(`Failed to ${id ? 'update' : 'submit'} job sheet`);
      }
    } catch (error) {
      console.error(`Error ${id ? 'updating' : 'submitting'} job sheet:`, error);
      alert(`Failed to ${id ? 'update' : 'submit'} job sheet. Please try again.`);
    }
  };

  const handleFileChange = (event) => {
    // Handle file upload logic here
    console.log('File selected:', event.target.files[0]);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label htmlFor="clientName" className="clientname">Client Name:</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="clientname"
          />
        </div>
        
        <div>
          <label htmlFor="contactInfo" className="contact">Contact Info (Phone 10nos):</label>
          <input
            type="tel"
            id="contactInfo"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            className="contact"
          />
        </div>
        
        <div>
          <label htmlFor="receivedDate" className="recieved">Received Date:</label>
          <input
            type="date"
            id="receivedDate"
            name="receivedDate"
            value={formData.receivedDate}
            onChange={handleChange}
            className="recieved"
          />
        </div>
        
        <div>
          <label htmlFor="inventoryReceived" className="inventory">Inventory Received:</label>
          <input
            type="text"
            id="inventoryReceived"
            name="inventoryReceived"
            value={formData.inventoryReceived}
            onChange={handleChange}
            className="inventory"
          />
        </div>
        
        <div>
          <label htmlFor="fileUpload" className="Upload">Upload Inventory Image/Document/Video:</label>
          <input
            type="file"
            id="fileUpload"
            name="fileUpload"
            onChange={handleFileChange}
            className="Upload"
          />
        </div>
        
        <div>
          <label htmlFor="reportedIssues" className="issues">Reported Issues:</label>
          <textarea
            id="reportedIssues"
            name="reportedIssues"
            value={formData.reportedIssues}
            onChange={handleChange}
            rows={3}
            className="issues"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="clientNotes" className="notes">Client Notes:</label>
          <textarea
            id="clientNotes"
            name="clientNotes"
            value={formData.clientNotes}
            onChange={handleChange}
            rows={3}
            className="notes"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="assignedTechnician" className="technician">Assigned Technician:</label>
          <input
            type="text"
            id="assignedTechnician"
            name="assignedTechnician"
            value={formData.assignedTechnician}
            onChange={handleChange}
            className="technician"
          />
        </div>
        
        <div>
          <label htmlFor="deadline" className="deadlinedate">Deadline:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="deadlinedate"
          />
        </div>
        
        <div>
          <label htmlFor="estimatedAmount" className="estimate">Estimated Amount:</label>
          <input
            type="number"
            id="estimatedAmount"
            name="estimatedAmount"
            value={formData.estimatedAmount}
            onChange={handleChange}
            className="estimate"
          />
        </div>
        
        <div>
          <label htmlFor="status" className="state">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="state"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <button type="submit" className="submitted">Save Changes</button>
        <button className='cancelled'>
          <Link to="/" className="cancel">Cancel</Link>
        </button>
      </form>
    </div>
  );
};

export default JobSheetForm;