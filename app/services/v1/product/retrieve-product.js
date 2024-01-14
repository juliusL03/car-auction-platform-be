import {fileURLToPath} from 'url'
import Product from '../../../models/Product'

const __filename = fileURLToPath(import.meta.url)

const retrieveProduct = async (payload) => {
	console.log('Invoke #retrieveProduct()', payload, __filename)

	try {
		const response = await Product.findOne({
			_id: payload.id,
			deleted_at: null
		})

		if (!response) {
			const error = 'Cannot find Product'

			return {status_code: 400, error}
		}
		
		return {
			status_code: 200,
			success: true,
			data: response
		}
	} catch (error) {
		console.log(error)

		return {status_code: 400, error: error.message}
	}
}

export default retrieveProduct
