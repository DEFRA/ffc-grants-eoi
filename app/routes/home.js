module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.response('Hello from Grants Expressions of Interest').code(200)
  }
}
