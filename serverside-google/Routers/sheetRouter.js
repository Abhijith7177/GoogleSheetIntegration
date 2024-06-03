const express = require('express');
const { authMiddleware, verifyToken } = require('../Utils/GlobalFunctions');
const { createSheet, getSheet, deleteSheet, editSheet } = require('../Controllers/sheetController');
const { addToSheet, getDataFromSheet, generateAccessToken } = require('../Utils/GoogleSheet');
const router = express.Router();

router.post('/sheet/create', authMiddleware, createSheet);
router.get('/sheet/get', authMiddleware, getSheet);
router.post('/sheet/add', verifyToken, addToSheet);
router.get('/sheet/all-data', verifyToken, getDataFromSheet);
router.get('/generate-access-token', authMiddleware, generateAccessToken);
router.delete('/sheet/delete', authMiddleware, deleteSheet);
// router.get('/access/get', authMiddleware, getAccessToken);
router.put('/access/edit', authMiddleware, editSheet);

module.exports = router;    