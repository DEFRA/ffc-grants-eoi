const wreck = require('@hapi/wreck').defaults({
  json: true
})

module.exports = [
  {
    method: 'POST',
    path: '/load-application',
    options: {
      handler: async (request, h) => {
        try {
          const { payload } = await wreck.get(`http://${process.env.ELIGIBILITY_URL}/application?confirmationId=${request.payload.application}`)

          const yarKeys = ['inEngland', 'businessName']

          for (const [key, value] of Object.entries(payload)) {
            if (yarKeys.includes(key)) {
              request.yar.set(key, value)
            }
          }

          const nextPage = payload.businessName ? './contact-details' : './business'
          return h.redirect(nextPage)
        } catch (err) {
          return h.view('not-found', {
            errorMessage: { titleText: `Application with confirmation ID ${request.payload.application} not found` }
          })
        }
      }
    }
  }
]
