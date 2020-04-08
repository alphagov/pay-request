import { mapRequestParamsToOperation } from './request'

describe('request utilities', () => {
  it('returns replace operations given an object of key value pairs', () => {
    const params = {
      key: 'key-value',
      value: 'value-value'
    }
    const payload = mapRequestParamsToOperation(params)
    expect(payload[0].op).toEqual('replace')
    expect(payload[0].path).toEqual('key')
    expect(payload[0].value).toEqual('key-value')

    expect(payload[1].op).toEqual('replace')
    expect(payload[1].path).toEqual('value')
    expect(payload[1].value).toEqual('value-value')
  })
})