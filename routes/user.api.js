const express = require("express");
const router = express.Router();

const {
  createPostHandler,
  updateHandler,
  updateInfoHandler,
  deleteMatchName,
  readAllData,
} = require("../controllers/user.controllers");

router.post("/", createPostHandler);

router.put("/", updateHandler);

router.patch("/student/:id", updateInfoHandler);

router.get("/", readAllData);

//router.delete("/:id", deleteMatchName);

module.exports = router;