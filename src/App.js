import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Ticket from './pages/Ticket';
import TicketSingle from './pages/TicketSingle';
import TicketMod from './pages/TicketMod';
import TicketCreate from './pages/TicketCreate';
import Layout from './components/Layout';
/* import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm'; */

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  // rotte protete TUTTE
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return <Layout user={user} setUser={setUser}>{children}</Layout>;
  };

  //rotte protette da rep_it
  const RepItRoute = ({ children }) => {
    if (!user || user.role_id !== 1) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Layout user={user} setUser={setUser}>{children}</Layout>;
  };

  return (
    <Router>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={user ? (
          <Navigate to="/dashboard" replace />
        ) : (
          <Login setUser={setUser} />
        )} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/tickets" element={
          <ProtectedRoute>
            <Ticket/>
          </ProtectedRoute>
        } />
        
      {<Route path="/tickets/create" element={
          <ProtectedRoute>
            <TicketCreate />
          </ProtectedRoute>
        } /> }
        
      { <Route path="/tickets/:id" element={
          <ProtectedRoute>
            <TicketSingle/>
          </ProtectedRoute>
        } /> }

        <Route path="*" element={<Navigate to="/" replace />} />
     
        <Route path="/tickets/edit/:id" element={
          <RepItRoute>
            <TicketMod/>
          </RepItRoute>
        } />

{/*         <Route path="/tickets/delete/:id" element={
          <RepItRoute>
            <TicketDelete/>
          </RepItRoute>
        } /> */}
      </Routes>
    </Router>
  );
}

export default App;
