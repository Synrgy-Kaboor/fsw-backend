import { Router } from 'express';
import type { Routes } from './Routes';
import { UserController } from '@controllers/UserController';
import { authenticateToken } from '@middlewares/AuthMiddleware';
import { profileImageUpload } from '@middlewares/FileUploadMiddleware';

export default class UserRoutes implements Routes {
  private readonly path = '/api/v1/user';
  private readonly controller = new UserController();
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @openapi
     * /api/v1/user:
     *  get:
     *    summary: Get user personal data
     *    description: Get currently logged in user's personal data
     *    tags: [User]
     *    produces:
     *      - application/json
     *    security: 
     *      - bearerAuth: []
     *    responses:
     *      '200':
     *        description: Get user personal data success
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
     *                    $ref: '#/components/schemas/UserPersonalDataOutput'
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
    this.router.get(`${this.path}`, authenticateToken, this.controller.getPersonalInformation);
    
    /**
     * @openapi
     * /api/v1/user:
     *  patch:
     *    summary: Modify user personal data
     *    description: Modify currently logged in user's personal data
     *    tags: [User]
     *    security: 
     *      - bearerAuth: []
     *    produces:
     *      - application/json
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            $ref: '#/components/schemas/UserPersonalDataInput'
     *    responses:
     *      '200':
     *        description: Modify user personal data success
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
    this.router.patch(`${this.path}`, authenticateToken, this.controller.updatePersonalInformation);

    /**
     * @openapi
     * /api/v1/user/image:
     *  post:
     *    summary: Upload user profile image
     *    description: Upload user profile image. Only png, jpg, and jpeg images allowed. *Does not change the current user's profile image, only uploads and saves it.
     *    tags: [User]
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
     *              image:
     *                type: string
     *                format: binary
     *    responses:
     *      '200':
     *        description: Upload profile image success
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
    this.router.post(`${this.path}/image`, authenticateToken, profileImageUpload.single('image'), this.controller.addProfileImage);

    this.router.patch(`${this.path}/email`, authenticateToken, this.controller.updateEmail);
    this.router.post(`${this.path}/email/otp/verify`, authenticateToken, this.controller.verifyEmail);
    this.router.get(`${this.path}/email/otp/resend`, authenticateToken, this.controller.updateEmailOtp);
    this.router.patch(`${this.path}/phone`, authenticateToken, this.controller.updateNoHp);
    this.router.post(`${this.path}/phone/otp/verify`, authenticateToken, this.controller.verifyNoHp);
    this.router.get(`${this.path}/phone/otp/resend`, authenticateToken, this.controller.updateNoHpOtp);

    // Schemas
    /**
     * @openapi
     * components:
     *  schemas:
     *    UserPersonalDataOutput:
     *      type: object
     *      properties:
     *        title:
     *          type: string
     *          example: 'Ms'
     *        fullName:
     *          type: string
     *          example: 'Full Name'
     *        gender:
     *          type: string
     *          example: 'P'
     *        birthday:
     *          type: string
     *          example: '1989-21-21'
     *        nik:
     *          type: string
     *          example: '242432439384'
     *        nation:
     *          type: string
     *          example: 'Indonesia'
     *        city:
     *          type: string
     *          example: 'Jakarta'
     *        address:
     *          type: string
     *          example: 'Jl. Ayam Raya 5 blok XX'
     *        isWni:
     *          type: boolean
     *          example: true
     *        imageName: 
     *          type: string
     *          example: 'd63e31aa-4b67-4763-bd83-ed9b513d3204.png'
     *        imageUrl:
     *          type: string
     *          example: 'https://fsw-backend.fly.dev/d63e31aa-4b67-4763-bd83-ed9b513d3204.png'
     *        email:
     *          type: string
     *          example: 'x@gmail.com'
     *        phoneNumber:
     *          type: string
     *          example: '034823948203'
     *    UserPersonalDataInput:
     *      type: object
     *      properties:
     *        title:
     *          type: string
     *          example: 'Ms'
     *        fullName:
     *          type: string
     *          example: 'Full Name'
     *        gender:
     *          type: string
     *          example: 'P'
     *        birthday:
     *          type: string
     *          example: '1989-21-21'
     *        nik:
     *          type: string
     *          example: '242432439384'
     *        nation:
     *          type: string
     *          example: 'Indonesia'
     *        city:
     *          type: string
     *          example: 'Jakarta'
     *        address:
     *          type: string
     *          example: 'Jl. Ayam Raya 5 blok XX'
     *        isWni:
     *          type: boolean
     *          example: true
     *        imageName: 
     *          type: string
     *          example: 'd63e31aa-4b67-4763-bd83-ed9b513d3204.png'
     */
  }
}