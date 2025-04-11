import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
/* import { ticketService } from '../services/api'; */

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recupera dal localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const getRoleGreeting = () => {
    if (!user) return "Benvenuto";
    
    if (user.role_id === 1) {
      return "Benvenuto, Responsabile IT";
    } else if (user.role_id === 2) {
      return "Benvenuto, Dipendente";
    } else {
      return `Benvenuto, ${user.name}`;
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h1 className="display-6">{getRoleGreeting()}</h1>
              <p className="lead">
                {user?.name ? `Ciao ${user.name}, benvenuto nel sistema di ticketing.` : 'Caricamento...'}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;