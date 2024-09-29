class EntityFactory {
    static createEntity(type, data) {
        switch (type) {
            case 'Student':
                return this.createStudent(data);
            case 'Restriction':
                return this.createRestriction(data);
            case 'Grade':
                return this.createGrade(data);
            default:
                throw new Error(`Entidad desconocida: ${type}`);
        }
    }

    static createStudent(data) {
        const { studentId, name, lastName, email, grades, restrictions } = data;
        return {
            studentId,
            name,
            lastName,
            email,
            grades: grades || [],
            restrictions: restrictions || []
        };
    }

    static createRestriction(data) {
        const { restrictionId, reason, creationDate } = data;
        return {
            restrictionId,
            reason,
            creationDate: creationDate || new Date()
        };
    }

    static createGrade(data) {
        const { subjectName, gradeName, grade, comment, gradeId } = data;
        return {
            subjectName,
            gradeName,
            grade,
            comment,
            gradeId
        };
    }
}

module.exports = EntityFactory;
