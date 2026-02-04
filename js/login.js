// Login functionality
//console.log("LOGIN JS CARGADO");

document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById('formLogin');
    const mensajeError = document.getElementById('mensajeError');

    formLogin.addEventListener('submit', async function(e) {
        e.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        try {
            const formData = new FormData();
            formData.append('usuario', usuario);
            formData.append('password', password);

            const response = await fetch(API_CONFIG.baseURL + API_CONFIG.endpoints.auth.login, {
                method: 'POST',
                body: formData,
                credentials: 'include' // Para enviar cookies de sesión
            });

            // Si la respuesta es una redirección, seguirla
            if (response.redirected) {
                window.location.href = 'admin-reservas.html';
                return;
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const resultado = await response.json();
                
                if (resultado.success) {
                    window.location.href = 'admin-reservas.html';
                } else {
                    mostrarError(resultado.message || 'Usuario o contraseña incorrectos');
                }
            } else {
                // Si no es JSON, asumimos que fue exitoso y redirigimos
                window.location.href = 'admin-reservas.html';
            }
        } catch (error) {
            console.error('Error:', error);
            mostrarError('Error al conectar con el servidor. Por favor, intenta nuevamente.');
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
