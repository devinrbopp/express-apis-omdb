const express = require('express')
const router = express.Router()
const axios = require('axios')

// this is our results route aka controller
router.get('/results', function(req, res) {
    let movieTitle = req.query.movieTitle

    axios.get(`http://www.omdbapi.com/?s=${movieTitle}&apikey=${process.env.OMBD_API_KEY}`)
        .then(apiResults => {
            // console.log(apiResults.data.Search)
            const results = apiResults.data.Search
            res.render('results.ejs', {results})
        })
        .catch(err => {
            console.log(err)
        })
})

// we want to make this a real index, so we'll use a different axios call
// we'll also use a different route to hit for that
// finally, we'll render a different page
router.get('/:movie_id', function(req, res) {
    // this console.log displays our request object
    // console.log('this is req.query',req.query)
    let imdbId = req.params.movie_id
    // console.log('this is the movie title:', imdbId)
    // now we can use the movie title to build the request url, and make the call with axios
    axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMBD_API_KEY}&i=${imdbId}`)
      .then(apiRes => {
        // console.log('this is apiRes.data', apiRes.data)
        let title = apiRes.data.Title
        let year = apiRes.data.Year
        let plot = apiRes.data.Plot
        let imdbID = apiRes.data.imdbID
        let poster = apiRes.data.Poster
        // res.render results to results.ejs, with our selected data sent as an object
        res.render('detail.ejs', {title, year, plot, imdbID, poster})
      })
      .catch(err => {
        console.log(err)
      })
  })

module.exports = router