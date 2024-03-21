
import mongoose from './index.js'

const mentorSchema = new mongoose.Schema({
    name: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
})

const mentorModel = mongoose.model('mentors', mentorSchema)

export default mentorModel

