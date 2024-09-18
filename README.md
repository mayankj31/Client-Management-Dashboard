# Client Management System

## Overview

This project is a Client Management System that includes both frontend and backend components. It allows users to manage job sheets, view and edit notes, and handle job data.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MySQL

## Project Structure

- `backend/` - Contains the Node.js and Express backend application.
- `client_management_system.sql` - SQL file for database schema and initial data.

## Prerequisites

- Node.js and npm installed
- MySQL installed and running

## Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd directory_name
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the React application:**

    ```bash
    npm start
    ```

    The frontend application will be available at `http://localhost:3000`.

## Backend Setup

1. **Navigate to the backend directory:**

    ```bash
    cd backend/client-manager
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set Up the Database:**

    - Ensure MySQL is installed and running.
    - Create a new database:

        ```sql
        CREATE DATABASE client_management_system;
        ```

    - Import the SQL file into the newly created database:

        ```bash
        mysql -u your-username -p client_management_system < database-schema.sql
        ```

4. **Run the Backend Server:**

    ```bash
    npm start
    ```

    The backend server will be available at `http://localhost:3001`.

## API Endpoints

- **GET** `/api/job-sheets` - Retrieve all job sheets
- **POST** `/api/job-sheets` - Create a new job sheet
- **GET** `/api/job-sheets/:id` - Retrieve a specific job sheet by ID
- **PATCH** `/api/job-sheets/:id` - Update a specific job sheet by ID
- **DELETE** `/api/job-sheets/:id` - Delete a specific job sheet by ID

## Frontend Features

- View job sheets with details including client information, received date, inventory, reported issues, and more.
- Edit and save client notes.
- Export job sheet details as a PDF.
- View and download attached files.

## Backend Features

- Handles CRUD operations for job sheets.
- Manages database connections and queries.

## Notes

- Ensure you have created a `.env` file in the `backend` directory with the following content:

    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=client_management_system
    ```

  Update the values according to your MySQL configuration.

## Troubleshooting

- If you encounter issues, check if MySQL is running and that the database credentials in `.env` are correct.
- Verify that the backend server is running and accessible at `http://localhost:3001`.
- Ensure the frontend and backend applications are not conflicting on ports.

## Contributions

Feel free to open issues or submit pull requests. Contributions and feedback are welcome!
