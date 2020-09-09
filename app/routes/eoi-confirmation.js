module.exports = {
  method: 'POST',
  path: '/eoi-confirmation',
  handler: (request, h) => {
    return h.view('eoi-confirmation',
      {
        test: 'Hello EOI'
      }
    )
  }
}
