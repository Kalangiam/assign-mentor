import mentorModel from "../models/mentor";
import studentModel from "../models/student";


const mentor = async (req, res) => {
    try {
        const mentor = await mentorModel.create(req.body);
        res.json({ message: 'Mentor created successfully', mentor });
    } catch (error) {
        res.status(500).json({ message: 'Error creating mentor', error });
    }
};


const student = async (req, res) => {
    try {
        const student = await studentModel.create(req.body);
        res.json({ message: 'Student created successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error });
    }
};


const assignStudent = async (req, res) => {
    const { mentorId, studentId } = req.params;
    try {
        const mentor = await mentorModel.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        const student = await studentModel.findByIdAndUpdate(studentId, { mentor: mentorId }, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        mentor.students.push(studentId);
        await mentor.save();
        res.json({ message: 'Student assigned to mentor successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning mentor to student', error });
    }
};


const select = async (req, res) => {
    const { mentorId } = req.params;
    try {
        const mentor = await mentorModel.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        const newStudents = await Student.create(req.body);
        newStudents.forEach(async student => {
            student.mentor = mentorId;
            mentor.students.push(student._id);
            await student.save();
        });
        await mentor.save();
        res.json({ message: 'Students added to mentor successfully', students: newStudents });
    } catch (error) {
        res.status(500).json({ message: 'Error adding students to mentor', error });
    }
};


const assignMentor = async (req, res) => {
    const { studentId, newMentorId } = req.params;
    try {
        const student = await studentModel.findByIdAndUpdate(studentId, { mentor: newMentorId }, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Mentor assigned/changed successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning/changing mentor', error });
    }
};


const allStudents = async (req, res) => {
    const { mentorId } = req.params;
    try {
        const mentor = await Mentor.findById(mentorId).populate('students');
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.json({ mentorId, students: mentor.students });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving mentor students', error });
    }
};

const previousMentor = async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const previousMentor = await Mentor.findById(student.mentor);
        res.json({ studentId, previousMentor });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving previous mentor', error });
    }
};


export default {
    mentor,
    student,
    assignStudent,
    assignMentor,
    allStudents,
    select,
    previousMentor
}