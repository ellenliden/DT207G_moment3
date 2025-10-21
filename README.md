# Work Experiences REST API (Node.js + Express + MongoDB)

En REST‑webbtjänst för att hantera arbetserfarenheter (CRUD) med Node.js, Express och MongoDB (Mongoose). JSON, CORS aktiverat och input‑validering.

## Förutsättningar

- Node.js
- MongoDB Atlas (rekommenderat) eller lokal MongoDB

## Kom igång

1. Klona [detta repo](https://github.com/ellenliden/DT207G_moment3.git) och installera paket med:

   ```bash
   npm install
   ```

2. Miljövariabler

   ```bash
   cp .env.example .env
   ```

   Fyll i `.env` med dina värden.
   API:t använder följande variabler:

   - MONGODB_URI: anslutningssträng till MongoDB (lokalt eller Atlas)
   - PORT: port för API (default 3000)
   - NODE_ENV: environment (development/production)

   Exempel (.env) – Lokal MongoDB:

   ```bash
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/experiences_db
   ```

   Exempel (.env) – MongoDB Atlas (rekommenderat):

   ```bash
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb+srv://användarnamn:lösenord@kluster.xxxxx.mongodb.net/experiences_db?retryWrites=true&w=majority
   ```

3. Starta API
   ```bash
   npm run dev   # utveckling (nodemon)
   # eller
   npm start     # produktion
   ```
4. Hälsokontroll
   - GET http://localhost:3000/ --> { "message": "API uppe" }

## Datamodell (Mongoose)

Kollektionsnamn: `workexperiences` (db: `experiences_db`).
Fält:

- `company` (String, required)
- `title` (String, required)
- `startDate` (Date, required)
- `endDate` (Date, optional)
- `description` (String, required, max 2000)
- `location` (String, optional)

Exempel‑dokument:

```json
{
  "company": "MIUN",
  "title": "Backend Developer",
  "startDate": "2022-01-01",
  "endDate": "2023-06-30",
  "description": "Byggde REST API:er i Node.js",
  "location": "Sundsvall"
}
```

## Endpoints

Bas‑URL: `/api/experiences`

- GET `/` – lista alla
- GET `/:id` – hämta en
- POST `/` – skapa ny
- PUT `/:id` – uppdatera
- DELETE `/:id` – ta bort

## Testa med curl

- Skapa (POST):
  ```bash
  curl -X POST http://localhost:3000/api/experiences \
    -H "Content-Type: application/json" \
    -d '{
      "company":"MIUN",
      "title":"Developer",
      "startDate":"2023-01-01",
      "endDate":"2025-01-10",
      "description":"utveckling av app och web",
      "location":"Sundsvall"
    }'
  ```
- Lista alla (GET):
  ```bash
  curl http://localhost:3000/api/experiences
  ```
- Hämta en (GET):
  ```bash
  curl http://localhost:3000/api/experiences/<ID>
  ```
- Uppdatera (PUT):
  ```bash
  curl -X PUT http://localhost:3000/api/experiences/<ID> \
    -H "Content-Type: application/json" \
    -d '{
      "company":"MIUN",
      "title":"Senior Developer",
      "startDate":"2023-01-01",
      "endDate":"2025-01-10",
      "description":"uppdaterad beskrivning",
      "location":"Sundsvall"
    }'
  ```
- Ta bort (DELETE):
  ```bash
  curl -X DELETE http://localhost:3000/api/experiences/<ID>
  ```

## Testa i MongoDB Compass

### Lokal MongoDB

- Anslut: `mongodb://localhost:27017`
- Skapa db `experiences_db` och collection `workexperiences`

### MongoDB Atlas

- Anslut med Atlas connection string
- Databas och collection skapas automatiskt vid första POST-request
- Data syns direkt i Atlas-dashboard

## CORS och validering

- CORS är aktiverat globalt (app.use(cors())).
- Input‑validering med `express-validator` (krav på company, title, startDate, description m.m.).
- Fel returneras i JSON med tydliga meddelanden.

## Struktur

- `src/app.js` – Express app (CORS, JSON, routes)
- `src/server.js` – startpunkt (env, DB, lyssna)
- `src/config/db.js` – MongoDB‑anslutning (Mongoose)
- `src/models/WorkExperience.js` – schema och modell
- `src/controllers/experiencesController.js` – CRUD‑logik
- `src/routes/experiences.js` – routes + validering

## Publicering

### Backend (moment 3, steg 1)

- **Render**: https://dt207g-moment3-rf1t.onrender.com
- **GitHub**: https://github.com/ellenliden/DT207G_moment3.git
- **MongoDB Atlas**: Används för produktion (connection string sätts som environment variable i Render, lagt in info från .env-filen)

### Frontend (moment 3, steg 2)

- **Render**: https://dt207g-moment3-2.onrender.com
- **GitHub**: https://github.com/ellenliden/DT207G_moment3_2.git

## Kontakt

Ellen Lidén

elli1807@student.miun.se
