const http = require("http");
const fs = require("fs");
const path = require("path");

let server;

let cachedHtmlContent = null;
fs.readFile(path.join(__dirname, "index.html"), (err, content) => {
  if (err) throw err;
  cachedHtmlContent = content;
  // Start the server after caching the content
  startServer();
});

function startServer() {
  server = http.createServer((req, res) => {
    if (cachedHtmlContent) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(cachedHtmlContent);
    } else {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  });

  const PORT = 8000;

  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

process.on("SIGTERM", () => {
  if (server) {
    server.close(() => {
      console.log("Server closed gracefully");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
