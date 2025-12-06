const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');

router.get('/getAllProjects', projectController.getAllProjects);
router.post('/createProject', projectController.createProject); 

module.exports = router;