import express from "express";
import cors from "cors";

const app = express();

// Aktivera CORS så att andra domäner kan anropa API:et
app.use(cors());

//Tolkar inkommande JSON i request-body så att jag kan använda req.body
app.use(express.json());

// "Hälsokontroll"-endpoint för att se att API:et är igång
app.get("/", (req, res) => {
  res.json({ message: "API uppe" });
});

export default app;
