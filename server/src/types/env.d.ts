declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    NODE_ENV: "production" | "development" | "testing";
    DB_URL_DEV: string;
    DB_URL_PROD: string;
    DB_URL_TEST: string;
  }
}
