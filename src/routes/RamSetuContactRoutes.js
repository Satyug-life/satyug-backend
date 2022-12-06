const express = require("express");
const { getAllContactData, postContactData, walletIdUpdateContactData } = require("../controllers/RamSetuContactController");
const router = express.Router();


router.route("/contact")
		.get(getAllContactData)
		.post(postContactData)
        .put(walletIdUpdateContactData)


module.exports = router;