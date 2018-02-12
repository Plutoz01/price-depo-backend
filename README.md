# PriceDepo backend

## Development server

Run `yarn serve` / `npm run serve` to start demo backend with default REST endpoints.
Visit `http://localhost:3000/api-docs/` to swagger UI. 

### Use GraphQL implementation
Define environmental variable `GRAPHQL_ENABLED=true` and run server to use experimental graphql solution instead of REST API.

Define env variable `GRAPHIQL_ENABLED=true` to enable graphiql UI for testing and visit `http://localhost:3000/graphiql`.