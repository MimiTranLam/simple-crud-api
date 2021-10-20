const express = require("express");
const router = express.Router();

const {
  createPostHandler,
  updateHandler,
  deleteMatchName,
  readAllData,
} = require("../controllers/user.controllers");

router.post("/", createPostHandler);

router.put("/", updateHandler);

router.get("/", readAllData);

router.delete("/:name", deleteMatchName);

module.exports = router;