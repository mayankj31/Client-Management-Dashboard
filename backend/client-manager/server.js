// File: server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'client_management_system'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API Routes

// Get all job sheets
app.get('/api/job-sheets', (req, res) => {
  const query = 'SELECT * FROM job_sheets';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Create a new job sheet
app.post('/api/job-sheets', (req, res) => {
  const { clientName, contactInfo, receivedDate, inventoryReceived, reportedIssues, clientNotes, assignedTechnician, estimatedAmount, deadline, status } = req.body;
  const query = 'INSERT INTO job_sheets (clientName, contactInfo, receivedDate, inventoryReceived, reportedIssues, clientNotes, assignedTechnician, estimatedAmount, deadline, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [clientName, contactInfo, receivedDate, inventoryReceived, reportedIssues, clientNotes, assignedTechnician, estimatedAmount, deadline, status], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

// Get a single job sheet
app.get('/api/job-sheets/:id', (req, res) => {
  const query = 'SELECT * FROM job_sheets WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Job sheet not found' });
      return;
    }
    res.json(results[0]);
  });
});

// Update a job sheet
app.put('/api/job-sheets/:id', (req, res) => {
  const { clientName, contactInfo, receivedDate, inventoryReceived, reportedIssues, clientNotes, assignedTechnician, estimatedAmount, deadline, status } = req.body;
  const query = 'UPDATE job_sheets SET clientName = ?, contactInfo = ?, receivedDate = ?, inventoryReceived = ?, reportedIssues = ?, clientNotes = ?, assignedTechnician = ?, estimatedAmount = ?, deadline = ?, status = ? WHERE id = ?';
  db.query(query, [clientName, contactInfo, receivedDate, inventoryReceived, reportedIssues, clientNotes, assignedTechnician, estimatedAmount, deadline, status, req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Job sheet not found' });
      return;
    }
    res.json({ id: req.params.id, ...req.body });
  });
});

// Delete a job sheet
app.delete('/api/job-sheets/:id', (req, res) => {
  const query = 'DELETE FROM job_sheets WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Job sheet not found' });
      return;
    }
    res.json({ message: 'Job sheet deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});