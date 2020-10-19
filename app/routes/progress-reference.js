const pageName = 'progress-reference'

module.exports = [
  {
    method: 'GET',
    path: `/${pageName}`,
    handler: async (request, h) => {
      const confirmationId = `${Math.floor(Math.random() * 100000000)}`
      const messageService = await require('../services/message-service')

      const inEngland = request.yar.get('inEngland')
      const businessName = request.yar.get('businessName')
      const emailAddress = request.yar.get('emailAddress')

      try {
        await messageService.publishEOI(
          JSON.stringify({
            confirmationId: confirmationId,
            ...(inEngland ? { inEngland: 'yes' } : {}),
            ...(businessName ? { businessName: businessName } : {}),
            ...(emailAddress ? { emailAddress: emailAddress } : {})
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

      const httpPrefix = process.env.NODE_ENV === 'production' ? 'https' : 'http'
      const magicLink = `${httpPrefix}://${process.env.SITE_URL}/check-details?confirmationId=${confirmationId}`

      return h.view('progress-reference', {
        backLink: '/',
        progressReference: confirmationId,
        magicLink: magicLink
      })
    }
  }
]
