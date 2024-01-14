import {fileURLToPath} from 'url'
import * as services from '../../services/v1/bid'
import {handleError} from '../../utils'

const __filename = fileURLToPath(import.meta.url)

export const list = async (req, res) => {
	const errLocation = `${__filename} #CtrGetListBid()`

	try {
		const response = await services.getListBid({...req.params})

		const {status_code: statusCode, message, data, error} = response
		
		if (statusCode !== 200) {
			return res.status(statusCode).send({success: false, status_code: statusCode, message, error})
		}

		return res.status(statusCode).send({
			success: true,
			status_code: statusCode,
			data
		})
	} catch (err) {
		return handleError(err, res, {
			printTrace: true,
			useUUID: true,
			errLocation
		})
	}
}

export default list
