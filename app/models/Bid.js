import {model, Schema} from 'mongoose'

export const bidSchema = new Schema(
	{
		product_id: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
			required: [true, 'Field `product` is required']
		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Field `user` is required']
		},
		amount: {
			type: Number
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
)

export default model('Bid', bidSchema)
