import { App } from './App';
import { type Routes } from '@routes/Routes';
import UserRoutes from '@routes/UserRoutes';

const routes: Routes[] = [
  new UserRoutes()
];

const app = new App(routes);

app.listen();
