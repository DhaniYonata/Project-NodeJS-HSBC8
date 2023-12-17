const express = require("express");
const {
  CreateUser,
  GetUsers,
  updateUser,
  DeleteUser,
  login,
} = require("../controllers/user.controller");
const { ValidateCreateUser } = require("../middlewares/validator");

const router = express.Router();

router.post("/create", ValidateCreateUser, CreateUser);
router.get("/getuser", GetUsers);
router.put("/update", updateUser);
router.delete("/delete", DeleteUser);

router.post("/login", login);

module.exports = router;
