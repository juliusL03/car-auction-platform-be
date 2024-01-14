import express from 'express'

import * as ProductController from '../../controllers/product'
import {protectRoute} from '../../utils/middleware'

const router = express.Router()

router.post('/create', protectRoute, ProductController.create)
router.patch('/update/:id', protectRoute, ProductController.update)
router.delete('/:id', protectRoute, ProductController.remove)
router.get('/:id', ProductController.retrieve)
router.get('/filter/:page/:limit/:description_like/:sort/:order', ProductController.list)

export default router
