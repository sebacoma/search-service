const mongoose = require('mongoose');
const Grade = require('./Grade'); // Importamos el modelo de Grade

const studentSchema = new mongoose.Schema({
    studentId: String, // UUID v4
    name: String,
    lastName: String,
    email: String,
    grades: [Grade.schema], // Usamos el schema de Grade
    restrictions: [String] // IDs de las restricciones
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
