const express = require('express');
const { createAccess, getAccessToken, deleteAccess } = require('../Controllers/accessController');
const { authMiddleware } = require('../Utils/GlobalFunctions');
const router = express.Router();

router.put('/access/create', authMiddleware, createAccess);
router.get('/access/get', authMiddleware, getAccessToken);
router.delete('/access/delete', authMiddleware, deleteAccess);

module.exports = router;