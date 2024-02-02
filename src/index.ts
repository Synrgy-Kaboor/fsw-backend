import { App } from './App';
import { type Routes } from '@routes/Routes';
import UserRoutes from '@routes/UserRoutes';
import BookingRoutes from '@routes/BookingRoutes';

const routes: Routes[] = [
  new UserRoutes(),
  new BookingRoutes()
];

const app = new App(routes);

app.listen();
