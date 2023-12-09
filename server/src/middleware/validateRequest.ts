import { NextFunction, Request, Response } from "express";
import { AnyObject, ObjectSchema } from "yup";

export const validateRequest =
  (schema: ObjectSchema<AnyObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      return res.status(400).json({
        error:
          err instanceof Error
            ? err.message
            : "request does not match the validation schema",
      });
    }
  };
