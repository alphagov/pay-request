import nock from 'nock'

import { config, Connector, AdminUsers, Ledger } from './client'

const CONNECTOR_URL = 'https://some-connector-url.com/'
const ADMINUSERS_URL = 'https://some-adminusers-url.com/'
const LEDGER_URL = 'https://some-ledger-url.com/'

config({ CONNECTOR_URL, ADMINUSERS_URL, LEDGER_URL })

function nockEndpoint(baseUrl: string) {
    const healthyResponse = { ping: { healthy: true, message: "Healthy" } }
    nock(baseUrl).get('/healthcheck').reply(200, healthyResponse)
}

describe('Client ends configuration', () => {
    beforeAll(() => {
        [ CONNECTOR_URL, ADMINUSERS_URL, LEDGER_URL ].map(nockEndpoint)
    })

    test('Connector health', async () => {
        return expect(Connector.healthy()).resolves.toBe(true)
    })

    test('Adminusers health', async () => {
        return expect(AdminUsers.healthy()).resolves.toBe(true)
    })

    test('Ledger health', async () => {
        return expect(Ledger.healthy()).resolves.toBe(true)
    })
})