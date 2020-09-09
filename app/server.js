const hapi = require('@hapi/hapi')
const nunjucks = require('nunjucks')
const vision = require('@hapi/vision')
const path = require('path')
const inert = require('@hapi/inert')

async function createServer () {
  const server = hapi.server({
    port: process.env.PORT
  })

  await server.register(inert)
  await server.register(vision)

  server.route(require('./routes'))

  server.views({
    engines: {
      njk: {
        compile: (src, options) => {
          const template = nunjucks.compile(src, options.environment)

          return context => template.render(context)
        }
      }
    },
    relativeTo: __dirname,
    compileOptions: {
      environment: nunjucks.configure([
        path.join(__dirname, 'templates'),
        path.join(__dirname, 'assets-dist'),
        'node_modules/govuk-frontend/'
      ])
    },
    path: './templates'
  })

  return server
}

module.exports = createServer
