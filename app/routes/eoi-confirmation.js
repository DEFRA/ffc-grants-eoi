const wreck = require('@hapi/wreck').defaults({
  json: true
})

module.exports = {
  method: 'GET',
  path: '/eoi-confirmation',
  handler: (request, h) => {
    const confirmationId = Math.floor(Math.random() * 100000000)

    console.log('New application:')
    console.log(`UserID: ${request.yar.get('userId')}`)
    console.log(`Cost: ${request.yar.get('cost')}`)
    console.log(`ConfirmationID: ${confirmationId}`)

    // Send details to eligibility microservice, don't wait for response
    wreck.post('http://ffc-grants-eligibility.ffc-grants/application', {
      payload: JSON.stringify({
        confirmationId: confirmationId,
        cost: request.yar.get('userId'),
        userId: request.yar.get('userId')
      })
    })

    return h.view('eoi-confirmation', {
      output: {
        titleText: 'Application complete',
        html: `Your reference number<br><strong>${confirmationId}</strong>`
      }
    })
  }
}
