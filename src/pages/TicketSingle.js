import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { ticketService } from '../services/api';
import TicketItem from '../components/Ticketitem';

const TicketSingle = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await ticketService.getTicketById(id);
        console.log('Dati del ticket:', response.data); // Aggiungi questo
        setTicket(response.data.ticket);
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento del ticket:', err);
        setError('Si è verificato un errore nel caricamento del ticket.');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!ticket) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">Ticket non trovato</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <TicketItem ticket={ticket} />
    </Container>
  );
};

export default TicketSingle;