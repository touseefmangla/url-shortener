// ============================================
// IMPORTS
// ============================================

// Express - Web framework for Node.js
import express from "express";

// Nanoid - Generate unique short codes for URLs
import { nanoid } from "nanoid";

// Path utilities for file system operations
import path from "path";

// Convert import.meta.url to file path (needed for ES modules)
import { fileURLToPath } from "url";

// Redis client for storing URL mappings
import Redis from "ioredis";

// ============================================
// CONFIGURATION
// ============================================

// Get current file path and directory (ES module compatibility)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express application
const app = express();

// Middleware: Parse incoming JSON request bodies
app.use(express.json());

// Middleware: Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "..", "public")));

// Initialize Redis connection using environment variable
// REDIS_URL should be set in .env.local for local dev or Vercel env vars for production
const kv = new Redis(process.env.REDIS_URL);

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Validate if a string is a valid URL
 * @param {string} string - The URL string to validate
 * @returns {boolean} - True if valid URL, false otherwise
 */
function isValidUrl(string) {
  try {
    const url = new URL(string);
    // Only allow http and https protocols
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (err) {
    return false;
  }
}

// ============================================
// API ROUTES
// ============================================

/**
 * POST /shorten
 * Create a shortened URL
 * 
 * Request body: { url: "https://example.com/very/long/url" }
 * Response: { shortUrl: "http://localhost:3000/abc123", shortCode: "abc123" }
 */
app.post("/shorten", async (req, res) => {
  try {
    // Extract the URL from request body
    const { url } = req.body;
    
    // Validate that URL was provided
    if (!url) return res.status(400).json({ error: "URL is required" });
    
    // Validate URL format
    if (!isValidUrl(url)) {
      return res.status(400).json({ 
        error: "Invalid URL format. Please provide a valid URL starting with http:// or https://" 
      });
    }
    
    // Generate a unique 6-character short code
    const shortCode = nanoid(6);
    
    // Store the mapping: shortCode -> originalUrl in Redis
    await kv.set(shortCode, url);
    
    // Construct the full shortened URL using current host
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const shortUrl = `${baseUrl}/${shortCode}`;
    
    // Return the shortened URL and code to the client
    res.json({ shortUrl, shortCode });
  } catch (error) {
    // Log error for debugging
    console.error("Error shortening URL:", error);
    
    // Return error response to client
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
});

/**
 * GET /:shortCode
 * Redirect to the original URL using the short code
 * 
 * Example: GET /abc123 -> redirects to https://example.com/very/long/url
 */
app.get("/:shortCode", async (req, res) => {
  try {
    // Extract the short code from URL parameters
    const { shortCode } = req.params;

    // Look up the original URL from Redis using the short code
    const originalUrl = await kv.get(shortCode);

    // If URL exists, redirect to it
    if (originalUrl) {
      res.redirect(originalUrl);
    } else {
      // If short code not found, return 404
      res.status(404).send("URL not found");
    }
  } catch (error) {
    // Log error for debugging
    console.error("Error retrieving URL:", error);
    
    // Return error response to client
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

// ============================================
// SERVER INITIALIZATION
// ============================================

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// Export app for Vercel serverless deployment
export default app;
