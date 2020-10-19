const pageName = 'progress-reference'

module.exports = [
  {
    method: 'GET',
    path: `/${pageName}`,
    handler: async (request, h) => {
      const confirmationId = `${Math.floor(Math.random() * 100000000)}`
      const messageService = await require('../services/message-service')

      try {
        await messageService.publishEOI(
          JSON.stringify({
            confirmationId: confirmationId,
            inEngland: request.yar.get('inEngland') === 'yes'
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

      return h.view('progress-reference', {
        backLink: '/',
        progressReference: confirmationId
      })
    }
  }
]
