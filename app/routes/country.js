const Joi = require('joi')

function createModel (errorMessage) {
  return {
    input: {
      classes: 'govuk-radios--inline',
      idPrefix: 'projectCountry',
      name: 'projectCountry',
      fieldset: {
        legend: {
          text: 'Is the planned project in England?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: [
        {
          value: 'yes',
          text: 'Yes'
        },
        {
          value: 'no',
          text: 'No'
        }
      ],
      ...(errorMessage ? { errorMessage: { text: errorMessage } } : {})
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/country',
    handler: (request, h) => h.view('country', createModel(null))
  },
  {
    method: 'POST',
    path: '/country',
    options: {
      validate: {
        payload: Joi.object({
          projectCountry: Joi.string().required()
        }),
        failAction: (request, h) => h.view('country', createModel('Select yes if the planned project is in England')).takeover()
      },
      handler: (request, h) => {
        if (request.payload.projectCountry === 'yes') {
          request.yar.set('projectCountry', request.payload.projectCountry)
          return h.redirect('./eoi-cost')
        }

        return h.redirect('./not-eligible')
      }
    }
  }
]
