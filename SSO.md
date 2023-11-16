# SSO using OpenId Connect

To use an external source of authentication your SSO will need to support OpendID Connect :

 - And OpenID Connect Discovery endpoint should be available
 - Client authentication will be done using Id and Secret.

A master password will still required and not controlled by the SSO (depending of your point of view this might be a feature ;).
This introduce another way to control who can use the vault without having to use invitation or using an LDAP.

## Configuration

The following configurations are available

 - `SSO_ENABLED` : Activate the SSO
 - `SSO_ONLY` : disable email+Master password authentication
 - `SSO_AUTHORITY` : the OpendID Connect Discovery endpoint of your SSO
 - `SSO_CLIENT_ID` : Client Id
 - `SSO_CLIENT_SECRET` : Client Secret
 - `SSO_KEY_FILEPATH` : Optional public key to validate the JWT token (without it signature check will not be done).

The callback url is : `https://your.domain/identity/connect/oidc-signin`

## Configuration example using GitLab

Create an application in your Gitlab Settings with

- `redirectURI`: https://your.domain/identity/connect/oidc-signin
- `Confidential`: `true`
- `scopes`: `openid`, `profile`, `email`

Then configure your server with `SSO_AUTHORITY=https://gitlab.com`, `SSO_CLIENT_ID` and `SSO_CLIENT_SECRET`.
