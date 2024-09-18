import React, { useState, useEffect, useCallback} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

function ViewJobSheet() {
  const [jobSheet, setJobSheet] = useState(null);
  const [note, setNote] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchJobSheet = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/job-sheets/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch job sheet');
      }
      const data = await response.json();
      setJobSheet(data);
      setNote(data.clientNotes || ''); // Initialize note with existing client notes
    } catch (error) {
      console.error('Error fetching job sheet:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchJobSheet();
  }, [fetchJobSheet]);

   const handleSaveNote = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/job-sheets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...jobSheet, clientNotes: note }),
      });

      if (!response.ok) {
        throw new Error('Failed to update job sheet');
      }

      // Refresh the job sheet data
      await fetchJobSheet();
      alert('Note updated successfully');
      navigate('/'); // Redirect to dashboard
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update note');
    }
  };

  const handleSavePDF = () => {
    const element = document.getElementById('job-sheet-details');
    const opt = {
      margin: 0.5,
      filename: `JobSheet-${jobSheet.clientName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job sheet?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/job-sheets/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Job sheet deleted successfully');
          navigate('/');        
        } 
        else 
        {
          console.error('Failed to delete job sheet');
        }
      } catch (error) {
        console.error('Error deleting job sheet:', error);
      }
    }
  };

  const handleFileView = (filename) => {
    window.open(`http://localhost:3001/uploads/${filename}`, '_blank');
  };

  if (!jobSheet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-job-sheet">
      <div id="job-sheet-details" className="job-sheet-details">
        <div className="job-sheet-row">
          <div className="job-sheet-label">Client Name:</div>
          <div className="job-sheet-value">{jobSheet.clientName}</div>
        </div>
        <div className="job-sheet-row">
          <div className="job-sheet-label">Contact Info:</div>
          <div className="job-sheet-value">{jobSheet.contactInfo}</div>
        </div>
        <div className="job-sheet-row">
          <div className="job-sheet-label">Received Date:</div>
          <div className="job-sheet-value">{new Date(jobSheet.receivedDate).toLocaleDateString()}</div>
        </div>
        <div className="job-sheet-row">
          <div className="job-sheet-label">Inventory Received:</div>
          <div className="job-sheet-value">{jobSheet.inventoryReceived}</div>
        </div>
        <div className="job-sheet-row">
          <div className="job-sheet-label">Inventory File:</div>
          <div className="job-sheet-value">
            {jobSheet.inventoryFile ? (
              <button onClick={() => handleFileView(jobSheet.inventoryFile)}>
                View File
              </button>
            ) : (
              'No file available'
            )}
          </div>
        </div>
        <div className="job-sheet-row">
          <div className="job-sheet-label">Reported Issues:</div>
          <div className="job-sheet-value">{jobSheet.reportedIssues}</div>
        </div>
        <div className="job-sheet-row">
          <div className="job-sheet-label">Client Notes:</div>
          <div className="job-sheet-value">{jobSheet.clientNotes}</div>
        </div>
        <div className="job-sheet-row">
          <div className="job-sheet-label">Assigned Technician:</div>
          <div className="job-sheet-value">{jobSheet.assignedTechnician}</div>
        </div>
        <div className="job-sheet-row">
          <div className="job-sheet-label">Estimated Amount:</div>
          <div className="job-sheet-value">{jobSheet.estimatedAmount}</div>
        </div>
        <div className="job-sheet-row">
          <div className="job-sheet-label">Deadline:</div>
          <div className="job-sheet-value">{new Date(jobSheet.deadline).toLocaleDateString()}</div>
        </div>
        <div className="job-sheet-row">
          <div className="job-sheet-label">Status:</div>
          <div className="job-sheet-value">{jobSheet.status}</div>
        </div>
      </div>
      <div className="notes-section">
        <h3>Add or Update Note:</h3>
        <textarea
          className="notes-input"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter note here..."
        ></textarea>
        <button className="save-note-btn" onClick={handleSaveNote}>Save Note</button>
      </div>
      <div className="action-buttons">
        <Link to={`/edit-job-sheet/${id}`} className="edit-btn">Edit</Link>
        <button className="delete-btn" onClick={() => handleDelete(jobSheet.id)}>Delete</button>
        <Link to="/" className="back-btn">Back</Link>
      </div>
      <button className="save-pdf-btn" onClick={handleSavePDF}>Save as PDF</button>
    </div>
  );
}

export default ViewJobSheet;
