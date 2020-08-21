const initServer = require('./initServer')
const createServer = require('./initServer')

const init = async () => {
  const server = await createServer()
  await server.start()
  console.log('Server up and running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
