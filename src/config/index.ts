const env = {
  SENTRY_DSN: process.env.SENTRY_DSN,
  SENTRY_ENV: process.env.NODE_ENV || "dev",
  ENV: process.env.NODE_ENV || "dev",
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET || "",
};

export const GENDER = [
  "MALE",
  "FEMALE",
  "TRANSGENDER",
  "NEUTRAL",
  "NON_BINARY",
  "AGENDER",
  "PANGENDER",
];

export const USER_EVENTS = ["QUIT", "RELAPSE", "PANIC_ATTACK", "ANXIETY"];

export const USER_ROLE_LEVELS = Object.freeze({
  ADMIN: 1,
  REGULAR: 0,
});

export const USER_ROLE_NAMES = Object.freeze({
  ADMIN: "ADMIN",
  REGULAR: "REGULAR",
});

export { env };
