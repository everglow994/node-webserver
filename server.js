var express = require('express');
var hbs = require('hbs');
var fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/partials' )
app.set('view engine','hbs');

// record log
app.use((req, res, next) => {
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile(`server.log`, log + '\n', (err) => {
    if(err) {
      console.log('unable to append to server.log');
    }
  })
  next();
});

// check maintain
// app.use((req, res, next) => {
//   res.render('maintain.hbs');
// });

// continue
app.use(express.static(__dirname + `/public`));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'welcome to my website',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  })
});


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'this is an error message'
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
