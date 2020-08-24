module.exports = {
  method: 'GET',
  path: '/eoi',
  handler: (request, h) => {
    return h.view('eoi',
      {
        test: 'Hello EOI'
      }
    )
  }
}
