import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import {
  CreateExpressContextOptions,
  createExpressMiddleware,
} from "@trpc/server/adapters/express";

import express, { Request, Response } from "express";
import cors from "cors";

// ---------- tRPC Stuff ----------

const createContext = ({ req, res }: CreateExpressContextOptions) => ({
  req,
  res,
});
export type Context = inferAsyncReturnType<typeof createContext>;
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

export type AppRouter = typeof appRouter;

// ---------- Express Stuff ----------

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port}`);
});
