import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.listen(8080, () => {
  console.log("you are at port 8080");
});

app.get("/", async (request, response) => {
  console.log("You are at my Root Route, how Roude!");
});

app.post("/message", async (request, response) => {
  const { name, message } = request.body;
  db.query(`INSERT INTO guestbook(name, message) VALUES($1, $2)`, [
    name,
    message,
  ]);
  response.json(" ");
});

app.get("/message", async (request, response) => {
  try {
    const result = await db.query("SELECT * FROM guestbook ORDER BY id DESC;");

    response.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting messages:", error);

    response.status(500).json({ error: "Internal server error" });
  }
});
