import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ticketService } from '../services/api';
import { Form, Button, Container, Card } from 'react-bootstrap';

const TicketForm = () => {
  const [titolo, setTitolo] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const ticketData = {
        titolo,
        descrizione,
        requester_id: user.id // id dell'utente autenticato (localStorage.getItem('user'))
      };

      await ticketService.createTicket(ticketData);
      alert('Creazine del ticket avvenuta con successo');
      navigate('/tickets');
    } catch (error) {
      console.error('Errore nelal creazione del ticket:', error);
      alert('ERRORE !! nella creazione del ticket.');
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Crea un Nuovo Ticket</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                value={titolo}
                onChange={(e) => setTitolo(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Crea Ticket
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TicketForm;