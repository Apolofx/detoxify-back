import { app } from "../../app";
import supertest from "supertest";
import { PrismaClient, User } from "@prisma/client";

//TODO create seeds for testing purposes

describe("Users routes respond properly", () => {
  afterAll(async () => {
    //Remove test user
    const prismaTest = new PrismaClient();
    await prismaTest.user.delete({
      where: {
        email: "test@test.com",
      },
    });
  });
  let testUser: User;
  test("GET /users retrieves all users", () =>
    supertest(app).get("/users").expect(200));

  test("GET /users/:id returns 404 for no user found with given id", () =>
    supertest(app).get("/users/99999").expect(404));

  test("GET /users/:id returns 400 for invalid given id", () =>
    supertest(app).get("/users/asd").expect(400));

  test("POST /users creates a new user", () =>
    supertest(app)
      .post("/users")
      .send({ name: "test", email: "test@test.com" })
      .expect(200)
      .then((res) => {
        expect(res.body.name).toEqual("test");
        expect(res.body.email).toEqual("test@test.com");
        testUser = res.body;
      }));

  test("GET /users/:id retrieves a user by given id", () =>
    supertest(app)
      .get(`/users/${testUser.id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.name).toEqual("test");
        expect(res.body.email).toEqual("test@test.com");
        expect(res.body.id).toEqual(testUser.id);
      }));

  test("POST /users returns 409 for already used email", () =>
    supertest(app)
      .post("/users")
      .send({ name: "test", email: "test@test.com" })
      .expect(409));

  test("POST /users returns 400 if missing email in request body", () =>
    supertest(app)
      .post("/users")
      .send({ name: "test" })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBeTruthy();
      }));

  test("POST /users returns 400 if missing name in request body", () =>
    supertest(app)
      .post("/users")
      .send({ email: "test@test.com" })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBeTruthy();
      }));
});
