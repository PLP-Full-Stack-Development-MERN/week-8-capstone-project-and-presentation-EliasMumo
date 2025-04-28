const express = require('express');
const router = express.Router();
const { getExamples, createExample } = require('../controllers/exampleController');

// GET /api/examples
router.get('/', getExamples);

// POST /api/examples
router.post('/', createExample);

module.exports = router; 