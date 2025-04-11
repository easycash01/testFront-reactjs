import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';

const TicketItem = ({ ticket }) => {
  const navigate = useNavigate();

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Body>
        <Card.Title>{ticket.titolo}</Card.Title>
        
        <Row className="mb-3">
          <Col md={6}>
            <Card.Subtitle className="mb-2 text-muted">Stato:</Card.Subtitle>
            <Badge bg={ticket.stato === 'Aperto' ? 'success' : 'warning'}>
              {ticket.stato}
            </Badge>
          </Col>
          <Col md={6}>
            <Card.Subtitle className="mb-2 text-muted">Creato il:</Card.Subtitle>
            <p>{new Date(ticket.created_at).toLocaleDateString()}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Ultimo aggiornamento:</Card.Subtitle>
            <p>{new Date(ticket.updated_at).toLocaleDateString()}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Richiedente:</Card.Subtitle>
            <p>{ticket.richiedente.name} ({ticket.richiedente.email})</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Descrizione:</Card.Subtitle>
            <Card.Text>{ticket.descrizione}</Card.Text>
          </Col>
        </Row>

        <div className="d-flex gap-2 mt-5">
          <Button variant="primary" onClick={() => navigate(-1)}>
            Torna Indietro
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TicketItem;