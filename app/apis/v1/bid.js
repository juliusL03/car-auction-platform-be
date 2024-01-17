import express from 'express'

import * as BidController from '../../controllers/bid'
import {protectRoute} from '../../utils/middleware'

const router = express.Router()

router.post('/create', protectRoute, BidController.create)
router.get('/:id', BidController.retrieve)
router.get('/', BidController.list)

export default router
