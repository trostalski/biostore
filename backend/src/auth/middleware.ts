import { Request, Response, NextFunction } from "express";

export function loggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
}
