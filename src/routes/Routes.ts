import type { Router } from 'express';
/**
 * @openapi
 * tags:
 *  -   name: Airport
 *      description: Airport resource endpoints
 *  -   name: Booking
 *      description: Booking and payment related endpoints
 *  -   name: Flight
 *      description: Flight resource endpoints
 *  -   name: User
 *      description: User resource endpoints
 *  -   name: Voucher
 *      description: Voucher resource endpoints
 * components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 */

export interface Routes {
  router: Router;
}
