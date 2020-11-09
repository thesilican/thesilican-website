import express from "express";

const app = express();

app.get("/api/ping", (req, res) => {
  res.json({
    message: "pong",
  });
});

app.get("*", (req, res) => {
  const path = req.path;
  const url = new URL("https://github.com/thesilican" + path);
  res.redirect(url.toString());
});

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log("Listening on port", PORT));
