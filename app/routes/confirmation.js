const wreck = require('@hapi/wreck').defaults({
  json: true
})

module.exports = {
  method: 'GET',
  path: '/confirmation',
  handler: (request, h) => {
    const confirmationId = Math.floor(Math.random() * 100000000)

    console.log('New application:')
    console.log(`In England: ${request.yar.get('inEngland')}`)
    console.log(`Business Name: ${request.yar.get('businessName')}`)
    console.log(`Email Address: ${request.yar.get('emailAddress')}`)
    console.log(`ConfirmationID: ${confirmationId}`)

    console.log(process.env)

    // Send details to eligibility microservice, don't wait for response
    wreck.post('http://ffc-grants-eligibility.ffc-grants/application', {
      payload: JSON.stringify({
        confirmationId: confirmationId.toString(),
        cost: request.yar.get('cost'),
        userId: request.yar.get('userId')
      })
    })

    return h.view('confirmation', {
      output: {
        titleText: 'Application submitted',
        html: `Your reference number<br><strong>${confirmationId}</strong>`
      }
    })
  }
}
