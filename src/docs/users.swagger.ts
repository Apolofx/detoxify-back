export const getUsers = {
  tags: ["Users"],
  description: "Returns all users from the system that the user has access to",
  operationId: "getUsers",
  security: [{ bearerAuth: [] }],
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

export const getUserDetails = {
  tags: ["Users"],
  description: "Returns a user with their details",
  operationId: "getUserDetails",
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
      description: "A User with their details.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/UserDetails" },
        },
      },
    },
  },
};

export const getUserAchievements = {
  tags: ["Users"],
  description: "Returns a user with their achievements",
  operationId: "getUserAchievements",
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
      description: "A User with their achievements.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/UserAchievements" },
        },
      },
    },
  },
};
export const getUserSnapshot = {
  tags: ["Users"],
  description: "Returns a user with their achievements, details and config",
  operationId: "getUserSnapshot",
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
      description: "A User with their details, config and achievements.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/UserSnapshot" },
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
            password: {
              description: "password",
              type: "string",
            },
            email: {
              description: "User email",
              type: "string",
            },
          },
          required: ["password", "email"],
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

export const login = {
  tags: ["Auth"],
  description: "Get the authorization token for a given user",
  operationId: "getAccessToken",
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
            password: {
              description: "password",
              type: "string",
            },
            email: {
              description: "User email",
              type: "string",
            },
          },
          required: ["password", "email"],
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Authenticated user's token.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Token" },
        },
      },
    },
  },
};

export const register = {
  tags: ["Auth"],
  description: "Get the authorization token for a given user",
  operationId: "createUserAdminAccess",
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
            password: {
              description: "password",
              type: "string",
            },
            email: {
              description: "User email",
              type: "string",
            },
          },
          required: ["password", "email"],
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Authenticated user's token.",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Token" },
        },
      },
    },
  },
};
