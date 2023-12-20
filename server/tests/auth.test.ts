import bcrypt from "bcrypt";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app";
import User from "../src/models/User";

const api = supertest(app);

const initialUser = {
  username: "test",
  password: "testingtesting123",
  avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=test",
};

beforeAll(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash(initialUser.password, 10);
  await User.create({
    username: initialUser.username,
    password: passwordHash,
    avatar: initialUser.avatar,
  });
});

describe("POST /api/auth/register", () => {
  test("Should successfully register a user", async () => {
    await api
      .post("/api/auth/register")
      .send({
        username: "testuser",
        password: "testpassword123",
      })
      .expect(201);
  });

  test("Should return error if user already exists", async () => {
    await api
      .post("/api/auth/register")
      .send({
        username: initialUser.username,
        password: initialUser.password,
      })
      .expect(400);
  });

  test("Should return error if password is too short", async () => {
    await api
      .post("/api/auth/register")
      .send({
        username: "testuser2",
        password: "test",
      })
      .expect(400);
  });
});

describe("POST /api/auth/login", () => {
  test("Should return a token after login", async () => {
    const res = await api.post("/api/auth/login").send({
      username: initialUser.username,
      password: initialUser.password,
    });
    expect(res.statusCode).toBe(200);
    expect(typeof res.body.token).toBe("string");
  });

  test("Should return error if username or password is wrong", async () => {
    await api
      .post("/api/auth/login")
      .send({
        username: initialUser.username,
        password: "test",
      })
      .expect(400);
  });
});

describe("GET /api/auth/me", () => {
  test("Should return logged in user", async () => {
    const loginRes = await api.post("/api/auth/login").send({
      username: initialUser.username,
      password: initialUser.password,
    });

    const res = await api
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${loginRes.body.token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.username).toBe(initialUser.username);
    expect(res.body.user.password).toBeUndefined();
  });

  test("Should return error if token is invalid", async () => {
    await api.get("/api/auth/me").set("Authorization", "test").expect(401);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
