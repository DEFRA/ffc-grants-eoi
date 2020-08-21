describe('Server test', () => {
  test('createServer returns server', async () => {
    const createServer = require('../../../../app/initServer')
    const server = await createServer()
    expect(server).toBeDefined()
  })
})
