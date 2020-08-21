const Hapi = require('@hapi/hapi')

const server = Hapi.server({
  port: process.env.PORT
})

module.exports = server
