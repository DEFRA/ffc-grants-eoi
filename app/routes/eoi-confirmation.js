module.exports = {
  method: 'GET',
  path: '/eoi-confirmation',
  handler: (request, h) => {
    const confirmationId = Math.floor(Math.random() * 100000000)

    // console.log(`UserID: ${request.yar.get('userId')}`)
    // console.log(`Cost: ${request.yar.get('cost')}`)
    // console.log(`ConfirmationID: ${confirmationId}`)

    return h.view('eoi-confirmation', {
      output: {
        titleText: 'Application complete',
        html: `Your reference number<br><strong>${confirmationId}</strong>`
      }
    })
  }
}
