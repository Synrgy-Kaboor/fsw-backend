import { App } from './App';
import { type Routes } from '@routes/Routes';
import UserRoutes from '@routes/UserRoutes';
import BookingRoutes from '@routes/BookingRoutes';
import AirportRoutes from '@routes/AirportRoutes';

const routes: Routes[] = [
  new UserRoutes(),
  new BookingRoutes(),
  new AirportRoutes()
];

const app = new App(routes);

app.listen();
