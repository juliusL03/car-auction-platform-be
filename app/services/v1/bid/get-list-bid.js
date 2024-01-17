import {fileURLToPath} from 'url'
import Bid from '../../../models/Bid'
import User from '../../../models/User'

const __filename = fileURLToPath(import.meta.url)

const getListBid = async (payload) => {
	console.log('Invoke #getListBid()', payload, __filename)

	try {
		const {page, limit, sort, order, description_like, user_id} = payload

		let condition = {deleted_at: null}

		if (description_like) {
			condition = {...condition, description_like}
		}

		const user = await User.findOne({_id: user_id})

		if (user_id && user.user_type !== 'admin') {
			condition = {...condition, user_id}
		}

		const response = await Bid.find(condition).sort({[sort]: order === 'asc' ? 1 : -1}).skip((page - 1) * limit).limit(limit).populate('product')

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

export default getListBid
