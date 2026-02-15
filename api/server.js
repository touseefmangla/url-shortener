import express from "express";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// In-memory storage (use a database for production)
const urlDatabase = {};

// Shorten URL endpoint
app.post("/shorten", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Generate short code
  const shortCode = nanoid(6); // generates random 6-character string

  // Store mapping
  urlDatabase[shortCode] = url;

  // Return shortened URL
  const shortUrl = `http://localhost:3000/${shortCode}`;
  res.json({ shortUrl, shortCode });
});

// Redirect to original URL
app.get("/:shortCode", (req, res) => {
  const { shortCode } = req.params;
  const originalUrl = urlDatabase[shortCode];

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
