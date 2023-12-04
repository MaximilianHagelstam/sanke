import express from "express";

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  return res.json({ message: "Hello team!" });
});

app.listen(PORT, () => {
  console.info(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
