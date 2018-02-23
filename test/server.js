const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res) => {
  fs.createReadStream(path.join(__dirname, 'jsonp.test.html'))
    .pipe(res);
});

app.get('/:path', (req, res) => {
  res.send(JSON.stringify(req.query));
  // res.send('alert(1)');
});

app.listen(8080);

console.log(`Server is running at 8080.`); // eslint-disable-line
