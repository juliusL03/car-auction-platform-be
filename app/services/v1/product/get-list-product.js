import {fileURLToPath} from 'url'
import Product from '../../../models/Product'

const __filename = fileURLToPath(import.meta.url)

const getListProduct = async (payload) => {
	console.log('Invoke #getListProduct()', payload, __filename)

	try {
		const {page, limit, sort, order, description_like} = payload

		let condition = {deleted_at: null}

		if (description_like) {
			condition = {...condition, description_like}
		}

		const response = await Product.find(condition).sort({[sort]: order === 'asc' ? 1 : -1}).skip((page - 1) * limit).limit(limit)

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

export default getListProduct
