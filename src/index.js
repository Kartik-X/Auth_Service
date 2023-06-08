const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const app = express();

const db = require("./models/index");
const { User, Role } = require("./models/index");

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(PORT, async () => {
    console.log(`Server started on port: ${PORT}`);

    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }

    const u1 = await User.findByPk(4);
    const r1 = await Role.findByPk(3);
    //u1.addRole(r1);
    const resp = await u1.hasRole(r1);
    console.log(resp);

    //const service = new UserService();
    // const newToken = service.createToken({ email: "kk123@gmail.com", id: 1 });
    // console.log("New token is", newToken);
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtrMTIzQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2ODYxMTM0MjAsImV4cCI6MTY4NjExMzQ1MH0.KqjDB0dL8dZzySHsvhF3iU70BcdLW3GJV9WPNlSs-5s";
    // const response = service.verifyToken(token);
    // console.log(response);
  });
};

prepareAndStartServer();
