describe('Home test', () => {
  let server
  const createServer = require('../../../../app/initServer')

  beforeEach(async () => {
    server = await createServer()
    await server.start()
  })

  test('GET / route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  afterEach(async () => {
    await server.stop()
  })
})
