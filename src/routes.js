const { sellBulkTicket, sellSingleTicket } = require("./controllers");

const router = require("express").Router();

router.route("/t/:id").get().put().delete();

router.route("/u/:username").get().put().delete();

router.post("/bulk", sellBulkTicket);
router.get("/draw");

router.route("/").get().post(sellSingleTicket);

module.exports = router;
