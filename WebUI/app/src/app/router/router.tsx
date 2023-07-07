import { HomePage, TodosPage } from '@app/pages';
import { RouteObject, createBrowserRouter } from 'react-router-dom';

export const HOME_PAGE = '/';
export const TODOS_PAGE = '/todos';

const routes: RouteObject[] = [
  {
    path: HOME_PAGE,
    element: <HomePage />,
  },
  {
    path: TODOS_PAGE,
    element: <TodosPage />,
  },
];

export const router = createBrowserRouter(routes);
