if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');
const app = express();

app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({extended: false, limit: '10mb'}));

mongoose.connect(process.env.DATABASE_URL);
// const db = mongoose.connection;
// db.on('error', err => console.error(err));
// db.on('open', () => console.log('Connected To Server'));

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.listen(process.env.PORT || 3000);