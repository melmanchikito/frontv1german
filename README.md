# 🍝 Ristorante Italini - Frontend

## 📋 Descripción
Frontend del sitio web de **Ristorante Italini**, un restaurante italiano auténtico. Aplicación web desarrollada con **HTML5, CSS3 y JavaScript puro** (Vanilla JS), sin frameworks ni librerías externas, siguiendo las mejores prácticas de desarrollo web moderno.

## ✨ Características

### Páginas Públicas
- **Página Principal (index.html)**
  - Hero section con video de fondo
  - Sección "Sobre Nosotros" con imágenes
  - Menú de platillos con filtros por categoría (Ensaladas, Pasta, Pizza, Postres)
  - Formulario de reservas integrado con backend
  - Sección de chefs del restaurante
  - Footer con información de contacto

### Área Administrativa
- **Login (login.html)** - Acceso seguro al panel de administración
- **Panel de Reservas (admin-reservas.html)**
  - Visualización de todas las reservas
  - Filtros por estado (Pendientes, Confirmadas, Canceladas)
  - Búsqueda por nombre, email o código de reserva
  - Edición de reservas existentes
  - Cambio de estado de reservas
  - Eliminación de reservas
  - Estadísticas en tiempo real

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica y accesible
- **CSS3** - Estilos modernos con variables CSS, Grid, Flexbox
- **JavaScript (Vanilla JS)** - Interactividad sin frameworks
- **Fetch API** - Comunicación con el backend
- **Google Fonts** - Tipografías Playfair Display, Mulish y Cinzel

## 📁 Estructura del Proyecto

```
PAGINA_DE_COMIDA/
├── index.html              # Página principal
├── login.html              # Página de inicio de sesión
├── admin-reservas.html     # Panel de administración
├── assets/                 # Recursos multimedia
│   ├── bg_video.mp4        # Video del hero
│   ├── chef1-5.jpg         # Fotos de chefs
│   ├── ensalada.webp       # Imágenes de platillos
│   ├── pasta1-2.webp
│   ├── pizza1-2.webp
│   ├── postres1-3.webp
│   └── nosotros1-3.webp
├── css/
│   ├── normalize.css       # Reset CSS
│   ├── styles.css          # Estilos principales
│   ├── login.css           # Estilos del login
│   └── admin-reservas.css  # Estilos del panel admin
└── js/
    ├── config.js           # Configuración de API
    ├── app.js              # Lógica principal
    ├── login.js            # Lógica del login
    └── admin-reservas.js   # Lógica del panel admin
```

## 🚀 Instalación y Configuración

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Servidor web local (XAMPP, WAMP, Live Server de VS Code, etc.)
- Backend API de Ristorante Italini en funcionamiento

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd PAGINA_DE_COMIDA
   ```

2. **Configurar la URL del API**
   
   Edita el archivo `js/config.js` y modifica la URL base del backend:
   
   ```javascript
   const API_CONFIG = {
     baseURL: 'http://localhost/Proyecto-Restaurante-Italiano/api.php',
     // ...
   };
   ```

3. **Iniciar servidor local**

   **Opción A - Con VS Code Live Server:**
   - Instala la extensión "Live Server"
   - Click derecho en `index.html` → "Open with Live Server"

   **Opción B - Con XAMPP:**
   - Copia la carpeta a `C:\xampp\htdocs\`
   - Accede a `http://localhost/PAGINA_DE_COMIDA/`

   **Opción C - Con Python:**
   ```bash
   python -m http.server 8000
   ```
   Luego accede a `http://localhost:8000`

4. **Acceder a la aplicación**
   - Sitio público: `http://localhost/index.html`
   - Panel admin: `http://localhost/login.html`

## 👤 Credenciales de Acceso

Para acceder al panel de administración, usa las credenciales configuradas en el backend. Por defecto:

- **Usuario:** `admin`
- **Contraseña:** `12345`

*(Estas credenciales deben estar registradas en la base de datos del backend)*

## 🎨 Características de Diseño

- **Diseño Responsive:** Adaptable a dispositivos móviles, tablets y escritorio
- **Colores temáticos:** Verde, blanco y rojo (colores de Italia)
- **Animaciones CSS:** Transiciones suaves y efectos hover
- **Fuentes personalizadas:** Tipografía elegante y legible
- **Formularios validados:** Validación en tiempo real de datos del usuario

## 📱 Responsive Design

El sitio es completamente responsive con breakpoints en:
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🔧 Funcionalidades Principales

### Formulario de Reservas
- Validación de campos en tiempo real
- Envío asíncrono al backend (sin recargar la página)
- Mensajes de confirmación/error
- Generación de código único de reserva

### Filtro de Platillos
- Filtrado dinámico por categoría
- Transiciones suaves al mostrar/ocultar platillos
- Botón "Todos" para mostrar el menú completo

### Panel de Administración
- CRUD completo de reservas
- Filtros y búsqueda en tiempo real
- Modales para edición y visualización
- Estadísticas actualizadas automáticamente

## 🌐 Navegación

- **Inicio:** Sección hero con video
- **Sobre Nosotros:** Historia del restaurante
- **Menú:** Catálogo de platillos
- **Chef:** Equipo de cocina
- **Contacto:** Formulario de reservas
- **Login:** Acceso administrativo

## 🔐 Seguridad

- Validación de datos en frontend y backend
- Sanitización de inputs HTML
- Gestión de sesiones para área administrativa
- Credenciales no almacenadas en el frontend

## 📞 Información de Contacto

- **Ubicación:** Via Roma 123, Ciudad
- **Teléfono:** +34 123 456 789
- **Email:** info@ristoranteitalini.com
- **Horario:** Lun-Dom: 12:00 - 23:00

## 🤝 Contribuciones

Para contribuir a este proyecto:
1. Mantén el código limpio y comentado
2. Respeta la arquitectura sin frameworks
3. Prueba en múltiples navegadores
4. Asegura la compatibilidad responsive

## 📄 Licencia

Este proyecto es parte de un trabajo académico de **Desarrollo Web**.

## 👨‍💻 Autor

Desarrollado como parte del curso de **MATERIA_DESARROLLO-WEB**

---

**¡Buon Appetito! 🇮🇹**
