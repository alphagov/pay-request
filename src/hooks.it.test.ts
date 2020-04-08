import nock from 'nock'

import { config, Connector } from './client'

const CONNECTOR_URL = 'https://some-connector-url.com/'

describe('pay hooks for request lifecycle', () => {
  it('calls success hook given a successful response', async () => {
    const spy = jest.fn()
    nock(CONNECTOR_URL).get('/v1/frontend/charges/1').reply(200)
    config({ CONNECTOR_URL }, {
      successResponse: spy
    })
    await Connector.charges.retrieve('1')
    expect(spy).toBeCalledTimes(1)
  })

  it('calls failure hook given a rejected response', async () => {
    const spy = jest.fn()
    nock(CONNECTOR_URL).get('/v1/frontend/charges/1').reply(400)
    config({ CONNECTOR_URL }, {
      failureResponse: spy
    })

    await expect(() => Connector.charges.retrieve('1') ).rejects.toThrow()
    expect(spy).toBeCalledTimes(1)
  })

  it('passes through a well formed pay context', async () => {
    const spy = jest.fn()
    nock(CONNECTOR_URL).get('/v1/frontend/charges/1').reply(200)
    config({ CONNECTOR_URL }, {
      successResponse: spy
    })
    await Connector.charges.retrieve('1')
    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(
      expect.objectContaining({
        method: 'get',
        service: 'CONNECTOR',
        status: 200,
        url: '/v1/frontend/charges/1',
        responseTime: expect.any(Number)
      })
    )
  })

  it('adds headers to the request if configured', async () => {
    const spy = jest.fn(() => ({ 'x-request-header': 'a-test-token' }))
    nock(
      CONNECTOR_URL,
      { reqheaders: { 'x-request-header': 'a-test-token' } }
    ).get('/v1/frontend/charges/1').reply(200)

    config({ CONNECTOR_URL }, {
      transformRequestAddHeaders: spy
    })
    await Connector.charges.retrieve('1')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
