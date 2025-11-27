const menu = document.querySelector(".icono-menu");
const navegacion = document.querySelector(".navegacion");
const filtroToggle = document.querySelector(".filtro-toggle");
const contenedorBotones = document.querySelector(".botones-platillos");

document.addEventListener("DOMContentLoaded", () => {
  eventos();
  eventosMenu();
  eventoFormulario();
});

const eventos = () => {
  menu.addEventListener("click", abrirMenu);
};

const abrirMenu = () => {
  navegacion.classList.remove("ocultar");
  botonCerrar();
};
const toggleFiltrosCategorias = () => {
  const btnToggle = document.querySelector(".filtro-toggle");
  const contenedor = document.querySelector(".botones-platillos");

  if (!btnToggle || !contenedor) return;

  btnToggle.addEventListener("click", () => {
    contenedor.classList.toggle("ocultar");
  });
};
const botonCerrar = () => {
  const botonCerrar = document.createElement("p");
  const overlay = document.createElement("div");
  overlay.classList.add("filtro");
  const body = document.querySelector("body");
  if (document.querySelectorAll(".filtro").length > 0) return;
  body.appendChild(overlay);
  botonCerrar.textContent = "X";
  botonCerrar.classList.add("btn-cerrar");
  navegacion.appendChild(botonCerrar);
  cerrarMenu(botonCerrar, overlay);
};

document.addEventListener("DOMContentLoaded", () => {
  eventos();
  eventosMenu();
  eventoFormulario();
  toggleFiltrosCategorias(); // 👈 nuevo
});

const eventosFiltros = () => {
  const filtroToggle = document.querySelector(".filtro-toggle");
  const contenedorBotones = document.querySelector(".botones-platillos");

  if (!filtroToggle || !contenedorBotones) return;

  filtroToggle.addEventListener("click", () => {
    contenedorBotones.classList.toggle("ocultar");
  });
};


const cerrarMenu = (boton, overlay) => {
  boton.addEventListener("click", () => {
    navegacion.classList.add("ocultar");
    overlay.remove();
    boton.remove();
  });
  overlay.onclick = () => {
    overlay.remove();
    navegacion.classList.add("ocultar");
    boton.remove();
  };
};

// Funcionalidad de filtrado de platillos
const eventosMenu = () => {
  const botones = document.querySelectorAll(".botones-platillos button");
  const platillos = document.querySelectorAll(".platillo");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      // Remover clase activo de todos los botones
      botones.forEach((btn) => btn.classList.remove("activo"));
      // Agregar clase activo al botón clickeado
      boton.classList.add("activo");

      const categoria = boton.classList[0]; // Primera clase es la categoría

      platillos.forEach((platillo) => {
        const tipoPlatillo = platillo.dataset.platillo;

        if (categoria === "todos") {
          platillo.classList.remove("ocultar");
        } else if (categoria === "ensaladas" && tipoPlatillo === "ensalada") {
          platillo.classList.remove("ocultar");
        } else if (categoria === "pasta" && tipoPlatillo === "pasta") {
          platillo.classList.remove("ocultar");
        } else if (categoria === "pizza" && tipoPlatillo === "pizza") {
          platillo.classList.remove("ocultar");
        } else if (categoria === "postres" && tipoPlatillo === "postre") {
          platillo.classList.remove("ocultar");
        } else {
          platillo.classList.add("ocultar");
        }
      });
    });
  });

  // Activar el botón "Todos" por defecto
  const botonTodos = document.querySelector(".todos");
  if (botonTodos) {
    botonTodos.classList.add("activo");
  }
};

// Funcionalidad del formulario de reservas (preparado para fetch)
const eventoFormulario = () => {
  const formulario = document.querySelector("#formReservas");

  if (formulario) {
    formulario.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Recopilar datos del formulario
      const datos = {
        nombre: document.querySelector("#nombre").value,
        email: document.querySelector("#email").value,
        telefono: document.querySelector("#telefono").value,
        fecha: document.querySelector("#fecha").value,
        hora: document.querySelector("#hora").value,
        personas: document.querySelector("#personas").value,
        ocasion: document.querySelector("#ocasion").value,
        comentarios: document.querySelector("#comentarios").value,
      };

      console.log("Datos de la reserva:", datos);

      // TODO: Implementar fetch a tu API cuando esté lista
      /*
      try {
        const respuesta = await fetch('URL_DE_TU_API/reservas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();
        
        if (respuesta.ok) {
          alert('¡Reserva confirmada! Te hemos enviado un email de confirmación.');
          formulario.reset();
        } else {
          alert('Hubo un error al procesar tu reserva. Inténtalo nuevamente.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión. Por favor, verifica tu internet.');
      }
      */

      // Simulación temporal (eliminar cuando implementes fetch real)
      alert(
        `¡Gracias ${datos.nombre}! Tu reserva para ${datos.personas} persona(s) el ${datos.fecha} a las ${datos.hora} ha sido registrada. Te contactaremos pronto.`
      );
      formulario.reset();
    });
  }
};
