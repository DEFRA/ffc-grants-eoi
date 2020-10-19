const pageName = 'progress-reference'

module.exports = [
  {
    method: 'GET',
    path: `/${pageName}`,
    handler: (request, h) => {
      return h.view('progress-reference', {
        backLink: '/'
      })
    }
  }
]
