import dotenv from "dotenv";
import app from "./app.js";
import { connectToDatabase } from "./config/db.js";

// Laddar in miljövariabler från .env
dotenv.config();

//Port hämtas från .env annars används standard 3000
const port = process.env.PORT || 3000;

// starta applikationen: anslut till DB och börja lyssna
async function startServer() {
  // Anslut till MongoDB
  await connectToDatabase();

  // starta Express-servern på den angivna porten
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server lyssnar på port ${port}`);
  });
}

// fångr upp startfel och avsluta processen om något går fel
startServer().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Kunde inte starta servern:", error);
  process.exit(1);
});
