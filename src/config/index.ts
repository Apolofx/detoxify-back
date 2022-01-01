const env = {
  SENTRY_DSN: process.env.SENTRY_DSN,
  SENTRY_ENV: process.env.NODE_ENV || "dev",
  NODE_ENV: process.env.NODE_ENV || "dev",
  DATABASE_URL: process.env.DATABASE_URL,
};

export { env };
