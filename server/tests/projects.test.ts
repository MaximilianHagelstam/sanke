import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app";
import { JWT_SECRET } from "../src/lib/constants";
import Project from "../src/models/Project";
import User from "../src/models/User";

const api = supertest(app);

const initialUser = {
  username: "test-user",
  password: "testtest123",
  avatar:
    "https://api.dicebear.com/7.x/notionists/svg?seed=test&backgroundColor=ebebeb&size=64",
};

let token = "";

beforeAll(async () => {
  await User.deleteMany({});
  await Project.deleteMany({});

  const passwordHash = await bcrypt.hash(initialUser.password, 10);
  const user = await User.create({
    username: initialUser.username,
    password: passwordHash,
    avatar: initialUser.avatar,
  });

  token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
});

describe("POST /api/projects", () => {
  test("creates a project", async () => {
    await api
      .post("/api/projects")
      .send({
        title: "test-project",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(201);
  });

  test("returns error if title is missing", async () => {
    await api
      .post("/api/projects")
      .send({
        title: undefined,
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });
});

describe("GET /api/projects", () => {
  test("returns array of projects", async () => {
    const res = await api
      .get("/api/projects")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.projects.length).toBe(1);
  });
});

describe("GET /api/projects/:id", () => {
  test("returns one project", async () => {
    const projects = await Project.find();
    const projectId = projects[0]._id.toString();

    const res = await api
      .get(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.project.id).toBe(projectId);
  });

  test("returns error if id is invalid", async () => {
    await api
      .get("/api/projects/123")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });
});

describe("DELETE /api/projects/:id", () => {
  test("deletes project", async () => {
    const initialProjects = await Project.find();
    const projectId = initialProjects[0]._id.toString();

    const res = await api
      .delete(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`);

    const projects = await Project.find();

    expect(res.statusCode).toBe(204);
    expect(projects.length).toBe(0);
  });

  test("returns error if id is invalid", async () => {
    await api
      .delete("/api/projects/123")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
