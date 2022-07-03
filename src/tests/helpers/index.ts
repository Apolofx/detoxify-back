//TODO add environment variables for test purposes only
import dotenv from "dotenv";
dotenv.config();
import request from "supertest";
import { User } from "@prisma/client";

//use this relative route since using module-alias involves extra config in jest.config.js
import prismaTest from "@database";

interface TestUser extends User {
  token: string;
}

export class TestUserFactory {
  appInstance: Express.Application;
  constructor(_app: Express.Application) {
    this.appInstance = _app;
  }

  async CreateAdmin(): Promise<TestUser> {
    let testUserAdmin: TestUser;
    try {
      await prismaTest.user.delete({
        where: {
          email: "admin_test_user@test.com",
        },
      });
    } catch (e: any) {
      if (e.code === "P2025") console.log("No users found to delete");
    }
    //create new authenticated admin user and login
    const admin = await request(this.appInstance)
      .post("/api/auth/register")
      .send({
        name: "admin_test_user",
        email: "admin_test_user@test.com",
        password: "admin_test_user",
      });
    // update admin user with ADMIN role
    await prismaTest.user.update({
      data: {
        role: "ADMIN",
      },
      where: {
        email: "admin_test_user@test.com",
      },
    });
    // get admin login data
    const loggedAdmin = await request(this.appInstance)
      .post("/api/auth/login")
      .send({
        email: "admin_test_user@test.com",
        password: "admin_test_user",
      });

    testUserAdmin = (await prismaTest.user.findUnique({
      where: {
        email: "admin_test_user@test.com",
      },
    })) as TestUser;
    testUserAdmin.token = loggedAdmin.body.token;
    return testUserAdmin;
  }

  async CreateRegular(): Promise<TestUser> {
    let testUserRegular: TestUser;
    try {
      await prismaTest.user.delete({
        where: {
          email: "regular_test_user@test.com",
        },
      });
    } catch (e: any) {
      if (e.code === "P2025") console.log("No users found to delete");
    }
    //create new authenticated regular user
    const regular = await request(this.appInstance)
      .post("/api/auth/register")
      .send({
        name: "regular_test_user",
        email: "regular_test_user@test.com",
        password: "regular_test_user",
      });
    const loggedRegular = await request(this.appInstance)
      .post("/api/auth/login")
      .send({
        email: "regular_test_user@test.com",
        password: "regular_test_user",
      });
    testUserRegular = (await prismaTest.user.findUnique({
      where: {
        email: "regular_test_user@test.com",
      },
    })) as TestUser;
    testUserRegular.token = loggedRegular.body.token;
    return testUserRegular;
  }
}
