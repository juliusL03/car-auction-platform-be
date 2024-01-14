import express from 'express'

import userRoutes from './user'
import productRoutes from './product'
import bidRoutes from './bid'

const router = express.Router()

router.use('/user', userRoutes)
router.use('/product', productRoutes)
router.use('/bid', bidRoutes)

export default router
