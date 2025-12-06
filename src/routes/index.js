const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const projectRoutes = require('./project.routes');



router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
