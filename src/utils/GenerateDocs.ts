import SwaggerJSDoc from 'swagger-jsdoc';

const definition = {
  openapi: '3.0.3',
  info: {
    title: 'Binar Car Rental',
    version: '1.0.0',
    description: 'REST API used by Binar Car Rental App',
    contact: {
      name: 'Ignasius Ferry Priguna',
    },
  },
  servers: [
    {
      url: 'https://fsw-backend.fly.dev',
      description: 'Deployed Server'
    },
    {
      url: 'http://localhost:3000',
      description: 'Local Development Server',
    },
  ],
};

const options = {
  definition,
  apis: ['./src/routes/*.ts', './src/middlewares/ExceptionHandler.ts'],
};

export const swaggerSpec = SwaggerJSDoc(options);
