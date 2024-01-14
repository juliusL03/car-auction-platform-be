import {fileURLToPath} from 'url'
import mongoose from 'mongoose'
import Product from '../../../models/Product'

const __filename = fileURLToPath(import.meta.url)

const deleteProduct = async (payload) => {
	console.log('Invoke #deleteProduct()', payload, __filename)

	const session = await mongoose.startSession()
	session.startTransaction()

	try {
		const response = await Product.findOne({_id: payload.id, deleted_at: null})

		if (!response) {
			const error = 'Product you are trying to delete was not found'

			return {status_code: 400, error}
		}

		await Product.findByIdAndUpdate(payload.id, {
			deleted_at: new Date()
		})
		
		session.commitTransaction()
		session.endSession()

		return {
			status_code: 200,
			success: true
		}
	} catch (error) {
		console.log(error)

		session.abortTransaction()
		session.endSession()

		return {status_code: 400, error: error.message}
	}
}

export default deleteProduct
