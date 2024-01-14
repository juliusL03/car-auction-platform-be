import {model, Schema} from 'mongoose'

const addressInfo = {
	billing: Boolean,
	default: Boolean,
	street_name: String,
	house_number: Number,
	zip_code: String,
	city: String,
	country: String
}

export const userSchema = new Schema(
	{
		full_name: {
			type: String,
			required: [true, 'Field `full name` is required']
		},
		email: {
			type: String,
			required: [true, 'Field `email` is required']
		},
		phone_number: {
			type: String,
			required: [true, 'Field `phone number` is required']
		},
		user_type: {
			type: String,
			required: [true, 'Field `user type` is required'],
			enum: ['user', 'admin']
		},
		password: {
			type: String,
			required: [true, 'Field `password` is required']
		},
		salt: {
			type: String,
			required: [true, 'Field `salt` is required']
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
)

export default model('User', userSchema)
