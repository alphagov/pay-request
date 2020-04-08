# Pay request 🌐

[![Build Status](https://travis-ci.org/alphagov/pay-request.svg?branch=master)](https://travis-ci.org/alphagov/pay-request)
[![Known Vulnerabilities](https://snyk.io/test/github/alphagov/pay-request/badge.svg?targetFile=package.json)](https://snyk.io/test/github/alphagov/pay-request?targetFile=package.json)

Simple HTTP client for internal GOV.UK Pay services.

Provides a consistent request language across disparate backend route styles.

```typescript
import { Ledger } from '@govuk-pay/request'

const payments = await Ledger.payments.list()
```

## Usage

### Getting started

Pay request will check the environment for base URLs for each internal service
client. The simplest way to get up and running is to set these for required services.

`CONNECTOR_URL`,
`ADMINUSERS_URL`,
`PUBLICAUTH_URL`,
`LEDGER_URL`,
`PRODUCTS_URL`

For advanced setup, [read more about configuring the library](#configuration).

### Installation

Pay request builds on the [axios HTTP client](https://github.com/axios/axios). Axios is not bundled and should be installed as a peer dependency alongside Pay request.

```bash
npm i axios @govuk-pay/request
```

### Request language

`retrieve(id)`

Get one entity details.

```typescript
const payments = await Ledger.payments.retrieve('ofd7t9jbsq844rlv3agthdu9am')
```

`list()`

List all entities, these resources usually support pagination and filters.

```typescript
const payments = await Ledger.payments.list({
    card_brand: CardBrand.Visa
})
```

`update(id, params)`

Update an entity with supported request params.

```typescript
await AdminUsers.users.update('user-id', {
    disabled: false
})
```

`delete(id)`

Delete entity.

```typescript
await PublicAuth.tokens.delete({ token_link: 'token-id' })
```

### Configuration

Pay request exposes a top level `config()` method. By default the library will use `process.env` to check for URLs that map to clients.

These URLs can also overridden with the `config()` method.

```typescript
import { config } from '@govuk-pay/request'

config({
    CONNECTOR_URL: 'https://custom.digital/'
})
```

Pay request also supports hooks into the request lifecycle for logging and custom headers.

```typescript
config(process.env, {
    failureResponse: (context) => { console.log(`Request from ${context.service} failed with ${context.code}`) },
    successResponse: (context) => { console.log(`Request from ${context.service} returned in ${context.responseTime}`) },
    transformRequestAddHeaders: () => ({
        'x-request-id': 'correlation-id'
    })
})
```

## Service data structure

Type definitions are provided for all requests, responses and entities served by backend resources.

### Experimental

OpenAPI is used to generate type shape structures for each of the clients based on `.json` specification for that service.

For any internal service that doesn't have full annotations for OpenAPI there are `services/${client}/types.ts` polyfill definitions to provide a uniform developer experience.