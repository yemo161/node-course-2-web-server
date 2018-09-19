const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('serve.log', log + '\n', (err) => {
        if (err)
            console.log(err);
    });
    next();
});
/*app.use((req:any, res:any, next:any  )=>{
    res.render('maintaince.hbs')
});*/
app.use(express.static(__dirname + '/public'));
/*app.get('/', (req:any, res:any)=>{
   // res.send('<h1>Hello Express!</h1>');
    res.send({
        name : 'orit',
        likes: [
            'Read'
        ]
    })
});*/
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome!!!'
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});
app.listen(port, () => {
    console.log(`Serve is up on port ${port}`);
});
//# sourceMappingURL=server.js.map