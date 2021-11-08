const express = require('express')
const router = express.Router()
const db = require('../models')

// we need an index route that will show all faves
router.get('/', (req, res) => {
    db.favorite.findAll()
        .then(faves => {
            // res.send(faves)
            res.render('indexFaves.ejs', {results: faves})
        })
        .catch(error => {
            console.error
        })
})


// we need a post route that will save a fave
// the url endpoint we'll be using for creating a fave will be this:
// '/faves/addFave'
router.post('/addFave', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    console.log('this is data', data)
    db.favorite.create({
        title: data.title,
        imdbId: data.imdbId
    })
        .then(createdFave => {
            console.log('db instance created:\n', createdFave)
            res.redirect(`/faves/${createdFave.id}`)
        })
        .catch(error => {
            console.error
            // this is a substitute for console.log(error)
        })
        // .finally(created => {
        //     console.log(created)
        // })
})


// we need a delete that will allow us to remove a fave
router.delete('/:id', (req, res) => {
    // console.log('this is the id:', req.params.id)
    db.favorite.destroy({
        where: { id: req.params.id }
    })
        .then(deletedItem => {
            console.log('you deleted:', deletedItem)
            res.redirect('/faves')
        })
        .catch(error => {
            console.error
        })
})

// time permitting -- a show route for an individual fave
// you are using a request paramter in a URL pattern (like /:id in this case) make sure your more specific URLs are above
router.get('/:id', (req, res) => {
    console.log('this is the fave id:', req.params.id)
    db.favorite.findOne({
        where: { id: req.params.id }
    })
        .then(foundFave => {
            // res.send(foundFave)
            res.render('faveDetail.ejs', {title: foundFave.title, imdbId: foundFave.imdbId, date: foundFave.createdAt})
        })
        .catch(error => {
            console.error
        })
})

module.exports = router