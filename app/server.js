const Hapi = require('@hapi/hapi')

const server = Hapi.server({
  port: process.env.PORT
})

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello from Grants Expression of Interest'
  }
})

module.exports = server
