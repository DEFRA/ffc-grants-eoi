const wreck = require('@hapi/wreck').defaults({
  json: true
})

function createModel (applicationDetails) {
  return {
    details: {
      rows: [
        {
          key: {
            text: 'Confirmation ID'
          },
          value: {
            text: applicationDetails.confirmationIdId
          }
        },
        {
          key: {
            text: 'Business name'
          },
          value: {
            text: applicationDetails.businessName
          }
        },
        {
          key: {
            text: 'Business in England'
          },
          value: {
            text: applicationDetails.inEngland ? 'Yes' : 'No'
          }
        },
        {
          key: {
            text: 'Email address'
          },
          value: {
            text: applicationDetails.emailAddress
          }
        }
      ]
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/check-details',
    handler: async (request, h) => {
      try {
        const { payload } = await wreck.get(`http://ffc-grants-eligibility.ffc-grants/application?confirmationId=${request.query.confirmationId}`)
        console.log(payload)
      } catch (err) {
        return h.view('not-found', {
          errorMessage: { titleText: `Application with confirmation ID ${request.query.confirmationId} not found` }
        })
      }

      const applicationDetails = {
        confirmationIdId: '1234',
        businessName: 'My Lovely Business',
        emailAddress: 'me@me.com',
        inEngland: true
      }
      return h.view('check-details', createModel(applicationDetails))
    }
  }
]
