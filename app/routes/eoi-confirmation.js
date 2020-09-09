module.exports = {
  method: 'GET',
  path: '/eoi-confirmation',
  handler: (request, h) => {
    const model = {
      output: {
        userId: request.yar.get('userId'),
        cost: request.yar.get('cost')
      }
    }

    console.log(model)
    return h.view('eoi-confirmation', model)
  }
}
