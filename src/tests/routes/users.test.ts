import { usersRouter } from "../../routes";
import { app } from "../../app";
import supertest from "supertest";
import { PrismaClient, User } from "@prisma/client";
import { doesNotMatch } from "assert";

describe("users routes respond propperly", () => {
  beforeAll(async () => {
    //Remove test user
    const prismaTest = new PrismaClient();
    await prismaTest.user.delete({
      where: {
        email: "test@test.com",
      },
    });
  });
  let testUser: User;
  test("GET /users retrieves all users", () => {
    supertest(app)
      .get("/users")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
      });
  });
  test("POST /users creates a new user", (done) => {
    supertest(app)
      .post("/users")
      .send({ name: "test", email: "test@test.com" })
      .expect(200)
      .then((res) => {
        expect(res.body.name).toEqual("test");
        expect(res.body.email).toEqual("test@test.com");
        testUser = res.body;
        done();
      })
      .catch((e) => done(e));
  });
  test("POST /users returns 400 if missing email in request body", (done) => {
    supertest(app).post("/users").send({ name: "test" }).expect(400).end(done);
  });
  test("GET /users/:id retrieves a user by given id", () => {
    supertest(app)
      .get(`/users/${testUser.id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.name).toEqual("test");
        expect(res.body.email).toEqual("test@test.com");
        expect(res.body.id).toEqual(testUser.id);
      });
  });
  test("GET /users/* returns 404", (done) => {
    supertest(app).get("/users/anything/else").expect(404).end(done);
  });
});
