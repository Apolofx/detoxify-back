export const getUsers = {
  tags: ["Users"],
  description: "Returns all users from the system that the user has access to",
  operationId: "getUsers",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    "200": {
      description: "A list of users.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ArrayOfUsers" },
        },
      },
    },
  },
};

export const getUser = {
  tags: ["Users"],
  description: "Returns a user by the given id",
  operationId: "getUser",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      in: "path",
      name: "userId",
      schema: {
        type: "integer",
      },
      required: true,
      description: "Numeric ID for the user to get",
    },
  ],
  responses: {
    "200": {
      description: "A User.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/User" },
        },
      },
    },
  },
};

export const createUser = {
  tags: ["Users"],
  description: "Creates a new user with the given request body information",
  operationId: "createUser",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              description: "User name",
              type: "string",
            },
            email: {
              description: "User email",
              type: "string",
            },
          },
          required: ["status"],
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Created user.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/User" },
        },
      },
    },
  },
};
