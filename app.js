const express = require('express'); 
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const db = require('./config/db'); // Databaseconfiguratie
const { body, validationResult } = require('express-validator');

// Laad environment-variabelen
dotenv.config();

// Middleware
app.use(bodyParser.json());

// POST route voor het toevoegen van een gebruiker met validatie
app.post('/api/users', [
  // Validaties voor gebruikersinvoer
  body('first_name').notEmpty().withMessage('Voornaam is verplicht'),
  body('last_name').notEmpty().withMessage('Achternaam is verplicht'),
  body('email').isEmail().withMessage('E-mail moet een geldig formaat hebben'),
  body('password').isLength({ min: 6 }).withMessage('Wachtwoord moet minimaal 6 tekens zijn'),
], (req, res) => {
  // Verwerken van validatiefouten
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { first_name, last_name, email, password } = req.body;

  // SQL-query om gebruiker toe te voegen
  const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
  db.query(query, [first_name, last_name, email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het toevoegen van de gebruiker.' });
    }
    res.status(201).json({ message: 'Gebruiker succesvol toegevoegd', id: result.insertId });
  });
});

// GET route voor het ophalen van alle nieuwsitems
app.get('/api/news', (req, res) => {
  const query = 'SELECT * FROM news';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van nieuwsitems.' });
    }
    res.status(200).json(results);
  });
});

// POST route voor het toevoegen van een nieuwsitem
app.post('/api/news', [
  body('user_id').isInt().withMessage('User_id moet een integer zijn'),
  body('title').notEmpty().withMessage('Title is verplicht'),
  body('content').notEmpty().withMessage('Content is verplicht'),
  body('image_url').optional().isURL().withMessage('Image_url moet een geldige URL zijn'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user_id, title, content, image_url } = req.body;

  const query = 'INSERT INTO news (user_id, title, content, image_url) VALUES (?, ?, ?, ?)';
  db.query(query, [user_id, title, content, image_url], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het toevoegen van het nieuwsitem.' });
    }
    res.status(201).json({ message: 'Nieuwsitem succesvol toegevoegd', id: result.insertId });
  });
});

// PUT route voor het bijwerken van een nieuwsitem
app.put('/api/news/:id', [
  body('title').notEmpty().withMessage('Title is verplicht'),
  body('content').notEmpty().withMessage('Content is verplicht'),
  body('image_url').optional().isURL().withMessage('Image_url moet een geldige URL zijn'),
], (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, image_url } = req.body;

  const query = 'UPDATE news SET title = ?, content = ?, image_url = ? WHERE id = ?';
  db.query(query, [title, content, image_url, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het bijwerken van het nieuwsitem.' });
    }
    res.status(200).json({ message: 'Nieuwsitem succesvol bijgewerkt' });
  });
});

// DELETE route voor het verwijderen van een nieuwsitem
app.delete('/api/news/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM news WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het verwijderen van het nieuwsitem.' });
    }
    res.status(200).json({ message: 'Nieuwsitem succesvol verwijderd' });
  });
});

// Externe routes importeren (gebruik alleen als extra functionaliteit in routes is toegevoegd)
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
app.use('/api', userRoutes);
app.use('/api', newsRoutes);

// API-documentatie route
app.get('/', (req, res) => {
  res.send('<h1>API Documentation</h1><p>Endpoints zijn beschikbaar onder /api</p>');
});

// Route om details van een specifieke gebruiker op te halen
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params; // Haal de `id` uit de URL
    const query = 'SELECT * FROM users WHERE id = ?';
  
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error(err); // Log de fout voor debuggen
        return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van de gebruiker.' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Gebruiker niet gevonden.' });
      }
  
      res.status(200).json(results[0]); 
    });
  });
  
  

  app.get('/api/news/:id', (req, res) => {
    const { id } = req.params; 
    const query = 'SELECT * FROM news WHERE id = ?';
  
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error(err); 
        return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van het nieuwsitem.' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Nieuwsitem niet gevonden.' });
      }
  
      res.status(200).json(results[0]); 
    });
  });
  
  
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
