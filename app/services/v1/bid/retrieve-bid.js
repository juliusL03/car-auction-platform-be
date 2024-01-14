import {fileURLToPath} from 'url'
import Bid from '../../../models/Bid'

const __filename = fileURLToPath(import.meta.url)

const retrieveBid = async (payload) => {
	console.log('Invoke #retrieveBid()', payload, __filename)

	try {
		const response = await Bid.findOne({
			_id: payload.id,
			deleted_at: null
		})

		if (!response) {
			const error = 'Cannot find Bid'

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

export default retrieveBid
