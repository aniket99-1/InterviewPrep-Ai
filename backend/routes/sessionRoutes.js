const express = require("express");
const {createSession, getSessionById, getMySessions, deleteSession} = require("../controllers/sessionController");
const {protect} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/UploadMiddleware");

const router = express.Router();

// Session Routes
router.post("/create", protect, createSession);
router.get('/my-sessions',protect, getMySessions);
router.get('/:id', protect, getSessionById);
router.delete('/:id', protect, deleteSession);

module.exports = router;