import { Router } from 'express';
import type { Routes } from './Routes';
import { authenticateToken } from '@middlewares/AuthMiddleware';
import { BookingController } from '@controllers/BookingController';
import { paymentFileUpload } from '@middlewares/FileUploadMiddleware';

export default class BookingRoutes implements Routes {
  private readonly path = '/api/v1/booking';
  private readonly controller = new BookingController();
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @openapi
     * /api/v1/booking:
     *  post:
     *    summary: Create booking
     *    description: Create booking
     *    tags: [Booking]
     *    produces:
     *      - application/json
     *    security: 
     *      - bearerAuth: []
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            $ref: '#/components/schemas/BookingInput'
     *    responses:
     *      '200':
     *        description: Get payment details success
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
    this.router.post(`${this.path}`, authenticateToken, this.controller.createBooking);

    /**
     * @openapi
     * /api/v1/booking/{id}/payment:
     *  get:
     *    summary: Get payment details
     *    description: Get payment details of a booking
     *    tags: [Booking]
     *    produces:
     *      - application/json
     *    security: 
     *      - bearerAuth: []
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: integer
     *          example: 1
     *        description: Booking ID
     *    responses:
     *      '200':
     *        description: Get payment details success
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
     *                  type: object
     *                  properties:
     *                    methodName:
     *                      type: string
     *                      example: 'BCA'
     *                    accountNumber:
     *                      type: string
     *                      example: '1402344855235'
     *                    totalPrice:
     *                      type: integer
     *                      example: 2460000
     *                    paymentCompleted:
     *                      type: boolean
     *                      example: false
     *                    expiredTime:  
     *                      type: string
     *                      example: '2024-02-25T00:00:00.000Z'
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
    this.router.get(`${this.path}/:id(\\d+)/payment`, authenticateToken, this.controller.getPaymentDetails);

    /**
     * @openapi
     * /api/v1/booking/{id}/status:
     *  get:
     *    summary: Get booking status
     *    description: Get booking status
     *    tags: [Booking]
     *    produces:
     *      - application/json
     *    security: 
     *      - bearerAuth: []
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: integer
     *          example: 1
     *        description: Booking ID
     *    responses:
     *      '200':
     *        description: Get payment details success
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
     *                  type: object
     *                  properties:
     *                    methodName:
     *                      type: string
     *                      example: 'BCA'
     *                    totalPrice:
     *                      type: integer
     *                      example: 2460000
     *                    paymentCompleted:
     *                      type: boolean
     *                      example: false
     *                    expiredTime:  
     *                      type: string
     *                      example: '2024-02-25T00:00:00.000Z'
     *                    paymentDateTime:
     *                      type: string
     *                      example: '2024-02-26T00:00:00.000Z'
     *                    invoiceNumber:
     *                      type: string
     *                      example: 'IV32412353'
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
    this.router.get(`${this.path}/:id(\\d+)/status`, authenticateToken, this.controller.getBookingStatus);

    /**
     * @openapi
     * /api/v1/booking/payment/file:
     *  post:
     *    summary: Upload proof of payment file
     *    description: Upload proof of payment file. Only png, jpg, jpeg, and pdf files allowed. * Does not add proof of payment to a booking, only uploads the file and saves it
     *    tags: [Booking]
     *    security: 
     *      - bearerAuth: []
     *    produces:
     *      - application/json
     *    requestBody:
     *      content:
     *        multipart/form-data:
     *          schema:
     *            type: object
     *            properties:
     *              file:
     *                type: string
     *                format: binary
     *    responses:
     *      '200':
     *        description: Upload proof of payment file success
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
     *      '400':
     *        description: No file / Wrong file type / Wrong form field name
     *        content:
     *          application/json:
     *            schema: 
     *              type: object
     *              $ref: '#/components/schemas/BadRequestError'
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
    this.router.post(`${this.path}/payment/file`, authenticateToken, paymentFileUpload.single('file'), this.controller.uploadProofOfPaymentFile);

    /**
     * @openapi
     * /api/v1/booking/{id}/payment/proof:
     *  patch:
     *    summary: Submit booking payment proof
     *    description: Submit booking payment proof
     *    tags: [Booking]
     *    security: 
     *      - bearerAuth: []
     *    produces:
     *      - application/json
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              fileName:
     *                type: string
     *                example: 'e73ceee6-67da-4ea9-a84b-683fe933549d.png'    
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: integer
     *          example: 1
     *        description: Booking ID    
     *    responses:
     *      '200':
     *        description: Submit bookign payment proof success
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
     *      '409':
     *        description: Proof has been uploaded before / booking was already completed
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/ConstraintViolationError'
     */
    this.router.patch(`${this.path}/:id(\\d+)/payment/proof`, authenticateToken, this.controller.submitProofOfPayment);

        /**
     * @openapi
     * /api/v1/booking/{id}/payment/approve:
     *  post:
     *    summary: Approve booking payment
     *    description: Approve booking payment
     *    tags: [Booking]
     *    security: 
     *      - bearerAuth: []
     *    produces:
     *      - application/json
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: integer
     *          example: 1
     *        description: Booking ID   
     *    responses:
     *      '200':
     *        description: Booking payment approved
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
     *      '409':
     *        description: Booking has been approved before / proof of payment not uploaded yet
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/ConstraintViolationError'
     */
    this.router.post(`${this.path}/:id(\\d+)/payment/approve`, authenticateToken, this.controller.approvePayment);

    // Schemas
    /**
     * @openapi
     * components:
     *  schemas:
     *    BookingInput:
     *      type: object
     *      properties:
     *        flightId: 
     *          type: integer
     *          example: 1
     *        classCode: 
     *          type: string
     *          example: 'E'
     *        totalAdult:
     *          type: integer
     *          example: 1
     *        totalChild:
     *          type: integer
     *          example: 1
     *        totalBaby:
     *          type: integer
     *          example: 1
     *        orderer:
     *          type: object
     *          $ref: '#/components/schemas/Orderer'
     *        passengers:
     *          type: array
     *          items:
     *            $ref: '#/components/schemas/Passenger'
     *        addBaggage: 
     *          type: boolean
     *          example: true
     *        addTravelInsurance:
     *          type: boolean
     *          example: true
     *        addBaggageInsurance:
     *          type: boolean
     *          example: true
     *        addDelayProtection:
     *          type: boolean
     *          example: true
     *        paymentMethod:
     *          type: string
     *          example: 'BCA'
     *        voucherId:
     *          type: integer
     *          example: 1
     *    Orderer:
     *      type: object
     *      properties:
     *        fullName:
     *          type: string
     *          example: 'Full Name'
     *        title:
     *          type: string
     *          example: 'Mr'
     *        phoneNumber:
     *          type: string
     *          example: '024839283742'
     *        email:
     *          type: string
     *          example: 'xxx@gmail.com'
     *    Passenger:
     *      type: object
     *      properties:
     *        fullName:
     *          type: string
     *          example: 'Full Name'
     *        title:
     *          type: string
     *          example: 'Mr'
     */
  }
}