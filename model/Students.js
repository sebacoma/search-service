// models/Student.js
const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    subjectName: String,
    gradeName: String,
    grade: Number,
    comment: String,
    gradeId: String
});

const studentSchema = new mongoose.Schema({
    studentId: String, // UUID v4
    name: String,
    lastName: String,
    email: String,
    grades: [gradeSchema],
    restrictions: [String] // Store restriction IDs
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;

// models/Restriction.js
const mongoose = require('mongoose');

const restrictionSchema = new mongoose.Schema({
    restrictionId: String, // UUID v4
    reason: String,
    creationDate: Date
});

const Restriction = mongoose.model('Restriction', restrictionSchema);
module.exports = Restriction;
