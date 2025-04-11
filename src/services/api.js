import axios from 'axios';

// Config di Axios con la base url
const api = axios.create({
  baseURL: 'http://localhost:8000/api'
});

// impostare il token dopo il login o dopo il refresh
export const setAuthToken = (token) => {
  if (token) {
    // Applica il token a tutte le richieste
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Rimuovi il token se non è fornito
    delete api.defaults.headers.common['Authorization'];
  }
};

// Contfollo se c'è un token salvato al caricamento dell'app
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

// auth
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getUserProfile: () => api.get('/auth/user-profile'),
  refreshToken: () => api.post('/auth/refresh')
};

// TICKET
export const ticketService = {
  getAllTickets: () => api.get('/tickets'),
  getTicketById: (id) => api.get(`/tickets/${id}`),
  createTicket: (ticketData) => api.post('/tickets', ticketData),
  updateTicketStatus: (id, statusData) => api.put(`/tickets/${id}`, statusData),
  deleteTicket: (id) => api.delete(`/tickets/${id}`)
};

// Servizi per dashboard
export const dashboardService = {
  getRepItDashboard: () => api.get('/rep_it/dashboard'),
  getDipendenteDashboard: () => api.get('/dipendente/dashboard')
};

export default api;