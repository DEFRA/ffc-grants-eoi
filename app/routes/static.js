module.exports = {
  method: 'GET',
  path: '/assets/{path*}',
  options: {
    handler: {
      directory: {
        path: ['app/build']
      }
    },
    cache: {
      privacy: 'private'
    }
  }
}
