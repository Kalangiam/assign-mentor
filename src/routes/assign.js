import express from 'express'
import assignControllers from '../controllers/assign.js'

const router = express.Router()

router.post('/mentors', assignControllers.mentor)
router.post('/students', assignControllers.student)
router.post('/assign-mentor/:mentorId/:studentId', assignControllers.assignMentor)
router.post('/add-students/:mentorId', assignControllers.assignStudent)
router.put('/change-mentor/:studentId/:newMentorId', assignControllers.select)
router.get('/mentor-students/:mentorId', assignControllers.allStudents)
router.get('/previous-mentor/:studentId', assignControllers.previousMentor)

export default router