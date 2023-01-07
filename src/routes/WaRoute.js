const express = require("express");
const { sendWhatsappData } = require("../controllers/WaController");
const router = express.Router();


router.route("/")
		.post(sendWhatsappData)


module.exports = router;