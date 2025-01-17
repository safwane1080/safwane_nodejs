# Safwane Node.js Project

Dit is een Node.js-gebaseerd project dat voldoet aan de vereisten voor een dynamische data-gedreven API. De API biedt functionaliteiten zoals CRUD-acties, validaties, paginatie, zoekfuncties en documentatie.

## Projectbeschrijving

Dit project biedt API die gebruikers in staat stelt om:
- Gegevens te beheren via CRUD-acties.
- Zoekopdrachten uit te voeren en resultaten te pagineren.
- Valide invoer te waarborgen via basisvalidaties.
- Toegang te krijgen tot een documentatiepagina op de root van de applicatie.

## Features

### Functionele Vereisten

1. **CRUD-acties voor twee entiteiten (Users en News):**
   - Ophalen van een lijst met entiteiten.
   - Ophalen van details van een specifieke entiteit.
   - Toevoegen van een nieuwe entiteit.
   - Bewerken van een bestaande entiteit.
   - Verwijderen van een entiteit.

2. **Validaties:**
   - Velden mogen niet leeg zijn.
   - Numerieke velden accepteren geen tekst.
   - Strings zoals namen mogen geen cijfers bevatten.

3. **Paginatie:**
   - Een endpoint voor het ophalen van entiteiten met `limit` en `offset` parameters.

4. **Zoekfunctie:**
   - Een endpoint voor het zoeken naar nieuwsitems op basis van een veld, zoals titel.

5. **Documentatiepagina:**
   - Een statische HTML-pagina beschikbaar op de root (`public/index.html`) met een overzicht van alle API-endpoints.

## Technische Vereisten

- **Node.js** >= 20.0
- **MySQL** als databaseserver
- **Postman** (aanbevolen voor testen)

## Installatie

### Vereisten

Zorg dat de volgende software is geïnstalleerd:
- Node.js
- MySQL

### Stappen voor Lokale Installatie

1. **Clone de repository:**

   ```bash
   git clone https://github.com/safwane1080/safwane_nodejs.git
   cd safwane_nodejs


## Installatie
1. Clone het repository: `git clone https://github.com/safwane1080/safwane_nodejs.git`
2. Installeer dependencies: `npm install`
3. Start de server: `npm start`

## Installeer afhankelijkheden:

````
npm install

````
Maak een .env bestand en configureer databasegegevens door .env.example te kopiëren:

---
cp .env.example .env
---

## Bewerk de .env en voeg je databasegegevens toe:

DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=jouw_database
DB_USERNAME=jouw_gebruiker
DB_PASSWORD=jouw_wachtwoord

## Initialiseer de database en zet dit in een sql cmd:

- CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

- CREATE TABLE news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);


## Start de applicatie:

---
node app.js
---

## De API is nu bereikbaar op:
http://localhost:3000



## Gebruik
Postman-commando's
Gebruik de Postman-collectie in je repository om de API te testen. Beschikbare endpoints omvatten:

## Users:
- GET /users
- GET /users/:id
- POST /users
- PUT /users/:id
- DELETE /users/:id
## News:
- GET /news
- GET /news/:id
- POST /news
- PUT /news/:id
- DELETE /news/:id
- GET /news/search?title=keyword

- Documentatiepagina
- Bekijk de API-documentatie door naar de root van de applicatie te navigeren:
http://localhost:3000


## Erkenningen
Node.js-documentatie
Express.js-documentatie
ChatGPT ondersteuning 
