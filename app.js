// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Rutas
const searchRoutes = require('./routes/search');
app.use('/api/search', searchRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
