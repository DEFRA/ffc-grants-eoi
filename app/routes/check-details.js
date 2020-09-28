function createModel (applicationDetails) {
  return {
    details: {
      rows: [
        {
          key: {
            text: 'Application ID'
          },
          value: {
            text: applicationDetails.applicationId
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
    handler: (request, h) => {
      // FIXME: retrieve application details
      const foundApplication = true

      if (foundApplication) {
        const applicationDetails = {
          applicationId: '1234',
          businessName: 'My Lovely Business',
          emailAddress: 'me@me.com',
          inEngland: true
        }
        return h.view('check-details', createModel(applicationDetails))
      }

      return h.view('not-found', {
        errorMessage: { titleText: `Application ${request.query.applicationId} not found` }
      })
    }
  }
]
