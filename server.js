var models = require('./models');
var express = require('express');
var port = 3000;
var app = express();

app.use(require('morgan')('dev'));
app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));


app.post('/user', (req, res) => {
  console.log('user', req.body);
  models.Payment.create(req.body).then(result => {
    console.log('res: ', result.id);
    res.send(result.id.toString());
  });
});

app.put('/update', (req, res) => {
  models.Payment.update(req.body.options, {where: {id: req.body.id}}).then(result => {
    res.send(result);
  });
});

app.get('/payment', (req, res) => {
  console.log('query: ', req.query);
  let id = req.query.id;
  models.Payment.findOne({where: {id}}).then(response => {
    res.send(response);
  });
});

app.post('/address', (req, res) => {
  console.log('address', req.body);
  res.send('hi');
});

app.post('/cc', (req, res) => {
  console.log('cc', req.body);
  res.send('hi');
});


app.listen(port, () => {
  console.log(`Listening on ${port}`);
});