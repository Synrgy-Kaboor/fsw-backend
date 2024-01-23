import { CarController } from '@controllers/CarController';
import { Router } from 'express';
import type { Routes } from './Routes';
import { carImageUpload } from '@middlewares/ImageUploadMiddleware';
import { authenticateToken } from '@middlewares/AuthMiddleware';
import { body } from 'express-validator';
import { handleValidation } from '@middlewares/ExpressValidationMiddleware';

export default class CarRoutes implements Routes {
  private readonly path = '/api/v1/cars';
  private readonly controller = new CarController();
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const allowedAttributes = [
      'plate',
      'manufacture',
      'model',
      'image',
      'rent_per_day',
      'capacity',
      'description',
      'available_at',
      'transmission',
      'available',
      'type',
      'year',
      'options',
      'specs',
    ];
    const validateCarBody = body('*').custom((value, { req }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const keys = Object.keys(req.body);
      const invalidKeys = keys.filter(
        (key) => !allowedAttributes.includes(key),
      );
      return invalidKeys.length === 0;
    });
    /**
     * @openapi
     * /api/v1/cars:
     *  get:
     *      summary: Get cars
     *      description: Get cars, paginated and filtered
     *      tags: [Cars]
     *      produces:
     *          - application/json
     *      parameters:
     *          -   in: query
     *              name: page
     *              schema:
     *                  type: integer
     *              description: Page of the requested data
     *          -   in: query
     *              name: limit
     *              schema:
     *                  type: integer
     *              description: Maximum number of data in the response
     *          -   in: query
     *              name: size_type
     *              schema:
     *                  type: string
     *                  enum: ['small', 'medium', 'large']
     *              description: Size type which indicates the capacity of the vehicle (small, medium, large)
     *          -   in: query
     *              name: pickup_time
     *              schema:
     *                  type: string
     *                  format: date-time
     *              description: The time at which the vehicle has to be available
     *          -   in: query
     *              name: min_capacity
     *              schema:
     *                  type: integer
     *              description: Minimum vehicle capacity
     *      responses:
     *          '200':
     *              description: Get cars success
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              page:
     *                                  type: integer
     *                              limit:
     *                                  type: integer
     *                              data:
     *                                  type: array
     *                                  items:
     *                                      $ref: '#/components/schemas/Car'
     */
    this.router.get(`${this.path}`, this.controller.getCars);

    /**
     * @openapi
     * /api/v1/cars/{id}:
     *  get:
     *      summary: Get car by ID
     *      description: Get car by ID
     *      tags: [Cars]
     *      produces:
     *          - application/json
     *      parameters:
     *          -   in: path
     *              name: id
     *              schema:
     *                  type: string
     *                  format: uuid
     *              description: UUID of a car
     *      responses:
     *          '200':
     *              description: Get car by ID success
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/Car'
     *          '404':
     *              description: No car with given ID is found
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#components/schemas/NotFoundError'
     */
    this.router.get(`${this.path}/:id`, this.controller.getCarById);

    /**
     * @openapi
     * /api/v1/cars:
     *  post:
     *      summary: Create car
     *      description: Create car
     *      tags: [Cars]
     *      security:
     *      -   bearerAuth: []
     *      produces:
     *          - application/json
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/CarInput'
     *      responses:
     *          '201':
     *              description: Create car success
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/Car'
     *          '400':
     *              description: Request body does not follow defined contract
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/BadRequestError'
     *          '401':
     *              description: No JWT Token Provided
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/NoTokenError'
     *          '403':
     *              description: Invalid JWT Token
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/InvalidTokenError'
     *          '409':
     *              description: Request body value violates a constraint
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/ConstraintViolationError'
     *
     */
    const validateCreateCarBody = [
      validateCarBody,
      body('plate').isString(),
      body('manufacture').isString(),
      body('image').isString(),
      body('rent_per_day').isInt(),
      body('capacity').isInt(),
      body('description').isString(),
      body('available_at').isString(),
      body('type').isString(),
      body('year').isInt(),
      body('options.*').isString(),
      body('specs.*').isString(),
      handleValidation,
    ];

    this.router.post(
      `${this.path}`,
      authenticateToken,
      validateCreateCarBody,
      this.controller.createCar,
    );

    /**
     * @openapi
     * /api/v1/cars/image:
     *  post:
     *      summary: Upload car image
     *      description: Upload car image
     *      tags: [Cars]
     *      security:
     *      -   bearerAuth: []
     *      produces:
     *          - application/json
     *      requestBody:
     *          content:
     *              multipart/form-data:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          image:
     *                              type: string
     *                              format: binary
     *      responses:
     *          '200':
     *              description: Upload car image success
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              filename:
     *                                  type: string
     *          '400':
     *              description: Request body does not follow defined contract
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/BadRequestError'
     *          '401':
     *              description: No JWT Token Provided
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/NoTokenError'
     *          '403':
     *              description: Invalid JWT Token
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/InvalidTokenError'
     */
    this.router.post(
      `${this.path}/image`,
      authenticateToken,
      carImageUpload.single('image'),
      this.controller.addCarImage,
    );

    /**
     * @openapi
     * /api/v1/cars/{id}:
     *  put:
     *      summary: Update car
     *      description: Update car
     *      tags: [Cars]
     *      security:
     *      -   bearerAuth: []
     *      produces:
     *          - application/json
     *      parameters:
     *          -   in: path
     *              name: id
     *              schema:
     *                  type: string
     *                  format: uuid
     *              description: UUID of a car
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/CarInput'
     *      responses:
     *          '200':
     *              description: Update car success
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/Car'
     *          '400':
     *              description: Request body does not follow defined contract
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/BadRequestError'
     *          '401':
     *              description: No JWT Token Provided
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/NoTokenError'
     *          '403':
     *              description: Invalid JWT Token
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/InvalidTokenError'
     *          '404':
     *              description: No car with given ID is found
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#components/schemas/NotFoundError'
     *          '409':
     *              description: Request body value violates a constraint
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/ConstraintViolationError'
     */
    const validateUpdateCarBody = [
      validateCarBody,
      body('plate').isString().optional(),
      body('manufacture').isString().optional(),
      body('image').isString().optional(),
      body('rent_per_day').isInt().optional(),
      body('capacity').isInt().optional(),
      body('description').isString().optional(),
      body('available_at').isString().optional(),
      body('type').isString().optional(),
      body('year').isInt().optional(),
      body('options.*').isString().optional(),
      body('specs.*').isString().optional(),
      handleValidation,
    ];

    this.router.put(
      `${this.path}/:id`,
      authenticateToken,
      validateUpdateCarBody,
      this.controller.updateCar,
    );

    /**
     * @openapi
     * /api/v1/cars/{id}:
     *  delete:
     *      summary: Delete car
     *      description: Delete car
     *      tags: [Cars]
     *      security:
     *      -   bearerAuth: []
     *      produces:
     *          - application/json
     *      parameters:
     *          -   in: path
     *              name: id
     *              schema:
     *                  type: string
     *                  format: uuid
     *              description: UUID of a car
     *      responses:
     *          '200':
     *              description: Delete car success
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/Car'
     *          '401':
     *              description: No JWT Token Provided
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/NoTokenError'
     *          '403':
     *              description: Invalid JWT Token
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#/components/schemas/InvalidTokenError'
     *          '404':
     *              description: No car with given ID is found
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          $ref: '#components/schemas/NotFoundError'
     */
    this.router.delete(
      `${this.path}/:id`,
      authenticateToken,
      this.controller.deleteCar,
    );

    // Schemas
    /**
     * @openapi
     * components:
     *      schemas:
     *          Car:
     *              type: object
     *              properties:
     *                  id:
     *                      type: string
     *                      format: uuid
     *                      example: '0d5de078-a5fc-456b-9487-47eb450a01c6'
     *                  plate:
     *                      type: string
     *                      example: 'STL-7347'
     *                  manufacture:
     *                      type: string
     *                      example: 'Buick'
     *                  model:
     *                      type: string
     *                      example: 'LaCrosse'
     *                  image:
     *                      type: string
     *                      example: 'car09.min.jpg'
     *                  rent_per_day:
     *                      type: integer
     *                      example: 1000000
     *                  capacity:
     *                      type: integer
     *                      minimum: 1
     *                      example: 6
     *                  description:
     *                      type: string
     *                      example: 'Rear reading & courtesy lamps. Zone body construction -inc: front/rear crumple zones, hood deformation point.'
     *                  available_at:
     *                      type: string
     *                      format: date-time
     *                      example: '2022-03-23T15:49:05.563Z'
     *                  transmission:
     *                      type: string
     *                      example: 'Automatic'
     *                  available:
     *                      type: boolean
     *                      example: false
     *                  type:
     *                      type: string
     *                      example: 'Extended Cab Pickup'
     *                  year:
     *                      type: integer
     *                      example: 2012
     *                  options:
     *                      type: array
     *                      items:
     *                          type: string
     *                          example: 'CD (Multi Disc)'
     *                  specs:
     *                      type: array
     *                      items:
     *                          type: string
     *                          example: 'Rear reading & courtesy lamps'
     *                  creator_id:
     *                      type: string
     *                      format: uuid
     *                      example: '0f9a16f5-2d9a-4fa5-8bc2-9a00df22921d'
     *                  created_at:
     *                      type: string
     *                      format: date-time
     *                      example: '2023-11-24T12:49:47.216Z'
     *                  last_updater_id:
     *                      type: string
     *                      format: uuid
     *                      example: '0f9a16f5-2d9a-4fa5-8bc2-9a00df22921d'
     *                  updated_at:
     *                      type: string
     *                      format: date-time
     *                      example: '2023-11-24T12:49:47.216Z'
     *                  deleter_id:
     *                      type: string
     *                      format: uuid
     *                      example: '0f9a16f5-2d9a-4fa5-8bc2-9a00df22921d'
     *                  deleted_at:
     *                      type: string
     *                      format: date-time
     *                      example: '2023-11-24T12:49:47.216Z'
     */

    /**
     * @openapi
     * components:
     *      schemas:
     *          CarInput:
     *              type: object
     *              properties:
     *                  plate:
     *                      type: string
     *                      example: 'STL-7347'
     *                  manufacture:
     *                      type: string
     *                      example: 'Buick'
     *                  model:
     *                      type: string
     *                      example: 'LaCrosse'
     *                  image:
     *                      type: string
     *                      example: 'car09.min.jpg'
     *                  rent_per_day:
     *                      type: integer
     *                      example: 1000000
     *                  capacity:
     *                      type: integer
     *                      minimum: 1
     *                      example: 6
     *                  description:
     *                      type: string
     *                      example: 'Rear reading & courtesy lamps. Zone body construction -inc: front/rear crumple zones, hood deformation point.'
     *                  available_at:
     *                      type: string
     *                      format: date-time
     *                      example: '2022-03-23T15:49:05.563Z'
     *                  transmission:
     *                      type: string
     *                      example: 'Automatic'
     *                  available:
     *                      type: boolean
     *                      example: false
     *                  type:
     *                      type: string
     *                      example: 'Extended Cab Pickup'
     *                  year:
     *                      type: integer
     *                      example: 2012
     *                  options:
     *                      type: array
     *                      items:
     *                          type: string
     *                          example: 'CD (Multi Disc)'
     *                  specs:
     *                      type: array
     *                      items:
     *                          type: string
     *                          example: 'Rear reading & courtesy lamps'
     */
  }
}
