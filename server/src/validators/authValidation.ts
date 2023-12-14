import { object, string } from "yup";

export const registerSchema = object({
  body: object({
    username: string()
      .required()
      .max(50)
      .matches(
        /^[a-zA-Z0-9]+$/,
        "username can only contain alphanumeric characters"
      ),
    password: string()
      .required()
      .min(8)
      .matches(/(?=.*[0-9])/, "must contain a number"),
  }),
});

export const loginSchema = object({
  body: object({
    username: string().required(),
    password: string().required(),
  }),
});
