import CarRoutes from '@routes/CarRoutes';
import { App } from './App';
import { type Routes } from '@routes/Routes';

const routes: Routes[] = [
  new CarRoutes()
];

const app = new App(routes);

app.listen();
