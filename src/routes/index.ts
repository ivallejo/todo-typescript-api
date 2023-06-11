import type { Express } from 'express';
import TodoRouter from './todoRouter';

const todoRouter: TodoRouter = new TodoRouter();

export const useRoutes = (app: Express) => {
  app.use('/api', todoRouter.getRouter());
}