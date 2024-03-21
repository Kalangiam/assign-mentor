
import mongoose from './index.js'

const studentSchema = new mongoose.Schema({
    name: String,
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }
})

const studentModel = mongoose.model('student', studentSchema)

export default studentModel

