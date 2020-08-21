const createServer = require('./server')

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

const initialise = async () => {
  const server = await createServer()
  await server.start()
}

initialise()
