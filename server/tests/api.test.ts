import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app";

const api = supertest(app);

test("all persons are returned", async () => {
  const res = await api.get("/");
  expect(res.body.message).toEqual("Hello team!");
});

afterAll(async () => {
  mongoose.connection.close();
});
