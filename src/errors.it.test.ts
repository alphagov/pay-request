import nock from 'nock'

import { config, Connector } from './client'
import { NotFound, Forbidden } from 'http-errors'

const CONNECTOR_URL = 'https://some-connector-url.com/'
config({ CONNECTOR_URL })

describe('error response is correctly unpacked', () => {
  afterEach(() => nock.cleanAll())

  it('transforms 404 response to NotFound error with appropriate message', async () => {
    nock(CONNECTOR_URL).get('/v1/frontend/charges/1').times(2).reply(404)
    await expect(() => Connector.charges.retrieve('1')).rejects.toThrow(NotFound)
    await expect(() => Connector.charges.retrieve('1')).rejects.toThrow('Charge with identifier 1 was not found.')
  })

  it('transforms a non mapped response to the correct error', async () => {
    nock(CONNECTOR_URL).get('/v1/frontend/charges/1').reply(403)
    await expect(() => Connector.charges.retrieve('1')).rejects.toThrow(Forbidden)
  })
})