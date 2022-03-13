//TODO add environment variables for test purposes only
import dotenv from "dotenv";
dotenv.config();
import { app } from "../../app";
import request from "supertest";
import { User } from "@prisma/client";

//use this relative route since using module-alias involves extra config in jest.config.js
import prismaTest from "@database";

//@todo create seeds for testing purposes
let token: string;
let testUser: User;

beforeAll(async () => {
  try {
    //Remove test users
    await prismaTest.user.deleteMany({
      where: {
        email: {
          contains: "test",
        },
      },
    });
    //create new authenticated user
    const res = await request(app).post("/auth/register").send({
      name: "authenticated_test_user",
      email: "auth_test@test.com.ar",
      password: "auth_test",
    });
    token = res.body.token;
  } catch (e) {
    console.log(e);
  }
});

afterAll((done) => {
  prismaTest.$disconnect();
  done();
});

describe("GET /users", () => {
  test("Returns all users if authenticated", async () =>
    await request(app)
      .get("/api/users")
      .set({ authorization: `Bearer ${token}` })
      .expect(200));
  test("Returns 401 if not authenticated", async () =>
    await request(app).get("/api/users").expect(401));
});

describe("GET /users/:id", () => {
  test("GET /users/:id returns 404 for no user found with given id", async () =>
    await request(app)
      .get("/api/users/99999")
      .set({ authorization: `Bearer ${token}` })
      .expect(404));
  test("GET /users/:id returns 400 for invalid given id", async () =>
    await request(app)
      .get("/api/users/asd")
      .set({ authorization: `Bearer ${token}` })
      .expect(400));
  test("GET /users/:id returns 401 if not authenticated", () =>
    request(app).get("/api/users/1").expect(401));
});

describe("POST /users", () => {
  test("POST /users creates a new user if authenticated", async () =>
    await request(app)
      .post("/api/users")
      .send({ name: "test", email: "test@test.com", password: "test" })
      .set({ authorization: `Bearer ${token}` })
      .expect(200)
      .then((res) => {
        expect(res.body.name).toEqual("test");
        expect(res.body.email).toEqual("test@test.com");
        testUser = res.body;
      }));

  test("POST /users returns 401 if not authenticated", async () =>
    await request(app)
      .post("/api/users")
      .send({ name: "test", email: "test@test.com", password: "test" })
      .expect(401));
});

test("GET /users/:id retrieves a user by given id", async () =>
  await request(app)
    .get(`/api/users/${testUser.id}`)
    .set({ authorization: `Bearer ${token}` })
    .expect(200)
    .then((res) => {
      expect(res.body.name).toEqual("test");
      expect(res.body.email).toEqual("test@test.com");
      expect(res.body.id).toEqual(testUser.id);
    }));

test("POST /users returns 409 for already used email", async () =>
  await request(app)
    .post("/api/users")
    .send({ name: "test", email: "test@test.com", password: "test" })
    .set({ authorization: `Bearer ${token}` })
    .expect(409));

test("POST /users returns 400 if missing name in request body", async () =>
  await request(app)
    .post("/api/users")
    .send({ email: "test@test.com" })
    .set({ authorization: `Bearer ${token}` })
    .expect(400)
    .then((res) => {
      expect(res.body.message).toBeTruthy();
    }));
test("GET /users/:id/details retrieves a single user with its details", async () => {
  await request(app)
    .get(`/api/users/${testUser.id}/details`)
    .set({ authorization: `Bearer ${token}` })
    .expect(200)
    .then((res) => {
      expect(Object.keys(res.body)).toContain("userDetails");
      expect(typeof res.body.userDetails).toEqual("object");
    });
});
test("GET /users/:id/achievements retrieves a single user with its achievements", async () => {
  await request(app)
    .get(`/api/users/${testUser.id}/achievements`)
    .set({ authorization: `Bearer ${token}` })
    .expect(200)
    .then((res) => {
      expect(Object.keys(res.body)).toContain("achievements");
      expect(typeof res.body.achievements).toEqual("object");
    });
});

describe("PUT /users/:id", () => {
  test("authenticated user can update a user's record", async () => {
    await request(app)
      .put(`/api/users/${testUser.id}`)
      .set({ authorization: `Bearer ${token}` })
      .send({ name: "updatedTestUser" })
      .expect(200)
      .then((res) => {
        expect(res.body.name).toContain("updatedTestUser");
      });
  });
  test("updating a user without data returns 304", async () => {
    await request(app)
      .put(`/api/users/${testUser.id}`)
      .set({ authorization: `Bearer ${token}` })
      .send()
      .expect(304);
  });
  test("updating a non-existant user returns 404", async () => {
    await request(app)
      .put(`/api/users/99999`)
      .set({ authorization: `Bearer ${token}` })
      .send({ name: "cacho" })
      .expect(404);
  });
});
