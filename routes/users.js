'use strict'
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.json({users: []});
});

module.exports = router;
