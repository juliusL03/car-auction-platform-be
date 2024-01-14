import {fileURLToPath} from 'url'
import mongoose from 'mongoose'
import Product from '../../../models/Product'

const __filename = fileURLToPath(import.meta.url)

const updateProduct = async (payload) => {
	console.log('Invoke #updateProduct()', payload, __filename)

	const session = await mongoose.startSession()
	session.startTransaction()

	try {
		const {filter, data} = payload

		const response = await Product.findOneAndUpdate(filter, data, {new: true})

		if (!response) {
			const error = 'Product you are trying to update was not found'

			return {status_code: 400, error}
		}

		session.commitTransaction()
		session.endSession()

		return {
			status_code: 200,
			success: true,
			data: response
		}
	} catch (error) {
		console.log(error)

		session.abortTransaction()
		session.endSession()

		return {status_code: 400, error: error.message}
	}
}

export default updateProduct
