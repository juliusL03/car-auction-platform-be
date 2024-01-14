import {fileURLToPath} from 'url'
import mongoose from 'mongoose'
import Bid from '../../../models/Bid'

const __filename = fileURLToPath(import.meta.url)

const createUpdateBid = async (payload) => {
	console.log('Invoke #createUpdateBid()', payload, __filename)

	const session = await mongoose.startSession()
	session.startTransaction()

	try {
		const {filter, update} = payload

		const response = await Bid.findOneAndUpdate(filter, update, {
			new: true,
			upsert: true
		})

		const data = await Bid.updateOne(filter, {current_bid: update.amount})
		console.log('#createUpdateBid: ', data)

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

export default createUpdateBid
