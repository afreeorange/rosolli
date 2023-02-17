import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import {
  CreateExpressContextOptions,
  createExpressMiddleware,
} from "@trpc/server/adapters/express";
import express, { Request, Response } from "express";
import cors from "cors";

import db, { statistics, genres, albums, songs, artists } from "./database";

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
  statistics: publicProcedure.query(() => statistics()),

  // TODO: Can these be in one giant endpoint?
  genres: publicProcedure.query(() => genres()),
  albums: publicProcedure.query(() => albums()),
  artists: publicProcedure.query(() => artists()),
  songs: publicProcedure.query(() => songs()),
});

// ---------- Express Stuff ----------

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Rosolli API! 🍠");
});

console.log("Database is", db.name);

app.listen(port, () => {
  console.log(`⚡️ Rosolli server is running at http://localhost:${port}`);
});

// ---------- Types ----------

export * from "./database";
