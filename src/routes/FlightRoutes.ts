import { Router } from 'express';
import type { Routes } from './Routes';
import { FlightController } from '@controllers/FlightController';

export default class FlightRoutes implements Routes {
  private readonly path = '/api/v1/flight';
  private readonly controller = new FlightController();
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @openapi
     * /api/v1/flight:
     *  get:
     *    summary: Get flights
     *    description: Get flights. filtered by airport, date, class, and required capacity. Make sure that all query params is used.
     *    tags: [Flight]
     *    produces:
     *      - application/json
     *    parameters:
     *      - in: query
     *        name: originAirportCode
     *        required: true
     *        schema:
     *          type: string
     *          example: 'CGK'
     *        description: Code of origin airport
     *      - in: query
     *        name: destinationAirportCode
     *        required: true
     *        schema:
     *          type: string
     *          example: 'SUB'
     *        description: Code of destination airport
     *      - in: query
     *        name: numOfAdults
     *        required: true
     *        schema:
     *          type: integer
     *          example: 1
     *        description: Number of adult passengers
     *      - in: query
     *        name: numOfChildren
     *        required: true
     *        schema:
     *          type: integer
     *          example: 1
     *        description: Number of child passengers
     *      - in: query
     *        name: numOfBabies
     *        schema:
     *          type: integer
     *          example: 1
     *        description: Number of baby passengers
     *      - in: query
     *        name: classCode
     *        required: true
     *        schema:
     *          type: string
     *          example: 'E'
     *        description: Seat class (E/EP/B/F)
     *      - in: query
     *        name: date
     *        required: true
     *        schema:
     *          type: string
     *          example: '2024-02-25'
     *        description: Flight date. Make sure that the date format is right.
     *    responses:
     *      '200':
     *        description: Get flights success
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
     *                    $ref: '#/components/schemas/Flight'
     */
    this.router.get(`${this.path}`, this.controller.getFlights);

    /**
     * @openapi
     * /api/v1/flight/{id}:
     *  get:
     *    summary: Get flight by ID
     *    description: Get flight by ID. Make sure that classCode is included in query params.
     *    tags: [Flight]
     *    produces:
     *      - application/json
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: integer
     *          example: 1
     *        description: Flight ID
     *      - in: query
     *        name: classCode
     *        required: true
     *        schema:
     *          type: string
     *          example: 'E'
     *        description: Seat class (E/EP/B/F)
     *    responses:
     *      '200':
     *        description: Get flight success
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/Flight'
     */
    this.router.get(`${this.path}/:id(\\d+)`, this.controller.getFlight);

    // Schemas
    /**
     * @openapi
     * components:
     *  schemas:
     *    Flight:
     *      type: object
     *      properties:
     *        id:
     *          type: integer
     *          example: 1
     *        departureDatetime:
     *          type: string
     *          example: '2024-02-25T00:00:00.000Z'
     *        arrivalDatetime:
     *          type: string
     *          example: '2024-02-25T02:00:00.000Z'
     *        timezone:
     *          type: integer
     *          example: 8
     *        plane:
     *          type: object
     *          $ref: '#/components/schemas/Plane'
     *        originAirport:
     *          type: object
     *          $ref: '#/components/schemas/Airport'
     *        destinationAirport:
     *          type: object
     *          $ref: '#/components/schemas/Airport'
     *        adultPrice:
     *          type: integer
     *          example: 1000000
     *        childPrice:
     *          type: integer
     *          example: 1000000
     *        babyPrice:
     *          type: integer
     *          example: 100000
     *    Plane:
     *      type: object
     *      properties:
     *        id: 
     *          type: integer
     *          example: 1
     *        code:
     *          type: string
     *          example: 'AC 2034'
     *        name:
     *          type: string
     *          example: 'Boeing'
     *        airline:
     *          type: object
     *          $ref: '#/components/schemas/Airline'
     *    Airline:
     *      type: object
     *      properties:
     *        id: 
     *          type: integer
     *          example: 1
     *        name:
     *          type: string
     *          example: 'Garuda Indonesia'
     *        imageUrl:
     *          type: string
     *          example: 'https://fsw-backend.fly.dev/airlines/image/garuda_indonesia.png'
     */
  }
}