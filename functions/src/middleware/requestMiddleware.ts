import type { Request, Response, NextFunction } from 'express';

const validateContentType = (req: Request, res: Response, next: NextFunction) => {
  const contentType = req.get('Content-Type');
  if (contentType !== 'application/json') {
    res.status(400).json({ error: 'Invalid content type, only JSON is supported' });
  } else {
    next();
  }
};

export { validateContentType }