import { Router } from 'express';
import type { Routes } from './Routes';
import { authenticateToken } from '@middlewares/AuthMiddleware';
import { AirportController } from '@controllers/AirportController';

export default class AirportRoutes implements Routes {
  private readonly path = '/api/v1/airport';
  private readonly controller = new AirportController();
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @openapi
     * /api/v1/airport:
     *  get:
     *    summary: Get airports
     *    description: Get all airports
     *    tags: [Airport]
     *    produces:
     *      - application/json
     *    responses:
     *      '200':
     *        description: Get airports success
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                code:
     *                  type: integer
     *                  example: 200
     *                message:
     *                  type: string
     *                  example: 'success'
     *                data:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/schemas/Airport'
     */
    this.router.get(`${this.path}`, this.controller.getAirports);

    /**
     * @openapi
     * /api/v1/airport:
     *  post:
     *    summary: Create airport
     *    description: Create airport
     *    tags: [Airport]
     *    security: 
     *      - bearerAuth: []
     *    produces:
     *      - application/json
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            $ref: '#/components/schemas/AirportInput'
     *    responses:
     *      '200':
     *        description: Create airport success
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                code:
     *                  type: integer
     *                  example: 200
     *                message:
     *                  type: string
     *                  example: 'success'
     *      '401':
     *        description: No JWT Token Provided
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/NoTokenError'
     *      '403':
     *        description: Invalid JWT Token
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/InvalidTokenError'
     */
    this.router.post(`${this.path}`, authenticateToken, this.controller.createAirport);

    // Schemas
    /**
     * @openapi
     * components:
     *  schemas:
     *    Airport:
     *      type: object
     *      properties:
     *        id:
     *          type: integer
     *          example: 1
     *        code:
     *          type: string
     *          example: 'DPS'
     *        name:
     *          type: string
     *          example: 'I Gusti Ngurah Rai International Airport'
     *        timezone:
     *          type: integer
     *          example: 8
     *    AirportInput:
     *      type: object
     *      properties:
     *        code:
     *          type: string
     *          example: 'DPS'
     *        name:
     *          type: string
     *          example: 'I Gusti Ngurah Rai International Airport'
     *        timezone:
     *          type: integer
     *          example: 8
     */
  }
}