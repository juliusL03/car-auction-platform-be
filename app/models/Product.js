import mongoose, {model, Schema} from 'mongoose'

export const productSchema = new Schema(
	{
		model: {
			type: String,
			required: [true, 'Field `model` is required']
		},
		year: {
			type: Number,
			required: [true, 'Field `year` is required']
		},
		color: {
			type: String
		},
		mileage: {
			type: String
		},
		images: {
			type: [String]
		},
		status: {
			type: String,
			enum: ['active', 'inactive']
		},
		start_bid: {
			type: Number
		},
		current_bid: {
			type: Number
		},
		expiry_date: {
			type: Date
		},
		deleted_at: {
			type: Date,
			default: null
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
)

export default model('Product', productSchema)
