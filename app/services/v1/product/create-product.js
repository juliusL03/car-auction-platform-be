import {fileURLToPath} from 'url'
import mongoose from 'mongoose'
import Product from '../../../models/Product'

const __filename = fileURLToPath(import.meta.url)

const createProduct = async (payload) => {
	console.log('Invoke #createProduct()', payload, __filename)

	const session = await mongoose.startSession()
	session.startTransaction()

	try {
		const {brand_name} = payload

		const exist = await Product.findOne({brand_name, deleted_at: null})

		if (exist) {
			const error = `Name "${brand_name}" was already in used`
			return {status_code: 400, error}
		}

		const response = await Product.create(payload)

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

export default createProduct
