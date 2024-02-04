import { App } from './App';
import { type Routes } from '@routes/Routes';
import UserRoutes from '@routes/UserRoutes';
import BookingRoutes from '@routes/BookingRoutes';
import AirportRoutes from '@routes/AirportRoutes';
import FlightRoutes from '@routes/FlightRoutes';
import PassportRoutes from '@routes/PassportRoutes';

const routes: Routes[] = [
  new UserRoutes(),
  new BookingRoutes(),
  new AirportRoutes(),
  new FlightRoutes(),
  new PassportRoutes()
];

const app = new App(routes);

app.listen();
