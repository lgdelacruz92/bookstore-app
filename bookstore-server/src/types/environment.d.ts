// src/types/environment.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    MONGOOSE_USER?: string;
    MONGOOSE_PASSWORD?: string;
  }
}
