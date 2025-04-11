import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, setAuthToken } from '../services/api';
import { Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login({ email, password });
      
      // risp comp. console
      console.log('Risposta completa dal server:', response);
      console.log('Dati della risposta:', response.data);

      const { access_token, user } = response.data;
      
      // Salva il token nel localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // fetchaxios per inviare il token con ogni richiesta
      setAuthToken(access_token);
      
      // Stato utente App
      setUser(user);
      
      // Reindirizza alla dashboard
      navigate('/dashboard');
    } catch (err) {
      console.log('Errore completo:', err);
      console.log('Risposta di errore:', err.response);
      setError(err.response?.data?.error || 'Si è verificato un errore durante il login');
      console.error('Errore di login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center container_login" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={4} className="mx-auto">
          <Card className="shadow">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4">Sistema di Ticketing</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Inserisci la tua email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Inserisci la tua password"
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Accesso in corso...
                      </>
                    ) : (
                      'Accedi'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Login;