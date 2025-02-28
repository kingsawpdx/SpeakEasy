import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import process from "process";
import dotenv from "dotenv";

import { createClient } from "@supabase/supabase-js";

//dotenv.config({ path: "../.env" });
dotenv.config();

const API_KEY = process.env.API_KEY;
const PROJECT_URL = process.env.PROJECT_URL;

const app = express();

app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const supabase = createClient(PROJECT_URL, API_KEY);

app.get("/words", async (req, res) => {
  const { data, error } = await supabase.from("/words").select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(3000, () => {
  console.log(`> Ready on http://localhost:3000`);
});
