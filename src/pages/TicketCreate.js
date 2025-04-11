import React from 'react';
import TicketForm from '../components/TicketForm';

const TicketCreate = () => {
  return (
    <div>
      <h1 className='text-center'>Crea un Nuovo Ticket</h1>
      <TicketForm />
    </div>
  );
};

export default TicketCreate;