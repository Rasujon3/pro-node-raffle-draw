const {
  sellBulkTicket,
  sellSingleTicket,
  findAll,
  findByUsername,
  findById,
  updateBId,
  updateByUsername,
} = require("./controllers");

const router = require("express").Router();

router.route("/t/:id").get(findById).put(updateBId).delete();

router.route("/u/:username").get(findByUsername).put(updateByUsername).delete();

router.post("/bulk", sellBulkTicket);
router.get("/draw");

router.route("/").get(findAll).post(sellSingleTicket);

module.exports = router;
