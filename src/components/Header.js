import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  // Determine the header based on the current path
  const getHeader = () => {
    if (location.pathname === '/new-job-sheet') {
      return 'Create New Job Sheet';
    } else if (location.pathname.startsWith('/edit-job-sheet')) {
      return 'Edit Job Sheet';
    } else if (location.pathname.startsWith('/view-job-sheet')) {
      return 'View Job Sheet';
    }
    return 'Hardik Traders - Client Management Dashboard';
  };

  return <h1>{getHeader()}</h1>;
}

export default Header;
