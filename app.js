const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Restriction = require('./models/Restriction');

const app = express();
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://Arqui_1:Arqui_1@cluster0.mongodb.net/search-service?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conexión exitosa a MongoDB Atlas'))
.catch((error) => console.error('Error de conexión:', error));

// 1. Buscar todas las calificaciones y restricciones de un estudiante (por ID o nombre)
app.get('/students/search', async (req, res) => {
    const { studentId, name } = req.query;

    try {
        let students;
        if (studentId) {
            students = await Student.find({ studentId });
        } else if (name) {
            const regex = new RegExp(name, 'i'); // Búsqueda insensible a mayúsculas
            students = await Student.find({ name: regex });
        }

        if (!students || students.length === 0) {
            return res.status(404).json({ message: 'No se encontraron estudiantes' });
        }

        res.json(students.map(student => ({
            studentId: student.studentId,
            name: `${student.name} ${student.lastName}`,
            email: student.email,
            grades: student.grades,
            restrictions: student.restrictions
        })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Buscar estudiantes por restricción
app.get('/students/restriction/:restrictionId', async (req, res) => {
    const { restrictionId } = req.params;

    try {
        const students = await Student.find({ restrictions: restrictionId });

        if (students.length === 0) {
            return res.status(404).json({ message: 'No se encontraron estudiantes con esta restricción' });
        }

        res.json(students.map(student => ({
            studentId: student.studentId,
            name: `${student.name} ${student.lastName}`,
            email: student.email,
            restrictions: student.restrictions
        })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Buscar estudiantes por rango de calificaciones
app.get('/students/grades', async (req, res) => {
    const { minGrade, maxGrade } = req.query;
    const query = {};

    if (minGrade) query['grades.grade'] = { $gte: Number(minGrade) };
    if (maxGrade) query['grades.grade'] = { ...query['grades.grade'], $lte: Number(maxGrade) };

    try {
        const students = await Student.find(query);

        if (students.length === 0) {
            return res.status(404).json({ message: 'No se encontraron estudiantes dentro del rango de calificaciones' });
        }

        res.json(students.map(student => ({
            studentId: student.studentId,
            name: `${student.name} ${student.lastName}`,
            email: student.email,
            grades: student.grades
        })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
