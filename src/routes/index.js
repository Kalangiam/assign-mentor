import express from "express"
import IndexController from '../controllers/index.js'
import assignRoutes from '../routes/assign.js'

const router = express.Router();

router.get('/', IndexController.home)
router.use('/assign', assignRoutes)


export default router