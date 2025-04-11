import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      // LOGOUT
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Aggiorna lo stato dell'utente
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">Sistema Ticket</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/tickets">Tickets</Nav.Link>

          </Nav>
          <Nav>
            <Navbar.Text className="me-3">
              Utente: <span className="text-light">{user?.name}</span>
            </Navbar.Text>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;