const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 3000;
//middelware
app.use(express.static('public'));
app.use(express.json());

//view engine 
app.set('view engine', 'ejs');
//database connection 
const dbURI = 'mongodb://127.0.0.1:27017/jwt-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(port, () => console.log(`Example app listening on port ${port}!`)))
    .catch((err) => console.log(err));

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);