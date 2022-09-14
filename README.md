# Home page app

created with React & TypeScript

uses a GraphQL (`apollo-server`) backend.

## To run locally:

1. `cp .env.example .env`
2. fill in the environment variable for your local backend server URL
3. `npm i`
4. `npm run start`

## To run with docker:

```
docker build -t home-page-frontend .
docker run --rm -p 80:80 home-page-frontend
```

## Webpack OpenSSL issue for Node versions 17+

Reference: https://github.com/webpack/webpack/issues/14532#issuecomment-949498098

Work around is to start the app with the following environment variable:

```
NODE_OPTIONS=--openssl-legacy-provider npm run start
```
