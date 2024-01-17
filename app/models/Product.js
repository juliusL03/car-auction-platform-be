import mongoose, {model, Schema} from 'mongoose'

export const productSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Field `user` is required']
		},
		brand_name: {
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
			type: String
		},
		status: {
			type: String,
			enum: ['active', 'inactive']
		},
		start_bid: {
			type: Number
		},
		current_bid: {
			type: String
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
