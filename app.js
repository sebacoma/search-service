const express = require('express');
const mongoose = require('mongoose');

const searchRoutes = require('./routes/searchRoutes'); // Importa las rutas

const app = express();
app.use(express.json());


mongoose.connect('mongodb+srv://Arqui_1:Arqui_1@cluster0.dfrzdkk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conexión exitosa a MongoDB Atlas'))
.catch((error) => console.error('Error de conexión:', error));

// Usar las rutas importadas
app.use('/api', searchRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
