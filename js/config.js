const API_CONFIG = {
  baseURL: 'https://italianiphp.infinityfree.me/Proyecto-Restaurante-Italiano/api.php',
  endpoints: {
    reservas: {
      crear: '?accion=crear',
      listar: '?accion=listar',
      listarPorEstado: '?accion=listar-por-estado&estado=',
      obtener: '?accion=obtener&id=',
      actualizarEstado: '?accion=actualizar-estado',
      actualizar: '?accion=actualizar',
      eliminar: '?accion=eliminar',
      estadisticas: '?accion=estadisticas'
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
