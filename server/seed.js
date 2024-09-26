import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function makeTable() {
  await db.query("DROP TABLE IF EXISTS guestbook");
  await db.query(`CREATE TABLE guestbook (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text,
  message text
  );`);
  await db.query(
    `INSERT INTO guestbook (name, message) VALUES ('Obi-Wan', 'Hello There')`
  );
}

makeTable();
