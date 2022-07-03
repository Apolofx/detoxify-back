import {
  createUser,
  getUser,
  getUserAchievements,
  getUserDetails,
  getUsers,
  getUserSnapshot,
  login,
  register,
} from "./users.swagger";
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
    "/users/{userId}/details": {
      get: getUserDetails,
    },
    "/users/{userId}/achievements": {
      get: getUserAchievements,
    },
    "/users/{userId}/snapshot": {
      get: getUserSnapshot,
    },
    "/auth/login": {
      post: login,
    },
    "/auth/register": {
      post: register,
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        beaererFormat: "JWT",
        in: "header",
      },
    },
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
          },
          email: {
            type: "string",
          },
          name: {
            type: "string",
          },
          role: {
            type: "string",
          },
          notificationToken: {
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
      UserDetails: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          email: {
            type: "string",
          },
          name: {
            type: "string",
          },
          role: {
            type: "string",
          },
          notificationToken: {
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
          userDetails: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              location: {
                type: "string",
              },
              age: {
                type: "integer",
              },
              gender: {
                type: "string",
              },
              smokerTime: {
                type: "integer",
              },
              smokesPerDay: {
                type: "integer",
              },
              quitAt: {
                type: "string",
              },
              sports: {
                type: "boolean",
              },
              createdAt: {
                type: "string",
              },
              updatedAt: {
                type: "string",
              },
              userId: {
                type: "integer",
              },
            },
          },
        },
        required: [],
      },
      UserAchievements: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          email: {
            type: "string",
          },
          name: {
            type: "string",
          },
          role: {
            type: "string",
          },
          notificationToken: {
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
          },
          achievements: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Achievement",
            },
          },
        },
      },
      UserSnapshot: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          email: {
            type: "string",
          },
          name: {
            type: "string",
          },
          role: {
            type: "string",
          },
          notificationToken: {
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
          },
          achievements: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Achievement",
            },
          },
          userDetails: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              location: {
                type: "string",
              },
              age: {
                type: "integer",
              },
              gender: {
                type: "string",
              },
              smokerTime: {
                type: "integer",
              },
              smokesPerDay: {
                type: "integer",
              },
              quitAt: {
                type: "string",
              },
              sports: {
                type: "boolean",
              },
              createdAt: {
                type: "string",
              },
              updatedAt: {
                type: "string",
              },
              userId: {
                type: "integer",
              },
            },
          },
          userConfig: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              locale: {
                type: "string",
              },
              userId: {
                type: "integer",
              },
            },
          },
        },
      },
      Achievement: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          name: {
            type: "string",
          },
          userId: {
            type: "integer",
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
        },
      },
      Token: {
        type: "object",
        properties: {
          token: {
            type: "string",
            format: "JWT",
          },
        },
      },
    },
  },
};
