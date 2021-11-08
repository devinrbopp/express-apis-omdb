require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios')
const app = express();

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes are also know as controllers
app.get('/', function(req, res) {
  // this .send works well for a little message but not for web content
  // res.send('Hello, backend!');
  // res.render serves up render.ejs from the views folder
  res.render('index')
});

// THIS WAS MOVED TO OUR ROUTERS (CONTROLLERS/OMDBROUTES.JS) DIRECTORY
// // this is our results route aka controller
// app.get('/results', function(req, res) {
//   // this console.log displays our request object
//   // console.log('this is req.query',req.query)
//   let movieTitle = req.query.movieTitle
//   console.log('this is the movie title:', movieTitle)
//   // now we can use the movie title to build the request url, and make the call with axios
//   axios.get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${process.env.OMBD_API_KEY}`)
//     .then(apiRes => {
//       console.log('this is apiRes.data', apiRes.data)
//       let title = apiRes.data.Title
//       let year = apiRes.data.Year
//       let plot = apiRes.data.Plot
//       let imdbID = apiRes.data.imdbID
//       // res.render results to results.ejs, with our selected data sent as an object
//       res.render('results', {title, year, plot, imdbID})
//     })
//     .catch(err => {
//       console.log(err)
//     })
// })

app.use('/movies', require('./controllers/omdbRoutes.js'))

// sets our entry point to run our app/server (same thing in this case)
app.listen(process.env.PORT || 3000, () => {
  console.log(`listening to the sweet sounds ${process.env.PORT}. time to make some requests.`)
})

// The app.listen function returns a server handle
// var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
// module.exports = server;
