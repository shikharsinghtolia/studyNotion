const mongoose = require("mongoose");
require("dotenv"), config();

exports.connect = () => {
  mongoose
    .connect(process.env.DB_LINK)({
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    .then(() => console.log("DB se connection hogaya hai "))
    .catch((error) => {
      console.log("the error is this:", error);
      process.exit(1);
    });
};
