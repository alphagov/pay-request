import { redactOTP } from './redact'
import fixture from '../../tests/fixtures/user'

describe('react utility', () => {
  it('removes OTP code given a user object', () => {
    const user = { ...fixture, otp_key: '95fa38f10d17473c83ab6817b27d5a40' }
    expect(redactOTP(user)).not.toHaveProperty('otp_key')
  })
})