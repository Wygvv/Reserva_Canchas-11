# Reserva de Canchas — Proyecto #11

Aplicación web para gestionar y reservar canchas deportivas. Los usuarios pueden ver canchas disponibles, hacer reservas y administrar sus agendas.

---

## Estructura del repositorio

```
reserva-canchas/
├── API/                    # Backend Node.js + Express
│   ├── config/             # Configuración de BD (Sequelize)
│   ├── models/             # Modelos Sequelize (Cancha, Reserva, Usuario)
│   ├── migrations/         # Migraciones de base de datos
│   ├── routes/             # Rutas Express
│   ├── middlewares/        # Auth JWT y manejo errores
│   └── index.js            # Entry point del servidor
├── client/                 # Frontend HTML/CSS/JS
│   ├── pages/              # Páginas HTML
│   ├── css/                # Estilos
│   └── js/                 # Scripts del cliente
├── docs/                   # Documentación y Postman
├── .env.example            # Variables de entorno (plantilla)
└── README.md               # Este archivo
```

---

## Requisitos previos

- Node.js v18+
- PostgreSQL 14+
- npm

---

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone <URL_REPO>
cd reserva-canchas
```

### 2. Configurar variables de entorno

```bash
cd API
cp ../.env.example .env
# Editar .env con tus credenciales de PostgreSQL
```

### 3. Instalar dependencias

```bash
cd API
npm install
```

### 4. Crear la base de datos

```bash
# En PostgreSQL
createdb reserva_canchas
```

### 5. Ejecutar migraciones

```bash
cd API
npx sequelize-cli db:migrate
```

### 6. (Opcional) Poblar con datos de prueba

```bash
npx sequelize-cli db:seed:all
```

### 7. Iniciar el servidor

```bash
npm run dev
# Servidor en http://localhost:3000
```

### 8. Abrir el frontend

Abrir `client/pages/index.html` en un navegador, o usar Live Server en VS Code.

---

### Producción

- **API + BD**: Railway — `https://reserva-canchas-api.up.railway.app`
- **Frontend**: Netlify / Vercel — (pendiente deploy Hito 3)

---

## Requisitos implementados

| ID | Título | Estado |
|----|--------|--------|
| GEN-01 | Estructura del repositorio y README | ✅ |
| GEN-02 | Variables de entorno y .env.example | ✅ |
| GEN-03 | Conexión a BD y migraciones Sequelize | ✅ |
| rq-01 | Modelo Cancha | ✅ |
| rq-02 | Modelo Reserva (relación) | ✅ |
| GEN-04 | Registro de usuario | 🔄 Hito 2 |
| GEN-05 | Login y JWT | 🔄 Hito 2 |
| GEN-06 | Middleware autenticación | 🔄 Hito 2 |
| ... | ... | ... |

---

## Autor

- Alumno: David Soto
- Proyecto: #11 — Reserva de Canchas
- Curso: Desarrollo Web
