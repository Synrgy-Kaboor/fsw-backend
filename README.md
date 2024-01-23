# Kaboor - FSW Backend

Kaboor backend built with NodeJS and Express

## How to Run
- Execute command `npm i` to install required libraries
- Add or modify `.env` file according to database configuration (sample is given in `example.env`)
- Execute command `npm run dev` to run the server in development mode or `npm start` to build and run the server.

## How to Run (Docker)
- Execute command `docker-compose build` and `docker-compose up`

## Migration and Seed
- Add or modify `.env` file according to database configuration (sample is given in `example.env`)
- Execute command `npm run migrate` and `npm run seed`