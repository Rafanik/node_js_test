const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();

    console.log(`${now}: ${req.method} ${req.url}`);
    next();
} )

// istotna kolejność, żeby 'use' się wcześniej wykonało
app.use(express.static(__dirname+'/public'));

// setting up a handle
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Hello my Guest!'
    });
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to perform'
    });
})


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
