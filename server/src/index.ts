import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import {
  CreateExpressContextOptions,
  createExpressMiddleware,
} from "@trpc/server/adapters/express";
import express, { Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import { z } from "zod";

import streamRoutes from "./stream";
import db, {
  statistics,
  genres,
  albums,
  tracks,
  artists,
  trackById,
  search,
  tracksByGenre,
} from "./database";

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
  // TODO: Can these be in one giant endpoint?
  genres: publicProcedure.query(() => genres()),
  albums: publicProcedure.query(() => albums()),
  artists: publicProcedure.query(() => artists()),

  /**
   * TRACKS
   */
  tracks: publicProcedure.query(() => tracks()),
  tracksByGenre: publicProcedure
    .input(
      z.string({
        description: "Genre",
        required_error: "You must specify a genre",
      })
    )
    .query((req) => tracksByGenre(req.input)),

  track: publicProcedure
    .input(
      z
        .number({
          description: "The Song ID",
          required_error: "You must specify the Song ID",
        })
        .nullable()
    )
    .query(async (req) =>
      req.input ? await trackById(req.input) : Promise.resolve(null)
    ),

  search: publicProcedure
    .input(
      z.string({
        description: "The search term",
        required_error: "You must specify the search term",
      })
    )
    .query((req) => search(req.input)),

  statistics: publicProcedure.query(() => statistics()),
});

// ---------- Express Stuff ----------

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(
  compression({
    level: 9,
  })
);
app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));
app.use("/api/stream", streamRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("Welcome to the Rosolli API! 🍠");
});

console.log("Database is", db.name);

app.listen(port, () => {
  console.log(`⚡️ Rosolli server is running at http://localhost:${port}`);
});

// ---------- Types ----------

export * from "./database";
