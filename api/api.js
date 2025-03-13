import express from "express";
import morgan from "morgan";
import cors from "cors";
import process from "process";
import dotenv from "dotenv";

import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: "../.env" });

const API_KEY = process.env.API_KEY;
const PROJECT_URL = process.env.PROJECT_URL;

const app = express();

app.use(morgan("combined"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const supabase = createClient(PROJECT_URL, API_KEY);

app.get("/words", async (req, res) => {
  const { data, error } = await supabase.from("words").select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get("/categories", async (req, res) => {
  const { data, error } = await supabase.from("categories").select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/categories", async (req, res) => {
  const { data, error } = await supabase.from("categories").insert({
    name: req.body.name,
  });
  if (error) return res.status(500).json(error);
  res.json({ message: "Successfully added category", addedCategory: data });
});

app.post("/words", async (req, res) => {
  const { data, error } = await supabase.from("words").insert({
    word: req.body.word,
    image: req.body.image,
    category: req.body.category,
    isCategory: req.body.isCategory,
    isCategoryId: req.body.isCategoryId,
  });
  if (error) return res.send(error);
  res.json({ message: "Successfully added word", addedWord: data });
});

app.put("/words/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  const { data, error } = await supabase
    .from("words")
    .update({
      word: req.body.word,
      image: req.body.image,
      category: req.body.category,
      isCategory: req.body.isCategory,
      isCategoryId: req.body.isCategoryId,
    })
    .eq("id", id);

  if (error) return res.status(500).json(error);

  if (data.length === 0)
    return res.status(404).json({ error: "Word not found" });

  res.json({ message: "Successfully updated word", updatedWord: data });
});

app.delete("/words/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });

  const { data, error } = await supabase
    .from("words")
    .delete()
    .eq("id", id)
    .select();

  if (error) return res.status(500).json(error);

  if (data.length === 0)
    return res.status(404).json({ error: "Word not found" });

  res.json({ message: "Word successfully deleted", deletedWord: data });
});

app.get("/", (req, res) => {
  res.send("SpeakEasy API...");
});

app.listen(3000, () => {
  console.log(`> Ready on http://localhost:3000`);
});
