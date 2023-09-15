# OpenID Keycloak scenarios

This allow to run tests to validate SSO login using [Playwright](https://playwright.dev/).
This import the [.env](../oidc/.env) (which need to be created using [.env.temmplate](../oidc/.env.temmplate)) file for user credentials.

## Install

```bash
npm install
```

## Usage

To run all the tests:

```bash
npx playwright test
```

To access the ui to easily run test individually and debug if needed:

```bash
npx playwright test --ui
```

## Writing scenario

When creating new scenario use the recorder to more easily identify elements (in general try to rely on visible hint to identify elements and not hidden ids).
This does not start the server, you will need to run `docker-compose up` in a different terminal.

```bash
npx playwright codegen "http://127.0.0.1:8000"
```
