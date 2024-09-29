const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Verifica que la ruta sea correcta
const Restriction = require('../models/Restriction');
const EntityFactory = require('../factory/EntityFactory');

// 1. Crear estudiante usando Factory Method
router.post('/students', async (req, res) => {
    try {
        const studentData = EntityFactory.createEntity('Student', req.body);
        const newStudent = new Student(studentData);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Crear restricción usando Factory Method
router.post('/restrictions', async (req, res) => {
    try {
        const restrictionData = EntityFactory.createEntity('Restriction', req.body);
        const newRestriction = new Restriction(restrictionData);
        await newRestriction.save();
        res.status(201).json(newRestriction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Crear calificación usando Factory Method
router.post('/grades', async (req, res) => {
    try {
        const gradeData = EntityFactory.createEntity('Grade', req.body);
        const student = await Student.findOne({ studentId: req.body.studentId });

        if (!student) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        student.grades.push(gradeData);
        await student.save();

        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Buscar todas las calificaciones y restricciones de un estudiante
router.get('/students/search', async (req, res) => {
    const { studentId, name } = req.query;

    try {
        let students;
        if (studentId) {
            students = await Student.find({ studentId });
        } else if (name) {
            const regex = new RegExp(name, 'i');
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

// 5. Buscar estudiantes por restricción
router.get('/students/restriction/:restrictionId', async (req, res) => {
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

// 6. Buscar estudiantes por rango de calificaciones
router.get('/students/grades', async (req, res) => {
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

module.exports = router;
