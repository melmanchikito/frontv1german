const API_CONFIG = {
  baseURL: 'https://backv1german.onrender.com/',

  endpoints: {
    reservas: {
      crear: '?controller=reserva&action=crear',
      listar: '?controller=reserva&action=listar',
      actualizar: '?controller=reserva&action=actualizar',
      eliminar: '?controller=reserva&action=eliminar'
    },

    auth: {
      login: '?controller=auth&action=autenticar',
      logout: '?controller=auth&action=logout'
    }
  }
};

function getAPIUrl(resource, action, params = '') {
  return API_CONFIG.baseURL + API_CONFIG.endpoints[resource][action] + params;
}
