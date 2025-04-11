import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner, Card, ListGroup } from 'react-bootstrap';
import { ticketService } from '../services/api';

const TicketMod = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await ticketService.getTicketById(id);
        setTicket(response.data.ticket);
        setStatus(response.data.ticket.stato);
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

  const handleSave = async () => {
    setSaving(true);
    try {
      await ticketService.updateTicketStatus(id, { stato: status });
      navigate(`/tickets`);
    } catch (err) {
      console.error('Errore nel salvataggio:', err);
      setError('Si è verificato un errore durante il salvataggio.');
    } finally {
      setSaving(false);
    }
  };

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
      <h1>Modifica Ticket #{ticket.id}</h1>
      
      {/* Display ticket information using Bootstrap Card */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Informazioni Ticket</Card.Title>
          
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Titolo:</strong> {ticket.titolo}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Descrizione:</strong> {ticket.descrizione}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Richiedente:</strong> {ticket.richiedente.name} ({ticket.richiedente.email})
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Data Creazione:</strong> {new Date(ticket.created_at).toLocaleString()}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Status modification form */}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Stato attuale</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={ticket.stato}>{ticket.stato}</option>
            {['Aperto', 'Working', 'Chiuso']
              .filter(s => s !== ticket.stato)
              .map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Salvataggio in corso...' : 'Salva Modifiche'}
        </Button>
      </Form>
    </Container>
  );
};

export default TicketMod;