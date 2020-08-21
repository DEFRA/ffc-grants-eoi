const server = require('./server')
const nunjucks = require('nunjucks')
const vision = require('@hapi/vision')
const path = require('path')
const inert = require('@hapi/inert')

const init = async () => {
  await server.register(inert) // Required for static files
  await server.register(vision)

  // FIXME: list the routes dir and add each element in list
  const routes = [].concat(
    require('./routes/eoi'),
    require('./routes/healthy'),
    require('./routes/healthz'),
    require('./routes/home'),
    require('./routes/static')
  )

  server.route(routes)

  server.views({
    engines: {
      njk: {
        compile: (src, options) => {
          const template = nunjucks.compile(src, options.environment)

          return (context) => {
            return template.render(context)
          }
        }
        // prepare: (options, next) => {
        //   options.compileOptions.environment = Nunjucks.configure([
        //     'app/templates',
        //     'node_modules/govuk-frontend/'
        //   ], {})
        //   return next()
        // }
      }
    },
    relativeTo: __dirname,
    compileOptions: {
      environment: nunjucks.configure([
        path.join(__dirname, 'templates'),
        'node_modules/govuk-frontend/'
      ])
    },
    path: './templates'
  })

  await server.start()
  console.log('Server up and running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
