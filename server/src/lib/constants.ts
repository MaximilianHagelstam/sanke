import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT ?? 8080;

export const ENV = process.env.NODE_ENV ?? "development";

export const DB_URL =
  ENV === "production"
    ? process.env.DB_URL_PROD
    : ENV === "testing"
      ? process.env.DB_URL_TEST
      : process.env.DB_URL_DEV;

export const JWT_SECRET = process.env.JWT_SECRET;
