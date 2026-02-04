document.addEventListener('DOMContentLoaded', function() {

    const formLogin = document.getElementById('formLogin');
    const mensajeError = document.getElementById('mensajeError');

    if (!formLogin) {
        console.error("No existe formLogin");
        return;
    }

    formLogin.addEventListener('submit', async function(e) {
        e.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        try {
            const formData = new FormData();
            formData.append('usuario', usuario);
            formData.append('password', password);

            const url = API_CONFIG.baseURL + API_CONFIG.endpoints.auth.login;
            console.log("LOGIN URL:", url);

            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {

                const resultado = await response.json();

                if (resultado.success) {
                    window.location.href = 'admin-reservas.html';
                } else {
                    mostrarError(resultado.message || 'Usuario o contraseña incorrectos');
                }

            } else {
                mostrarError('Respuesta inválida del servidor');
            }

        } catch (error) {
            console.error('Error:', error);
            mostrarError('Error al conectar con el servidor');
        }
    });

    function mostrarError(mensaje) {
        mensajeError.querySelector('p').textContent = mensaje;
        mensajeError.classList.remove('ocultar');

        setTimeout(() => {
            mensajeError.classList.add('ocultar');
        }, 5000);
    }

});
