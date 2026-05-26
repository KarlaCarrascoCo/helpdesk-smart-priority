# HelpDesk Smart Priority

Sistema web de gestión de tickets desarrollado con Node.js, Express y JavaScript, diseñado para administrar incidencias de soporte técnico utilizando un sistema inteligente de priorización automática.

---

# Características principales

- CRUD completo de tickets
- Sistema de prioridades automáticas
- Login con autenticación
- Middleware de protección de rutas
- Frontend conectado con Fetch API
- Persistencia de datos en JSON
- Diseño moderno y responsivo
- Visualización de prioridades por colores
- Registro de fecha y hora de creación
- Manejo de errores HTTP

---

# Arquitectura del proyecto

El proyecto fue desarrollado utilizando arquitectura por capas para separar responsabilidades y facilitar el mantenimiento del código.

## Estructura

```bash
src/
│
├── controllers/
├── routes/
├── services/
├── middlewares/
├── data/
├── public/
└── app.js
```

---

# Tecnologías utilizadas

## Backend

- Node.js
- Express.js

## Frontend

- HTML5
- CSS3
- JavaScript Vanilla

## Persistencia

- JSON
- File System (fs)

## Herramientas

- Git
- GitHub
- Postman / Thunder Client
- VS Code

---

# CRUD implementado

| Operación | Método HTTP | Endpoint |
|---|---|---|
| Crear ticket | POST | /tickets |
| Obtener tickets | GET | /tickets |
| Actualizar ticket | PUT | /tickets/:id |
| Eliminar ticket | DELETE | /tickets/:id |

---

# Sistema de prioridades

La prioridad del ticket se calcula automáticamente considerando:

- Impacto del problema
- Urgencia
- Categoría
- Tiempo estimado de solución

## Niveles

| Prioridad | Color |
|---|---|
| Baja | Verde |
| Media | Amarillo |
| Alta | Naranjo |
| Crítica | Rojo |

---

# Seguridad implementada

El sistema utiliza middleware de autenticación para proteger rutas sensibles.

## Token utilizado

```txt
token-seguro-123
```

## Funcionalidades protegidas

- Crear tickets
- Actualizar tickets
- Eliminar tickets

Si el token no es válido, el sistema responde:

```json
{
  "error": "Acceso no autorizado"
}
```

---

# Validaciones implementadas

El sistema valida:

- Campos obligatorios
- Acceso autorizado
- Existencia de tickets
- Manejo de errores HTTP
- Restricción de tiempos negativos

---

# Persistencia de datos

La información se almacena en:

```txt
src/data/tickets.json
```

Se utiliza:

```js
fs.readFileSync()
fs.writeFileSync()
```

como alternativa controlada de base de datos.

---

# Instalación del proyecto

## Clonar repositorio

```bash
git clone https://github.com/KarlaCarrascoCo/helpdesk-smart-priority.git
```

---

## Instalar dependencias

```bash
npm install
```

---

## Ejecutar servidor

```bash
npm start
```

Servidor:

```txt
http://localhost:3000
```

---

# Credenciales de acceso

## Usuario

```txt
karla
```

## Contraseña

```txt
1234
```

---

# Flujo del sistema

1. Iniciar sesión.
2. Crear ticket.
3. Sistema calcula prioridad automáticamente.
4. Ticket queda registrado.
5. Se puede actualizar o eliminar.
6. Los tickets se almacenan en JSON.

---

# Evidencias implementadas

- Arquitectura por capas
- CRUD REST completo
- Manejo de errores HTTP
- Middleware de autenticación
- Frontend funcional
- Integración Fetch API
- Persistencia JSON
- GitHub con control de versiones
- README técnico
- Diseño responsivo

---

# Seguridad HTTPS

## ¿Qué es HTTPS?

HTTPS (HyperText Transfer Protocol Secure) es una versión segura del protocolo HTTP que utiliza cifrado SSL/TLS para proteger la comunicación entre el cliente y el servidor.

## ¿Qué riesgos ayuda a mitigar?

HTTPS ayuda a prevenir:

- Robo de información sensible.
- Interceptación de datos por terceros.
- Ataques Man in the Middle (MITM).
- Modificación maliciosa de información transmitida.

## ¿Por qué es importante en aplicaciones web?

HTTPS es importante porque protege la privacidad y seguridad de los usuarios al cifrar la información enviada entre navegador y servidor. Esto evita que terceros puedan acceder a credenciales, formularios o datos sensibles.

Además, mejora la confianza del usuario y ayuda a prevenir ataques de seguridad comunes en aplicaciones web.

---

# Autor

Proyecto desarrollado para la asignatura Programación Web.

- Institución: IP Santo Tomás
- Carrera: Analista Programador
- Profesor: Francisco Correa O.
- Estudiante: Karla Carrasco C.

---

Proyecto desarrollado para la asignatura Programación Web - IP Santo Tomás.