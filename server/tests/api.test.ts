import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app";

const api = supertest(app);

test("api returns greeting", async () => {
  const res = await api.get("/");
  expect(res.body.message).toEqual("Hello team!");
});

afterAll(async () => {
  await mongoose.connection.close();
});
