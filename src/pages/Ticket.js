import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TicketList from '../components/TicketList';
import { ticketService } from '../services/api';

const Ticket = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isDipendente = user?.role_id === 2; // dipendente
  const isRepIT = user?.role_id === 1; // rep_it
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await ticketService.getAllTickets();
        console.log('Risposta API:', response);
        console.log('Dati ricevuti:', response.data);
        setTickets(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento dei ticket:', err);
        setError('Si è verificato un errore nel caricamento dei ticket.');
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>Gestione Ticket</h1>
          <p className="lead">Visualizza e gestisci tutti i tiket del sistema</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              {isDipendente && (
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Button variant="success" href="/tickets/create">
                    Nuovo Ticket
                  </Button>
                </div>
              )}
              <TicketList 
                tickets={tickets} 
                loading={loading} 
                error={error} 
                isRepIT={isRepIT} 
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Ticket;