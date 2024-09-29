const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    subjectName: String,
    gradeName: String,
    grade: Number,
    comment: String,
    gradeId: String // UUID v4
});

const Grade = mongoose.model('Grade', gradeSchema);
module.exports = Grade;
