import { Router } from 'express';
import type { Routes } from './Routes';
import { VoucherController } from '@controllers/VoucherController';
import { authenticateToken } from '@middlewares/AuthMiddleware';

export default class VoucherRoutes implements Routes {
  private readonly path = '/api/v1/voucher';
  private readonly controller = new VoucherController();
  public router: Router;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @openapi
     * /api/v1/voucher:
     *  get:
     *    summary: Get vouchers
     *    description: Get all vouchers that are still valid
     *    tags: [Voucher]
     *    produces:
     *      - application/json
     *    security: 
     *      - bearerAuth: []
     *    responses:
     *      '200':
     *        description: Get vouchers success
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
     *                    $ref: '#/components/schemas/Voucher'
     */
    this.router.get(`${this.path}`, authenticateToken, this.controller.getVouchers);

    // Schemas
    /**
     * @openapi
     * components:
     *  schemas:
     *    Voucher:
     *      type: object
     *      properties:
     *        id:
     *          type: integer
     *          example: 1
     *        code:
     *          type: string
     *          example: 'JALANJALAN'
     *        title:
     *          type: string
     *          example: 'Diskon 100rb untuk Pemesanan Tiket'
     *        description:
     *          type: string
     *          example: 'Dapatkan diskonnya segera!'
     *        eligiblePaymentmethods:
     *          type: array
     *          items:
     *            type: string
     *            example: 'BCA'
     *        maximumDiscount:
     *          type: integer
     *          example: 100000
     *        expiredTime: 
     *          type: string
     *          example: '2030-01-01T02:00:00.000Z'
     */
  }
}