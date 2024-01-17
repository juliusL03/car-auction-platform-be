import {fileURLToPath} from 'url'
import mongoose from 'mongoose'
import Bid from '../../../models/Bid'
import Product from '../../../models/Product'

const __filename = fileURLToPath(import.meta.url)

const createUpdateBid = async (payload) => {
	console.log('Invoke #createUpdateBid()', payload, __filename)

	const session = await mongoose.startSession()
	session.startTransaction()

	try {
		const {filter, update} = payload

		// check current bid
		const product = await Product.findOne({_id: filter.product_id})
  
		if (parseInt(update.amount) <= parseInt(product.current_bid)) {
			return {status_code: 400, error: 'Sorry, somebody has bid quicker with this price. Please check the new price'}
		}
	
		const response = await Bid.findOneAndUpdate(filter, update, {
			new: true,
			upsert: true
		})

		await Product.findOneAndUpdate(
			{_id: filter.product_id},
			{current_bid: update.amount},
			{new: true,
				upsert: true}
		)

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
