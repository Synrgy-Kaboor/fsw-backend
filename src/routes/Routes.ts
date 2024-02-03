import type { Router } from 'express';
/**
 * @openapi
 * tags:
 *  -   name: Airport
 *      description: Airport resource endpoints
 *  -   name: Booking
 *      description: Booking and payment related endpoints
 *  -   name: User
 *      description: User resource endpoints
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
