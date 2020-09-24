module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    request.yar.reset()
    return h.view('eoi')
  }
}
