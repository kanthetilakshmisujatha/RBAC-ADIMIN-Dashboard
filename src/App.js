
// App.js - Main component for the RBAC Dashboard with Navigation
import React, { useState } from 'react';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import './styles/App.css'; // Ensure correct path

function App() {
  const [activePage, setActivePage] = useState('users'); // State for active page
  const [animationKey, setAnimationKey] = useState(0); // Key for triggering animations

  const navigateTo = (page) => {
    setActivePage(page);
    setAnimationKey((prev) => prev + 1); // Increment key to restart animation
  };

  return (
    <div className="App">
      <h1 className="typing-title">RBAC Admin Dashboard</h1> {/* Typing effect title */}
      
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <button
          className={`nav-button ${activePage === 'users' ? 'active' : ''}`}
          onClick={() => navigateTo('users')}
        >
          User Management
        </button>
        <button
          className={`nav-button ${activePage === 'roles' ? 'active' : ''}`}
          onClick={() => navigateTo('roles')}
        >
          Role Management
        </button>
      </nav>

      {/* Render Page Content with Effects Based on Active Page */}
      <div className="management-container">
        {activePage === 'users' && (
          <div key={animationKey} className="page-content zoom-in fade-in">
            <UserManagement />
          </div>
        )}
        {activePage === 'roles' && (
          <div key={animationKey} className="page-content zoom-in fade-in">
            <RoleManagement />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
