import { Router } from 'express'
import { getInitiatives, createInitiative, getInitiativesByUserId } from '../controllers/Initiative'

const router = Router()

// get all users
router.get('/initiatives', getInitiatives);

// create an user
router.post('/initiatives', createInitiative);

router.get('/initiatives-by-user/:id', getInitiativesByUserId);

export default router;