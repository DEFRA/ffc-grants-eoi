const Joi = require('joi')

function createModel (cost, errorMessage) {
  return {
    input: {
      label: {
        text: 'How much will it cost?',
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      classes: 'govuk-input--width-10',
      hint: {
        text: 'Enter pounds and pence with a maximum of 12000.00.'
      },
      id: 'cost',
      name: 'cost',
      ...(cost ? { value: cost } : {}),
      ...(errorMessage ? { errorMessage: { text: errorMessage } } : {})
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/eoi-cost',
    handler: (request, h) => h.view('eoi-cost', createModel(request.yar.get('cost'), null))
  },
  {
    method: 'POST',
    path: '/eoi-cost',
    options: {
      validate: {
        payload: Joi.object({
          cost: Joi.string().required()
        }),
        failAction: (request, h) => h.view('eoi-cost', createModel(request.payload.cost, 'Enter an amount')).takeover()
      },
      handler: (request, h) => {
        request.yar.set('cost', request.payload.cost)
        return h.redirect('./eoi-confirmation')
      }
    }
  }
]
