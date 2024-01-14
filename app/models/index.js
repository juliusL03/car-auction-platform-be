import {connect as connectDb, disconnect as disconnectDb, set} from 'mongoose'

import UserModel from './User'
import ProductModel from './Product'
import {dbUrl} from '../utils/constance'

set('strictQuery', true)

export const User = UserModel
export const Product = ProductModel

export const connect = async () => {
	await connectDb(dbUrl)
}

export const disconnect = async () => disconnectDb()
