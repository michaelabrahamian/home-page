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
