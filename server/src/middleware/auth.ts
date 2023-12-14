import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Token from "../types/Token";

const getRequestToken = (req: Request) => {
  const TOKEN_PREFIX = "bearer ";
  const authorizationHeaderValue = req.get("authorization");

  if (
    authorizationHeaderValue &&
    authorizationHeaderValue.toLowerCase().startsWith(TOKEN_PREFIX)
  ) {
    return authorizationHeaderValue.substring(TOKEN_PREFIX.length);
  }
  return null;
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getRequestToken(req);
    if (!token) return res.status(401).json({ error: "missing token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.token = decoded as Token;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "unauthorized" });
  }
};
