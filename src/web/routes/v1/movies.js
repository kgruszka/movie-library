'use strict'
const express = require('express')
const router = express.Router()
const config = require('../../../config')
const { MongoClient } = require('mongodb')

let db = null

MongoClient.connect(config.mongodb.getUrl('test'))
  .then(_db => {
    db = _db
  })
  .catch(err => {
    console.log(`mongo con err ${err}`)
  })

function getMovies () {
  return db.collection('movies').find({}).toArray()
}

router.get('/', async (req, res) => {
  const movies = await getMovies()
  res.json(movies)
})

module.exports = router
