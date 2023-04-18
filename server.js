const mongoose = require("mongoose");
const app = require("./app");
const chalk = require("chalk");
const DB_HOST = require("./config");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log(chalk.bgYellowBright("Database connection successful"))
  })
  
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
