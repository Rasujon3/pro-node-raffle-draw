const {
  sellBulkTicket,
  sellSingleTicket,
  findAll,
  findByUsername,
  findById,
  updateBId,
  updateByUsername,
  deleteById,
  deleteByUsename,
} = require("./controllers");

const router = require("express").Router();

router.route("/t/:id").get(findById).put(updateBId).delete(deleteById);

router
  .route("/u/:username")
  .get(findByUsername)
  .put(updateByUsername)
  .delete(deleteByUsename);

router.post("/bulk", sellBulkTicket);
router.get("/draw");

router.route("/").get(findAll).post(sellSingleTicket);

module.exports = router;
