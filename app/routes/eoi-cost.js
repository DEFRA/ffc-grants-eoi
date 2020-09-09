module.exports = {
  method: 'GET',
  path: '/eoi-cost',
  handler: (request, h) => {
    return h.view('eoi-cost',
      {
        test: 'Hello EOI cost'
      }
    )
  }
}
