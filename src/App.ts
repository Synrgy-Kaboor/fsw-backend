import express from 'express';
import logger from '@utils/logger';
import type { Routes } from 'routes/Routes';
import knex, { type Knex } from 'knex';
import { Model } from 'objection';
import { exceptionHandler } from '@middlewares/ExceptionHandler';
import { reqEndLogger, reqStartLogger } from '@middlewares/LoggingMiddleware';
import { join } from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@utils/GenerateDocs';
import cors from 'cors';
import dotenv from 'dotenv';
import knexConfig from '@database/knexfile';

export class App {
  public readonly app: express.Application;
  private readonly knexInstance: Knex;
  private readonly port: number;

  constructor(routes: Routes[]) {
    // Setup environment variables from file
    dotenv.config({ path: join(__dirname, '..', '.env') });

    this.port =
      parseInt(!process.env.SERVER_POR as unknown as string, 10) || 3000;
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());

    // Logs start of request
    this.app.use(reqStartLogger);

    // Initialize routes
    // Documentation route
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Static routes
    this.app.use(
      '/user/image',
      express.static(join(__dirname, '..', 'storage', 'profile')),
    );
    this.app.use(
      '/payment/file',
      express.static(join(__dirname, '..', 'storage', 'payment')),
    );
    this.app.use('/', express.static(join(__dirname, '..', 'public')));

    // Main routes
    this.initializeRoutes(routes);

    // Handles request errors
    this.app.use(exceptionHandler);
    // Logs end of request
    this.app.use(reqEndLogger);

    // Setup knex
    this.knexInstance = knex(knexConfig.development);

    Model.knex(this.knexInstance);
  }

  private initializeRoutes(routes: Routes[]): void {
    for (const route of routes) {
      this.app.use('/', route.router);
    }
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`Server is running at port ${this.port}`);
    });
  }
}
