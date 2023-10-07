const express = require('express');

const router = express.Router();

const fs = require('fs');

router.use(express.json());

const hospitalRoutes = require('./hospital')
router.use(hospitalRoutes);

module.exports = router;