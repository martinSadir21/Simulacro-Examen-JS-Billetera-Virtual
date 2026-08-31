const express = require('express');
const cors = require('cors');
const path = require('path');
const financialData = require('./data/cotizaciones.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.send('Servidor de Billetera Virtual corriendo. Tasas en /api/cotizaciones');
});

// Obtener cotizaciones de conversión
app.get('/api/cotizaciones', (req, res) => {
  res.json(financialData.tasas);
});

// Obtener contactos frecuentes
app.get('/api/contactos', (req, res) => {
  res.json(financialData.contactos);
});

// Simular endpoint de validación de transferencia
app.post('/api/transferir', (req, res) => {
  const { monto, destinatario, saldoActual } = req.body;
  const numMonto = Number(monto);
  const numSaldo = Number(saldoActual);

  if (Number.isNaN(numMonto) || numMonto <= 0) {
    return res.status(400).json({ error: 'El monto debe ser un valor positivo' });
  }

  if (numMonto > numSaldo) {
    return res.status(400).json({ error: 'Saldo insuficiente para realizar la transferencia' });
  }

  if (!destinatario || destinatario.trim() === '') {
    return res.status(400).json({ error: 'Debe ingresar un destinatario o alias válido' });
  }

  return res.json({
    exito: true,
    mensaje: `Transferencia de $${numMonto.toFixed(2)} a ${destinatario} realizada con éxito`,
    nuevoSaldo: numSaldo - numMonto,
  });
});

app.use('/data', express.static(path.join(__dirname, 'data')));

app.listen(PORT, () => {
  console.log(`Servidor de Billetera Virtual escuchando en http://localhost:${PORT}`);
  console.log(`API Cotizaciones: http://localhost:${PORT}/api/cotizaciones`);
});
