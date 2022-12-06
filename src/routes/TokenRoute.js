const express = require("express");
const { getAllTokenData, postTokenData, getSetuTokenData, getKarmaTokenData, postKarmaTokenData } = require("../controllers/TokenController");
const router = express.Router();


router.route("/")
		.get(getAllTokenData)
		.post(postTokenData)
router.route("/setu")
		.get(getSetuTokenData)
router.route("/karma")
		.get(getKarmaTokenData)
        .post(postKarmaTokenData)


module.exports = router;