import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, user, setUser }) => {
  return (
    <div className="app-container">
      <Navbar user={user} setUser={setUser} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;