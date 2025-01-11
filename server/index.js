const cors = require('cors');
const express = require('express');
const path = require('path');
const videogameDevelopersRoute = require('./routes/videogameDevelopersRoute');
const videogamePlatformsRoute = require('./routes/videogamePlatformsRoute');
const videogamePublishersRoute = require('./routes/videogamePublishersRoute');
const videogamesRoute = require('./routes/videogamesRoute');

// Initialize and configure the Express web framework:

const app = express();

const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));
app.use("/static", express.static(path.join(__dirname, "covers")));
app.use(express.urlencoded({ extended: false }));

app.use('/api/videogameDevelopers', videogameDevelopersRoute);
app.use('/api/videogamePlatforms', videogamePlatformsRoute);
app.use('/api/videogamePublishers', videogamePublishersRoute);
app.use('/api/videogames', videogamesRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "views", 'index.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
