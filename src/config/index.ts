const env = {
  SENTRY_DSN: process.env.SENTRY_DSN,
  SENTRY_ENV: process.env.NODE_ENV || "dev",
  ENV: process.env.NODE_ENV || "dev",
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
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

export { env };
