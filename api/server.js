import express from "express";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@vercel/kv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});


// Shorten URL endpoint
app.post("/shorten", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });
  const shortCode = nanoid(6);
  // CHANGE: Store in KV instead of variable
  await kv.set(shortCode, url);
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const shortUrl = `${baseUrl}/${shortCode}`;
  res.json({ shortUrl, shortCode });
});

// Redirect to original URL
// change to async
app.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;

  // CHANGE: Get from KV
  const originalUrl = await kv.get(shortCode);

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send("URL not found");
  }
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

export default app;
