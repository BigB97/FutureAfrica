const express = require('express');
const router = express.Router();
const talkController = require('../controllers/talk.controller');
const isAttendee = require('../middleware/isAttendee');

// GET /
router.get('/', talkController.homepage);
// Add a new talk
router.post('/create', talkController.createTalk);
router.get('/create/:talkid', talkController.roomPage);
// GET /talk/:talkId
router.get('/:talkid', isAttendee, talkController.confrencePage);
router.post('/join/:talkid', talkController.attendeeJoin);
router.get('/atend/:talkid', talkController.joinPage);
module.exports = router;
