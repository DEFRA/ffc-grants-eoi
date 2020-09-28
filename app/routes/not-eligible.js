module.exports = {
  method: 'GET',
  path: '/not-eligible',
  handler: (request, h) => {
    return h.view('not-eligible')
  }
}
