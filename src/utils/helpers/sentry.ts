import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { Application } from "express";
import { env } from "../../config";

export function SentryInit(app: Application) {
  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.SENTRY_ENV,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });
  const transaction = Sentry.startTransaction({
    op: "transaction",
    name: "Detoxify API transaction",
  });

  // Note that we set the transaction as the span on the scope.
  // This step makes sure that if an error happens during the lifetime of the transaction
  // the transaction context will be attached to the error event
  Sentry.configureScope((scope) => {
    scope.setSpan(transaction);
  });
}
