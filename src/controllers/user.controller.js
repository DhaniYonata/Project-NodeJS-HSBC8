const knex = require("../knexmodel/knex");
const { user } = require("../models");
const validator = require("validator");
const crypt = require("bcrypt");

const CreateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, username, password } = req.body;
    // const insertData = await knex("users").insert({
    //   firstname: body.firstname,
    //   lastname: body.lastname,
    //   email: body.email,
    //   username: body.username,
    //   password: body.password,
    // });

    // if (!firstname || !lastname || !email || !username || !password) {
    //   return res.status(400).send({
    //     message: "some field is missing",
    //   });
    // }

    // const strongPassword = validator.isStrongPassword(password);
    // if (!strongPassword)
    //   return res.status(400).send({ message: "password not strong" });

    const hashedPwd = crypt.hashSync(password, 8);

    const insert = await user.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      password: hashedPwd,
    });

    return res.status(201).send({ message: "create user success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error", error);
  }
};

const GetUsers = async (req, res) => {
  try {
    const allUsers = await knex.select().from("users");

    return res.status(200).send({
      message: "sukses get data",
      allUsers,
    });
  } catch {
    console.log(error);
    return res.status(500).send("internal server error", error);
  }
};

const updateUser = async (req, res) => {
  try {
    const body = req.body;

    const updated = await knex("users")
      .where({ username: body.username })
      .update({ password: body.password });
    return res.status(201).send({
      message: "sukses update data",
    });
  } catch {
    console.log(error);
    return res.status(500).send("internal server error", error);
  }
};

const DeleteUser = async (req, res) => {
  try {
    const body = req.body;

    const deleted = await knex("users").where({ id: body.id }).del();

    if (!deleted)
      return res.status(404).send({
        message: "data not found, delete fail",
      });

    return res.status(201).send({
      message: "delete sukses",
    });
  } catch {
    console.log(error);
    return res.status(500).send("internal server error", error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({
        message: "username or password incorect",
      });
    }

    const getUser = await user.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).send({
        message: "user not found",
      });
    }

    const isValidPassword = crypt.compareSync(
      password,
      getUser.dataValues.password
    );
    if (!isValidPassword) {
      return res.status(404).send({
        message: "invalid password",
      });
    }

    return res.status(200).send({
      message: "login succes",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error", error);
  }
};

module.exports = { CreateUser, GetUsers, updateUser, DeleteUser, login };
