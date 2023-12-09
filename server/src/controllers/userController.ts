import { Request, Response } from "express";

export const getCurrentUser = (_req: Request, res: Response) => {
  return res.json({
    user: {
      name: "James",
    },
  });
};
