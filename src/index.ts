import { App } from './App';
import { type Routes } from '@routes/Routes';
import UserRoutes from '@routes/UserRoutes';
import BookingRoutes from '@routes/BookingRoutes';
import AirportRoutes from '@routes/AirportRoutes';
import FlightRoutes from '@routes/FlightRoutes';
import VoucherRoutes from '@routes/VoucherRoutes';
import PassportRoutes from '@routes/PassportRoutes';
import NotificationRoutes from '@routes/NotificationRoutes';

const routes: Routes[] = [
  new UserRoutes(),
  new BookingRoutes(),
  new AirportRoutes(),
  new FlightRoutes(),
  new VoucherRoutes(),
  new PassportRoutes(),
  new NotificationRoutes()
];

const app = new App(routes);

app.listen();
