const express = require('express');
const app = express();
const dotenv = require('dotenv');
const newsRoutes = require('./routes/newsRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/api', newsRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
