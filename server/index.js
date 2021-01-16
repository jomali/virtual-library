const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const videogamePlatformsRoute = require('./routes/videogamePlatformsRoute');

const path = __dirname + '/views/';
const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path));
app.use('/api/videogamePlatforms', videogamePlatformsRoute);

app.get('/', (req, res) => {
  res.sendFile(path + 'index.html');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
