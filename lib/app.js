const express = require('express');

const Quote = require('../lib/models/Quotes');



const app = express();
app.use(express.json());





app.post('/api/v1/quotes', (req, res, next) => {
  Quote
    .insert(req.body)
    .then(quote => res.send(quote))
    .catch(next);
});


app.get('/api/v1/quotes', (res) => {
  Quote
    .find()
    .then(quote => res.send(quote));
});

app.get('/api/v1/quotes/:id', (req, res, next) => {
  Quote
    .findById(req.params.id)
    .then(quote => res.send(quote))
    .catch(next);
    
});


app.put('/api/v1/quotes/:id', (req, res, next) => {
  Quote  
    .update(req.params.id, req.body)
    .then(quote => res.send(quote))
    .catch(next);
});


app.delete('/api/v1/quotes/:id', (req, res) => {
  Quote
    .delete(req.params.id)
    .then(quote => res.send(quote))
    
  
});

module.exports = app;
