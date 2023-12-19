import { object, string } from "yup";

export const createProjectSchema = object({
  body: object({ title: string().required() }),
});
