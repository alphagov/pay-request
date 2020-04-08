import { config, Connector, AdminUsers, Ledger } from './client'

test('config method sets up clients with correct base URLs', () => {
    config({
        CONNECTOR_URL: '/connector/url',
        ADMINUSERS_URL: '/adminusers/url',
        LEDGER_URL: '/ledger/url'
    })
    expect(Connector._axios.defaults.baseURL).toBe('/connector/url')
    expect(AdminUsers._axios.defaults.baseURL).toBe('/adminusers/url')
    expect(Ledger._axios.defaults.baseURL).toBe('/ledger/url')
})

test('config method supports empty base case', () => {
    expect(config).not.toThrow()
})
