const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const app = express();

// const { User } = require("./models/index");
// const bcrypt = require("bcrypt");
const UserRepository = require("./repository/user-repository");

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(PORT, async () => {
    console.log(`Server started on port: ${PORT}`);
    const repo = new UserRepository();
    const response = await repo.getById(3);
    console.log(response);
    // const incomingpassword = "12345";
    // const user = await User.findByPk(3);
    // const response = bcrypt.compareSync(incomingpassword, user.password);
    // console.log(response);
  });
};

prepareAndStartServer();
