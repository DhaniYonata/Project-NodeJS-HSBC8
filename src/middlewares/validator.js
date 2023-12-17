const validator = require("validator");

const ValidateCreateUser = (req, res, next) => {
  try {
    const { firstname, lastname, email, username, password } = req.body;
    if (!firstname || !lastname || !email || !username || !password) {
      return res.status(400).send({
        message: "some field is missing",
      });
    }

    const strongPassword = validator.isStrongPassword(password);
    if (!strongPassword)
      return res.status(400).send({ message: "password not strong" });

    const isValidEmail = validator.isEmail(email, {
      host_blacklist: ["@ymail.com"],
    });
    if (!isValidEmail)
      return res.status(400).send({ message: "your email is invalid" });

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

module.exports = { ValidateCreateUser };
