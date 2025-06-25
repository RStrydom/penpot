import express from "express";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

app.use(compression());

// Serve static files from resources/public
const staticPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "resources/public",
);

app.use(express.static(staticPath));

// Fallback for SPA routing - serve index.html for any route that doesn't match a file
app.get("*", (req, res) => {
  // For now, serve a simple message since we don't have the compiled app yet
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Penpot Development Server</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
            margin: 0;
            padding: 40px;
            background: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .status { color: #666; margin-bottom: 20px; }
          .error { color: #d73a49; background: #ffeef0; padding: 16px; border-radius: 4px; margin: 20px 0; }
          .info { color: #0366d6; background: #f1f8ff; padding: 16px; border-radius: 4px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎨 Penpot Development Server</h1>
          <div class="status">Development server is running on port ${port}</div>
          
          <div class="info">
            <strong>Asset Compilation in Progress</strong><br>
            The frontend assets (CSS, images, etc.) are currently being compiled. 
            The ClojureScript compilation requires additional setup.
          </div>
          
          <div class="error">
            <strong>ClojureScript Compilation Missing</strong><br>
            The Clojure CLI tools are not installed in this environment. 
            To fully run Penpot, you'll need:
            <ul>
              <li>Java Development Kit (JDK)</li>
              <li>Clojure CLI tools</li>
              <li>Shadow-cljs for ClojureScript compilation</li>
            </ul>
          </div>
          
          <h3>Current Status:</h3>
          <ul>
            <li>✅ Node.js and Yarn - Ready</li>
            <li>🔄 SCSS Compilation - In Progress</li>
            <li>❌ ClojureScript Compilation - Missing Dependencies</li>
            <li>❌ Application JavaScript - Not Available</li>
          </ul>
          
          <h3>What's Working:</h3>
          <ul>
            <li>Asset compilation (CSS, images, SVG sprites)</li>
            <li>Template processing</li>
            <li>File watching and hot reload for assets</li>
          </ul>
          
          <p>This is a complex ClojureScript application that requires the full development environment setup described in the project documentation.</p>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Penpot development server listening at http://0.0.0.0:${port}`);
  console.log(`Static files served from: ${staticPath}`);
});
