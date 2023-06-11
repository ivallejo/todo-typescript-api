import type { Express } from 'express';

import { validateContentType } from "./requestMiddleware";

export const useMiddleware = (app: Express) => {
  app.use(validateContentType)
}