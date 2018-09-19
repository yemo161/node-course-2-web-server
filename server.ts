const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port=process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req:any, res:any, next:any  )=>{
    var now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('serve.log', log +'\n', (err:any)=>{
        if(err)
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

hbs.registerHelper('getCurrentYear', ()=>{
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text:string)=>{
   return text.toUpperCase();
});

app.get('/', (req:any, res:any)=>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome!!!'
    })
});

app.get('/about', (req:any, res:any)=>{
    res.render('about.hbs', {
        pageTitle: 'About page'
    })
});

app.get('/projects', (req:any, res:any)=>{
    res.render('projects.hbs', {
        pageTitle: 'Projects page'
    });
});

app.get('/bad', (req:any, res:any) =>{
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, ()=> {
    console.log(`Serve is up on port ${port}`);
});

