const express = require("express");
const { getYogaVideo, postYogaVideo } = require("../controllers/YogaController");
const {videoUpload} = require ("../utils/storeVideo")
const router = express.Router();



module.exports = router;