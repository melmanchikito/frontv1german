document.addEventListener('DOMContentLoaded', function() {

    let reservas = [];
    let filtroActual = 'todas';
    let busquedaActual = '';

    const cuerpoTabla = document.getElementById('cuerpoTabla');
    const mensajeLoading = document.getElementById('mensajeLoading');
    const mensajeError = document.getElementById('mensajeError');
    const mensajeVacio = document.getElementById('mensajeVacio');
    const tablaReservas = document.getElementById('tablaReservas');
    const buscador = document.getElementById('buscarReserva');
    const botonesFiltro = document.querySelectorAll('.btn-filtro');

    const totalReservas = document.getElementById('totalReservas');
    const totalPendientes = document.getElementById('totalPendientes');
    const totalConfirmadas = document.getElementById('totalConfirmadas');
    const totalCanceladas = document.getElementById('totalCanceladas');

    const modal = document.getElementById('modalComentarios');
    const textoComentarios = document.getElementById('textoComentarios');

    const modalEditar = document.getElementById('modalEditar');
    const formEditar = document.getElementById('formEditar');

    // ✅ FETCH CENTRALIZADO
    async function fetchAuth(url, options = {}) {
        const res = await fetch(url, {
            credentials: 'include',
            ...options
        });

        const contentType = res.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Respuesta no es JSON (posible error CORS o sesión)");
        }

        return res.json();
    }

    cargarReservas();

    botonesFiltro.forEach(btn => {
        btn.addEventListener('click', function() {
            botonesFiltro.forEach(b => b.classList.remove('activo'));
            this.classList.add('activo');
            filtroActual = this.dataset.filtro;
            filtrarReservas();
        });
    });

    buscador.addEventListener('input', e => {
        busquedaActual = e.target.value.toLowerCase();
        filtrarReservas();
    });

    formEditar.addEventListener('submit', e => {
        e.preventDefault();
        actualizarReserva();
    });

    async function cargarReservas() {
        try {
            const url = API_CONFIG.baseURL + API_CONFIG.endpoints.reservas.listar;
            const resultado = await fetchAuth(url);

            mensajeLoading.classList.add('ocultar');

            if (resultado.success) {
                reservas = resultado.data;
                actualizarEstadisticas();
                filtrarReservas();
            } else {
                mostrarError(resultado.message);
            }

        } catch (error) {
            mensajeLoading.classList.add('ocultar');
            mostrarError(error.message);
        }
    }

    function filtrarReservas() {
        let datos = reservas;

        if (filtroActual !== 'todas') {
            datos = datos.filter(r => r.estado === filtroActual);
        }

        if (busquedaActual) {
            datos = datos.filter(r =>
                r.nombre.toLowerCase().includes(busquedaActual) ||
                r.email.toLowerCase().includes(busquedaActual) ||
                r.codigo.toLowerCase().includes(busquedaActual)
            );
        }

        renderizarTabla(datos);
    }

    function renderizarTabla(datos) {
        cuerpoTabla.innerHTML = '';

        if (!datos.length) {
            tablaReservas.classList.add('ocultar');
            mensajeVacio.classList.remove('ocultar');
            return;
        }

        tablaReservas.classList.remove('ocultar');
        mensajeVacio.classList.add('ocultar');

        datos.forEach(r => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td><strong>${r.codigo}</strong></td>
                <td>${r.nombre}</td>
                <td>${r.email}</td>
                <td>${r.telefono}</td>
               <td><strong>${r.fecha} ${r.hora}</strong></td>

                <td>${r.personas}</td>
                <td>${r.ocasion || 'No especificada'}</td>
                <td>${(r.comentarios || '').substring(0,50)}</td>
                <td><span class="badge-estado badge-${r.estado}">${r.estado}</span></td>
                <td>
                    <button onclick="abrirModalEditar(${r.id})">✏️</button>
                    <button onclick="cambiarEstado(${r.id}, 'confirmada')">✔</button>
                    <button onclick="cambiarEstado(${r.id}, 'cancelada')">✖</button>
                </td>
                <td>
                    <button onclick="eliminarReserva(${r.id})">🗑</button>
                </td>
            `;

            cuerpoTabla.appendChild(fila);
        });
    }

    function actualizarEstadisticas() {
        totalReservas.textContent = reservas.length;
        totalPendientes.textContent = reservas.filter(r=>r.estado==='pendiente').length;
        totalConfirmadas.textContent = reservas.filter(r=>r.estado==='confirmada').length;
        totalCanceladas.textContent = reservas.filter(r=>r.estado==='cancelada').length;
    }

    window.cambiarEstado = async function(id, estado) {
        const fd = new FormData();
        fd.append('id', id);
        fd.append('estado', estado);

        try {
            const url = API_CONFIG.baseURL + API_CONFIG.endpoints.reservas.actualizarEstado;
            const r = await fetchAuth(url, { method:'POST', body: fd });

            if (r.success) cargarReservas();
            else alert(r.message);

        } catch(e) { alert(e.message); }
    }

    /*window.abrirModalEditar = async function(id) {
        try {
           const url = API_CONFIG.baseURL + API_CONFIG.endpoints.reservas.obtener + "&id=" + id;


            const r = await fetchAuth(url);

            if (!r.success) return alert(r.message);

            Object.entries(r.data).forEach(([k,v])=>{
                const el = document.getElementById('edit-'+k);
                if (el) el.value = v ?? '';
            });

            modalEditar.style.display='flex';

        } catch(e){ alert(e.message); }
    }*/
     window.abrirModalEditar = async function(id) {

    console.log("CLICK EDITAR ID:", id);

    try {

        const url = API_CONFIG.baseURL +
                    API_CONFIG.endpoints.reservas.obtener +
                    "&id=" + id;

        console.log("URL:", url);

        const r = await fetchAuth(url);

        console.log("RESPUESTA:", r);

        if (!r.success) {
            alert(r.message);
            return;
        }

        Object.entries(r.data).forEach(([k,v])=>{
            const el = document.getElementById('edit-' + k);
            if (el) el.value = v ?? '';
        });

        modalEditar.style.display = 'flex';

    } catch(e){ 
        console.error("ERROR EDITAR:", e);
        alert(e.message); 
    }
}

    async function actualizarReserva() {
        try {
            const fd = new FormData(formEditar);
            const url = API_CONFIG.baseURL + API_CONFIG.endpoints.reservas.actualizar;

            const r = await fetchAuth(url, { method:'POST', body: fd });

            if (r.success) {
                cerrarModalEditar();
                cargarReservas();
            } else alert(r.message);

        } catch(e){ alert(e.message); }
    }

    window.eliminarReserva = async function(id) {
        const fd = new FormData();
        fd.append('id', id);

        try {
            const url = API_CONFIG.baseURL + API_CONFIG.endpoints.reservas.eliminar;
            const r = await fetchAuth(url, { method:'POST', body: fd });

            if (r.success) cargarReservas();
            else alert(r.message);

        } catch(e){ alert(e.message); }
    }

    window.cerrarModalEditar = () => {
        modalEditar.style.display='none';
        formEditar.reset();
    };

    function mostrarError(m) {
        mensajeError.querySelector('p').textContent = m;
        mensajeError.classList.remove('ocultar');
    }

});
