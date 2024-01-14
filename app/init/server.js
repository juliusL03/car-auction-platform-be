import http from 'http'
import cluster from 'cluster'
import os from 'os'
import {fileURLToPath} from 'url'
import express from 'express'
import {types} from '../utils'
import * as db from '../models'

import init from './init'

const __filename = fileURLToPath(import.meta.url)
const CPUcores = os.cpus().length

const {Environment} = types

export const setupServer = async (serverPort) => {
	const app = express()
	let server

	if (cluster.isPrimary && ![process.env.DEV, Environment.LOCAL, Environment.TEST].includes(process.env.NODE_ENV)) {
		for (let i = 0; i < CPUcores; i += 1) {
			cluster.fork()
		}

		cluster.on('online', (worker) => {
			console.log(`Worker ${worker.process.pid} is online.`, null, __filename)
		})

		cluster.on('exit', (worker) => {
			console.log(`worker ${worker.process.pid} died.`, null, __filename)
		})
	} else {
		await db.connect()
		await init(app)

		const port = serverPort || process.env.PORT || '3000'

		app.set('port', port)

		// Create HTTP server.
		server = http.Server(app)

		// Listen on provided port, on all network interfaces.
		server.listen(port)

		server.on('error', (error) => {
			if (error.syscall !== 'listen') {
				throw error
			}

			const bind = typeof port === 'string'
				? `Pipe ${port}`
				: `Port ${port}`

			// handle specific listen errors with friendly messages
			switch (error.code) {
				case 'EACCES':
					console.log(`${bind} requires elevated privileges`)
					process.exit(1)
					break
				case 'EADDRINUSE':
					console.logr(`${bind} is already in use`)
					process.exit(1)
					break
				default:
					console.log('error here...', error)
					throw error
			}
		})

		server.on('listening', () => {
			const addr = server.address()
			const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
			console.log(`Server is listening on ${bind}`)
		})
	}

	return {
		app,
		server
	}
}

export default setupServer
