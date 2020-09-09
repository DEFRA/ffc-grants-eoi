const Joi = require('joi')

function createModel (userId, errorMessage) {
  return {
    input: {
      label: {
        text: 'What is your magic number?',
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      classes: 'govuk-input--width-5',
      hint: {
        text: 'Must be 5 digits long'
      },
      id: 'userId',
      name: 'userId',
      inputmode: 'numeric',
      pattern: '[0-9]*',
      spellcheck: false,
      ...(userId ? { value: userId } : {}),
      ...(errorMessage ? { errorMessage: { text: errorMessage } } : {})
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/eoi-id',
    handler: (request, h) => h.view('eoi-id', createModel(request.yar.get('userId'), null))
  },
  {
    method: 'POST',
    path: '/eoi-id',
    options: {
      validate: {
        payload: Joi.object({
          userId: Joi.string().length(5).pattern(/^[0-9]+$/).required()
        }),
        failAction: (request, h) => h.view('eoi-id', createModel(request.payload.userId, 'Enter a 5 digit number')).takeover()
      },
      handler: (request, h) => {
        request.yar.set('userId', request.payload.userId)
        return h.redirect('./eoi-cost')
      }
    }
  }
]
