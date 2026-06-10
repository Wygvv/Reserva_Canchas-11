// API/index.js
// Entry point del servidor

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const sequelize = require('./config/sequelize');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares globales ──────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const authRoutes = require('./routes/authRoutes');
const canchaRoutes = require('./routes/canchaRoutes');
const reservaRoutes = require('./routes/reservaRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/canchas', canchaRoutes);
app.use('/api/reservas', reservaRoutes);

// ── Rutas (se irán agregando por hito) ───────────────────
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Reserva de Canchas funcionando ✓', version: '1.0.0' });
});

// GEN-08: Manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: true,
    mensaje: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ── Conectar BD y levantar servidor ─────────────────────
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Conexión a MySQL establecida correctamente');
    return app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar con la BD:', err.message);
    process.exit(1);
  });
