const express = require('express');
const router = express.Router();
const MobileController = require('../controllers/mobile.controller');
const { verifyToken } = require('../utils/authUtils');

router.get('/', verifyToken, MobileController.getAllMobiles);
router.get("/add_all", MobileController.addMobiles);
router.get('/options', verifyToken, MobileController.getAllOptions);
router.get('/search', verifyToken, MobileController.searchMobiles);

// Add this route to handle searching by ID
router.get('/:id', verifyToken, MobileController.getMobileById);

module.exports = router;
