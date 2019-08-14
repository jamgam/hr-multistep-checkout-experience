var express = require('express');
var port = 3000;
var app = express();

app.use(express.static('node_modules'));
app.use(express.static('public'));

app.post('/user', (req, res) => {
  res.send('hi');
});


app.listen(port, () => {
  console.log(`Listening on ${port}`);
});