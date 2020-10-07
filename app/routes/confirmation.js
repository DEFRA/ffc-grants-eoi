module.exports = {
  method: 'GET',
  path: '/confirmation',
  handler: async (request, h) => {
    const confirmationId = Math.floor(Math.random() * 100000000)

    console.log('New application:')
    console.log(`In England: ${request.yar.get('inEngland')}`)
    console.log(`Business Name: ${request.yar.get('businessName')}`)
    console.log(`Email Address: ${request.yar.get('emailAddress')}`)
    console.log(`ConfirmationID: ${confirmationId}`)

    const messageService = await require('./services/message-service')

    try {
      await messageService.publishEOI(
        JSON.stringify({
          confirmationId: confirmationId.toString(),
          cost: request.yar.get('cost'),
          userId: request.yar.get('userId')
        })
      )
    } catch (err) {
      return h.view('confirmation', {
        output: {
          titleText: 'EOI not submitted',
          html: 'Error sending EOI'
        }
      })
    }

    return h.view('confirmation', {
      output: {
        titleText: 'EOI submitted',
        html: `Your reference number<br><strong>${confirmationId}</strong>`
      }
    })
  }
}
