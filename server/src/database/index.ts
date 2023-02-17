import Database from "better-sqlite3";
import process from "process";

const DATABASE_PATH = process.env["DATABASE"] || "";

if (!DATABASE_PATH) {
  console.log("Database not set! App will not work, yo");
  process.exit(1);
}

// TODO: Try/Catch
const db = new Database(DATABASE_PATH);
db.pragma("journal_mode=WAL");

console.log("Connected to the SQLite database");

export * from "./statistics";
export * from "./genres";
export * from "./albums";
export * from "./artists";
export * from "./songs";
export default db;
