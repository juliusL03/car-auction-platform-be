import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import express from 'express'
import cors from 'cors'
import {types, response} from '../utils'

import apiRoutes from '../apis'
import {applySession} from '../utils/middleware'

const {Environment} = types

const __dirname = dirname(fileURLToPath(import.meta.url))

const loadExpress = async (app) => {
	try {
		app.use(express.json({
			limit: '3mb'
		}))

		app.use(
			express.urlencoded({
				extended: true,
				limit: '3mb',
				parameterLimit: 10000
			})
		)

		const corsOptions = {
			credentials: true,
			origin: true,
			maxAge: 31536000000000,
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
			allowedHeaders: ['Content-Type, Authorization, Origin, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, Range']
		}

		app.use(cors(corsOptions))

		app.use(express.static(path.join(__dirname, '../public/')))

		applySession(app)

		if (!process.env.WEB_APP_BASE_URL.includes('localhost')) {
			app.set('trust proxy', 1)
		}

		app.use(apiRoutes)

		app.use((req, res) => {
			res.status(404).send(`Not found - ${req.path}`)
		})

		if ([Environment.DEV, Environment.LOCAL, Environment.TEST].includes(process.env.NODE_ENV)) {
			console.log(`Running in development mode for ${process.env.NODE_ENV} enviroment.`)

			app.use((err, req, res) => {
				res.status(err.status || 500)
				console.log(err.message, err, __filename)

				return res.send(response(false, err, [err.message]))
			})
		}

		app.use((err, req, res) => {
			console.log(err)
			return res.status(err.status || 500).send(err)
		})
	} catch (e) {
		console.log('Error', e)
		throw e
	}
}

export default loadExpress
