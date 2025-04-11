import React from 'react';
import { Table, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TicketList = ({ tickets, loading, error, isRepIT }) => {
  if (loading) {
    return (
      <div className="text-center p-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Caricmento...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const ticketsArray = Array.isArray(tickets?.tickets) ? tickets.tickets : [];

  console.log('Tickets ricevuti Component:', tickets);
  console.log('Tickets array Component:', ticketsArray);

  if (ticketsArray.length === 0) {
    return <Alert variant="info">Nessun ticket trovato.</Alert>;
  }

  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Richiedente</th>
          <th>Titolo</th>
          <th>Email</th>
          <th>Stato</th>
          <th>Data Creazine</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        {ticketsArray.map(ticket => (
          <tr key={ticket.id || Math.random()}>
            <td>{ticket.id}</td>
            <td>{ticket.richiedente?.name || 'N/D'}</td>
            <td>
              <Link to={`/tickets/${ticket.id}`} className="text-decoration-none">
                {ticket.titolo || 'Titolo non disponibile'}
              </Link>
            </td>
            <td>{ticket.richiedente?.email || 'N/D'}</td>
            <td>
              <Badge bg={
                ticket.stato === 'Aperto' ? 'primary' :
                ticket.stato === 'Working' ? 'success' : 'secondary'
              }>
                {ticket.stato || 'N/D'}
              </Badge>
            </td>
            <td>{ticket.created_at ? new Date(ticket.created_at).toLocaleDateString('it-IT', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            }) : 'N/D'}</td>
            <td>
              <Link to={`/tickets/${ticket.id}`}>
                <Button variant="outline-primary" size="sm" className="me-1">
                  Visualizza
                </Button>
              </Link>
              {isRepIT && (
                <>
                <Link to={`/tickets/edit/${ticket.id}`}>
                  <Button variant="outline-warning" size="sm" className="me-1">
                    Modifica
                  </Button>
                </Link>  
                <Link to={`/tickets/delete/${ticket.id}`}>
                  <Button variant="outline-danger" size="sm">
                    Cancella
                  </Button>
                </Link>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TicketList;