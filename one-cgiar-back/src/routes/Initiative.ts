import { Router } from 'express'
import { getInitiatives, createInitiative, getInitiativesByUserId } from '../controllers/Initiative'

const router = Router()

// get all initiatives
router.get('/initiatives', getInitiatives);

// create an initiative
router.post('/initiatives', createInitiative);

// get an initiative by user
router.get('/initiatives-by-user/:id', getInitiativesByUserId);

export default router;