import { Router } from 'express';
import type { Routes } from './Routes';
import { authenticateToken } from '@middlewares/AuthMiddleware';
import { NotificationController } from '@controllers/NotificationController';
export default class NotificationRoutes implements Routes {
    private readonly path = '/api/v1/user/notification';
    private readonly controller = new NotificationController();
    public router: Router;
  
    constructor() {
      this.router = Router();
  
      this.initializeRoutes();
    }
  
    private initializeRoutes(): void {
        this.router.get(`${this.path}`, authenticateToken, this.controller.getNotificationByEmail);
        this.router.patch(`${this.path}/:id`, authenticateToken, this.controller.markReadNotificationById);
        this.router.delete(`${this.path}/:id`, authenticateToken, this.controller.deleteNotificationById);

        /**
         * @openapi
         * /api/v1/user/notification/price:
         *  get:
         *    summary: Get price notifications
         *    description: Get price notifications of user
         *    tags: [Notification]
         *    security: 
         *      - bearerAuth: []
         *    produces:
         *      - application/json
         *    responses:
         *      '200':
         *        description: Get price notifications success
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
         *                    $ref: '#/components/schemas/PriceNotificationOutput'
         */
        this.router.get(`${this.path}/price`, authenticateToken, this.controller.getPriceNotificationByEmail);
        
        /**
         * @openapi
         * /api/v1/user/notification/price:
         *  post:
         *    summary: Create price notification
         *    description: Create price notification
         *    tags: [Notification]
         *    security: 
         *      - bearerAuth: []
         *    requestBody:
         *      content:
         *        application/json:
         *          schema:
         *            type: object
         *            $ref: '#/components/schemas/PriceNotificationInput'
         *    produces:
         *      - application/json
         *    responses:
         *      '200':
         *        description: Get price notifications success
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
         */
        this.router.post(`${this.path}/price`, authenticateToken, this.controller.createPriceNotification);
        
        /**
         * @openapi
         * /api/v1/user/notification/price/{id}:
         *  patch:
         *    summary: Update price notification
         *    description: Update price notification
         *    tags: [Notification]
         *    security: 
         *      - bearerAuth: []
         *    parameters:
         *      - in: path
         *        name: id
         *        required: true
         *        schema:
         *          type: integer
         *          example: 1
         *        description: Price Notification ID
         *    requestBody:
         *      content:
         *        application/json:
         *          schema:
         *            type: object
         *            $ref: '#/components/schemas/PriceNotificationInput'
         *    produces:
         *      - application/json
         *    responses:
         *      '200':
         *        description: Get price notifications success
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
         */
        this.router.patch(`${this.path}/price/:id(\\d+)`, authenticateToken, this.controller.updatePriceNotification);
        
        /**
         * @openapi
         * /api/v1/user/notification/price/{id}:
         *  delete:
         *    summary: Update price notification
         *    description: Update price notification
         *    tags: [Notification]
         *    security: 
         *      - bearerAuth: []
         *    parameters:
         *      - in: path
         *        name: id
         *        required: true
         *        schema:
         *          type: integer
         *          example: 1
         *        description: Price Notification ID
         *    produces:
         *      - application/json
         *    responses:
         *      '200':
         *        description: Get price notifications success
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
         */
        this.router.delete(`${this.path}/price/:id(\\d+)`, authenticateToken, this.controller.deletePriceNotification);
    
        // Schemas
        /**
         * @openapi
         * components:
         *  schemas:
         *    PriceNotificationInput:
         *      type: object
         *      properties:
         *        totalAdults:
         *          type: integer
         *          example: 1
         *        totalChildren:
         *          type: integer
         *          example: 1
         *        totalBabies:
         *          type: integer
         *          example: 1
         *        classCode: 
         *          type: string
         *          example: 'E'
         *        minimumPrice:
         *          type: integer
         *          example: 1500000
         *        maximumPrice: 
         *          type: integer
         *          example: 5000000
         *        date:
         *          type: string
         *          example: '2024-02-25'
         *        originAirportId:
         *          type: integer
         *          example: 1
         *        destinationAirportId:
         *          type: integer
         *          example: 2
         *    PriceNotificationOutput:
         *      type: object
         *      properties:
         *        id: 
         *          type: integer
         *          example: 1
         *        totalAdults:
         *          type: integer
         *          example: 1
         *        totalChildren:
         *          type: integer
         *          example: 1
         *        totalBabies:
         *          type: integer
         *          example: 1
         *        classCode: 
         *          type: string
         *          example: 'E'
         *        minimumPrice:
         *          type: integer
         *          example: 1500000
         *        maximumPrice: 
         *          type: integer
         *          example: 5000000
         *        date:
         *          type: string
         *          example: '2024-02-25'
         *        originAirport:
         *          type: object
         *          $ref: '#/components/schemas/Airport'
         *        destinationAirport:
         *          type: object
         *          $ref: '#/components/schemas/Airport'
         */
    }
  }