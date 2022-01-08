import { createUser, getUser, getUsers } from "./users.swagger";
import { env } from "../config";
const { PORT, ENV } = env;

export const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Detoxify API",
    description: "Detoxify main API docs",
    termsOfService: "",
    contact: {
      name: "Juan Ignacio Consolani",
      email: "nacho.conso@gmail.com",
      url: "https://apolodev.ar",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api`,
      description: `${ENV} server`,
    },
  ],
  tags: [
    {
      name: "Users",
    },
  ],
  paths: {
    "/users": {
      get: getUsers,
      post: createUser,
    },
    "/users/{userId}": {
      get: getUser,
    },
  },
  components: {
    schemas: {
      ArrayOfUsers: {
        type: "array",
        items: {
          $ref: "#/components/schemas/User",
        },
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int32",
          },
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
          teamId: {
            type: "integer",
            format: "nullable",
          },
        },
      },
    },
  },
};
