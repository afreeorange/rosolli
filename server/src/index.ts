import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import {
  CreateExpressContextOptions,
  createExpressMiddleware,
} from "@trpc/server/adapters/express";
import express, { Request, Response } from "express";
import cors from "cors";

import db from "./database";

// ---------- tRPC Stuff ----------

export type Context = inferAsyncReturnType<typeof createContext>;
export type AppRouter = typeof appRouter;

const createContext = ({ req, res }: CreateExpressContextOptions) => ({
  req,
  res,
});

const t = initTRPC.context<Context>().create();
const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  greet: publicProcedure
    .input((v: unknown) => {
      if (typeof v === "string") return v;
      throw new Error(`Invalid input: ${typeof v}`);
    })
    .query(({ input }) => ({ greeting: `hello, ${input}!` })),
});

// ---------- Express Stuff ----------

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Rosolli API! 🍠");
});

console.log("db.name :>> ", db.name);

app.listen(port, () => {
  console.log(`⚡️ Rosolli server is running at http://localhost:${port}`);
});
